import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, EosCard, EosButton } from '@earthos/ui';
import { 
  Camera, 
  UploadCloud, 
  X, 
  Loader2, 
  Maximize, 
  Scan, 
  RefreshCcw, 
  QrCode, 
  FileText, 
  Cpu, 
  History, 
  Trash2, 
  Search, 
  Calendar,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { barcodeService } from '../features/ai-scanner/services/barcodeService';
import { ocrService, OCRResult } from '../features/ai-scanner/services/ocrService';
import { aiRegistry } from '../features/ai-scanner/services/aiProviderRegistry';
import { ObjectRecognitionResult } from '../features/ai-scanner/types/ai';
import { carbonService, CarbonEstimate } from '../features/ai-scanner/services/carbonService';
import { scanHistoryService, ScanHistoryItem } from '../features/ai-scanner/services/scanHistoryService';

export const Scanner: React.FC = () => {
  const navigate = useNavigate();
  const [viewTab, setViewTab] = useState<'scan' | 'history'>('scan');
  
  // Scanner state
  const [activeMode, setActiveMode] = useState<'idle' | 'upload' | 'camera'>('idle');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [decodedResult, setDecodedResult] = useState<string | null>(null);
  const [ocrData, setOcrData] = useState<OCRResult | null>(null);
  const [aiResult, setAiResult] = useState<ObjectRecognitionResult | null>(null);
  const [carbonResult, setCarbonResult] = useState<CarbonEstimate | null>(null);

  // History Page state
  const [historyPage, setHistoryPage] = useState(1);
  const [historySearch, setHistorySearch] = useState('');
  const [historyCategory, setHistoryCategory] = useState('ALL');
  const [historyStartDate, setHistoryStartDate] = useState('');
  const [historyEndDate, setHistoryEndDate] = useState('');
  const [historyData, setHistoryData] = useState<any>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Clean up media streams when leaving the page or changing modes
  const cleanupStream = useCallback(() => {
    barcodeService.stopVideoScan();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanupStream();
    };
  }, [cleanupStream]);

  // Load history data whenever filters or pagination parameters change
  const loadHistory = useCallback(() => {
    const data = scanHistoryService.queryHistory({
      page: historyPage,
      limit: 5,
      search: historySearch,
      category: historyCategory,
      startDate: historyStartDate,
      endDate: historyEndDate
    });
    setHistoryData(data);
  }, [historyPage, historySearch, historyCategory, historyStartDate, historyEndDate]);

  useEffect(() => {
    if (viewTab === 'history') {
      loadHistory();
    }
  }, [viewTab, loadHistory]);

  // Handle Camera Mode
  const startCamera = async (mode: 'environment' | 'user' = facingMode) => {
    cleanupStream();
    setActiveMode('camera');
    setCameraError(null);
    setCapturedImage(null);
    setDecodedResult(null);
    setOcrData(null);
    setAiResult(null);
    setCarbonResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 } 
        } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Start continuous barcode scanning
        barcodeService.bindToVideoElement(videoRef.current, (result) => {
          setDecodedResult(result);
          cleanupStream();
        });
      }
    } catch (err) {
      setCameraError('Camera permission denied or device not found. Please allow camera access.');
    }
  };

  const stopCamera = useCallback(() => {
    cleanupStream();
    setActiveMode('idle');
    setCapturedImage(null);
  }, [cleanupStream]);

  const toggleCamera = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  // Capture frame from video and compress
  const captureAndCompressImage = (): string | null => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg', 0.8);
      }
    }
    return null;
  };

  const processScanData = async (
    aiData: ObjectRecognitionResult | null,
    textData: { type: 'barcode' | 'ocr'; data: any }
  ) => {
    const category = aiData?.category || 'Electronics';
    // Heuristic: brand as material
    const brandMaterial = textData.type === 'ocr' ? (textData.data as OCRResult).structuredData.brand || 'Plastic' : 'Plastic';
    
    // Estimate manufacturing carbon footprint & lifespan
    const carbonEstimate = carbonService.calculateCarbonEstimate(category, brandMaterial, 2);

    setAiResult(aiData);
    setCarbonResult(carbonEstimate);

    // Save scan to local history database
    scanHistoryService.addScan({
      status: aiData ? 'success' : 'failed',
      category,
      image: null, // Avoid storing base64 to prevent exceeding local storage quota
      barcode: textData.type === 'barcode' ? (textData.data as string) : null,
      ocrData: textData.type === 'ocr' ? (textData.data as OCRResult) : null,
      aiResult: aiData,
      carbonEstimate
    });
  };

  // Handle Upload Mode
  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setActiveMode('upload');
      setCapturedImage(null);
      setDecodedResult(null);
      setOcrData(null);
      setAiResult(null);
      setCarbonResult(null);
      setIsScanning(true);

      try {
        const aiPromise = aiRegistry.getProvider().analyzeObject(file);
        const textPromise = barcodeService.scanImage(file).then(async (barcode) => {
          if (barcode) return { type: 'barcode' as const, data: barcode };
          const result = await ocrService.analyzeImage(file);
          return { type: 'ocr' as const, data: result };
        });

        const [aiData, textData] = await Promise.all([aiPromise, textPromise]);
        
        if (textData.type === 'barcode') {
          setDecodedResult(textData.data as string);
        } else {
          setOcrData(textData.data as OCRResult);
        }

        await processScanData(aiData, textData);
      } catch (err) {
        console.error('Scanning failed:', err);
      } finally {
        setIsScanning(false);
      }
    }
  };

  const executeCapture = async () => {
    const image = captureAndCompressImage();
    if (image) {
      setCapturedImage(image);
      setIsScanning(true);
      cleanupStream();

      setTimeout(async () => {
        if (canvasRef.current) {
          try {
            const aiPromise = aiRegistry.getProvider().analyzeObject(canvasRef.current);
            const ocrPromise = ocrService.analyzeImage(canvasRef.current);
            
            const [aiData, ocrRes] = await Promise.all([aiPromise, ocrPromise]);
            
            setOcrData(ocrRes);
            await processScanData(aiData, { type: 'ocr', data: ocrRes });
          } catch (err) {
            console.error('Processing captured frame failed:', err);
          } finally {
            setIsScanning(false);
          }
        }
      }, 100);
    }
  };

  const mapCondition = (cond: string | undefined): string => {
    if (!cond) return 'GOOD';
    const c = cond.toUpperCase();
    if (c === 'NEW') return 'NEW';
    if (c === 'GOOD') return 'GOOD';
    if (c === 'FAIR') return 'FAIR';
    if (c === 'POOR') return 'POOR';
    return 'GOOD';
  };

  const handleRegister = () => {
    // Structure custom scanMetadata to attach to the final Object Model payload
    const scanMetadata = {
      ocrResults: ocrData?.structuredData || null,
      aiSuggestions: aiResult ? {
        category: aiResult.category,
        productType: aiResult.productType,
        condition: aiResult.condition,
        damageDetected: aiResult.damageDetected,
        confidence: aiResult.confidence
      } : null,
      carbonEstimate: carbonResult,
      originalImage: capturedImage
    };

    const autofill = {
      objectName: aiResult?.productType || ocrData?.structuredData.productName || 'Scanned Object',
      category: aiResult?.category || ocrData?.structuredData.brand || 'Electronics',
      brand: ocrData?.structuredData.brand || 'Unknown',
      model: ocrData?.structuredData.modelNumber || 'Unknown',
      serialNumber: ocrData?.structuredData.serialNumber || '',
      purchaseDate: ocrData?.structuredData.purchaseDate || new Date().toISOString().split('T')[0],
      condition: mapCondition(aiResult?.condition),
      currentValue: carbonResult?.reuseBenefit || 500, // Reuse benefit as base valuation heuristic
      description: aiResult ? `AI Visual Recognition Category: ${aiResult.category}. Damage detected: ${aiResult.damageDetected.join(', ') || 'None'}.` : 'Scanned via AI Scanner.',
      warrantyExpiry: ocrData?.structuredData.warrantyDate || '',
      barcode: decodedResult || undefined,
      scanMetadata
    };

    navigate('/portal/user/objects/new', { state: { autofill } });
  };

  const handleReuseScan = (item: ScanHistoryItem) => {
    setAiResult(item.aiResult);
    setOcrData(item.ocrData);
    setDecodedResult(item.barcode);
    setCarbonResult(item.carbonEstimate);
    setCapturedImage(item.image);
    setActiveMode('upload');
    setViewTab('scan');
  };

  const handleDeleteHistoryItem = (id: string) => {
    scanHistoryService.deleteScan(id);
    loadHistory();
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear your entire scan history?')) {
      scanHistoryService.clearHistory();
      loadHistory();
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <Typography variant="h2" className="font-display font-bold">
            AI Object Scanner
          </Typography>
          <Typography variant="small" className="text-[#B0BEC5] font-medium">
            Identify materials, check repairability, and calculate carbon footprints instantly.
          </Typography>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#162033]/50 p-1 rounded-xl border border-white/5 select-none">
          <button 
            onClick={() => setViewTab('scan')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${viewTab === 'scan' ? 'bg-[#2E7D32] text-white' : 'text-[#B0BEC5] hover:text-white'}`}
          >
            Scanner View
          </button>
          <button 
            onClick={() => setViewTab('history')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${viewTab === 'history' ? 'bg-[#2E7D32] text-white' : 'text-[#B0BEC5] hover:text-white'}`}
          >
            <History size={16} />
            Scan History
          </button>
        </div>
      </div>

      {viewTab === 'scan' ? (
        /* ==================== SCANNER VIEW ==================== */
        <EosCard variant="glass" className="relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] border border-[#B0BEC5]/30 p-6">
          {/* Hidden Canvas for Image Compression */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Idle Mode: Options */}
          {activeMode === 'idle' && (
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
              {/* Upload Option */}
              <div 
                onClick={triggerUpload}
                className="flex-1 border-2 border-dashed border-[#B0BEC5]/40 hover:border-[#1F2937] dark:hover:border-[#F8FAFC] rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:bg-black/5"
              >
                <div className="h-16 w-16 rounded-full bg-[#1F2937]/5 dark:bg-[#F8FAFC]/5 flex items-center justify-center">
                  <UploadCloud size={32} className="text-[#1F2937] dark:text-[#F8FAFC]" />
                </div>
                <div className="text-center">
                  <Typography variant="h4">Upload Image</Typography>
                  <Typography variant="small" className="text-[#B0BEC5]">Drag & drop or browse</Typography>
                </div>
              </div>

              {/* Camera Option */}
              <div 
                onClick={() => startCamera(facingMode)}
                className="flex-1 border-2 border-dashed border-[#B0BEC5]/40 hover:border-[#1F2937] dark:hover:border-[#F8FAFC] rounded-2xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:bg-black/5"
              >
                <div className="h-16 w-16 rounded-full bg-[#1F2937]/5 dark:bg-[#F8FAFC]/5 flex items-center justify-center">
                  <Camera size={32} className="text-[#1F2937] dark:text-[#F8FAFC]" />
                </div>
                <div className="text-center">
                  <Typography variant="h4">Open Camera</Typography>
                  <Typography variant="small" className="text-[#B0BEC5]">Scan barcode, QR, or object</Typography>
                </div>
              </div>
            </div>
          )}

          {/* Camera Mode */}
          {activeMode === 'camera' && (
            <div className="absolute inset-0 bg-black flex flex-col">
              {/* Close Button */}
              <button 
                onClick={stopCamera}
                className="absolute top-6 left-6 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
                title="Close Camera"
              >
                <X size={24} />
              </button>
              
              {/* Toggle Camera Button */}
              {!cameraError && !capturedImage && (
                <button 
                  onClick={toggleCamera}
                  className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"
                  title="Switch Camera"
                >
                  <RefreshCcw size={24} />
                </button>
              )}

              {cameraError ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <Typography variant="h4" className="text-red-400 mb-2">Camera Error</Typography>
                  <Typography variant="small" className="text-gray-400 max-w-sm">{cameraError}</Typography>
                  <EosButton variant="outline" className="mt-6 border-white/20 text-white hover:bg-white/10" onClick={stopCamera}>
                    Go Back
                  </EosButton>
                </div>
              ) : (
                <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center">
                  {/* Preview Captured Image or Live Video feed */}
                  {capturedImage || decodedResult || ocrData || aiResult ? (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-900 overflow-y-auto pt-20 pb-8 animate-fade-in">
                      {capturedImage && <img src={capturedImage} alt="Captured" className="absolute inset-0 w-full h-full object-cover opacity-20" />}
                      
                      <div className="z-20 w-full max-w-md m-4 flex flex-col gap-4 relative max-h-full overflow-y-auto">
                        
                        {/* Barcode Overlay */}
                        {decodedResult && (
                          <div className="bg-black/70 backdrop-blur-md border border-[#4ADE80]/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                            <QrCode size={48} className="text-[#4ADE80] mb-4" />
                            <Typography variant="h4" className="text-white">Barcode Found</Typography>
                            <Typography variant="small" className="text-white/80 font-mono mt-2 bg-white/10 px-3 py-1 rounded-md">{decodedResult}</Typography>
                          </div>
                        )}

                        {/* Carbon Estimate Overlay */}
                        {carbonResult && (
                          <div className="bg-black/80 backdrop-blur-md border border-green-500/30 p-6 rounded-2xl flex flex-col items-start w-full shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                            <div className="flex items-center gap-3 mb-6">
                              <Sparkles className="text-green-400" size={28} />
                              <div>
                                <Typography variant="h4" className="text-white">Carbon Assessment</Typography>
                                <Typography variant="small" className="text-green-400/80">Methodology LCA Score: {carbonResult.confidence}%</Typography>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs">Footprint</Typography>
                                <Typography variant="body" className="text-white font-medium">{carbonResult.footprint} kg CO2e</Typography>
                              </div>
                              <div>
                                <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs">Remaining Life</Typography>
                                <Typography variant="body" className="text-white font-medium">{carbonResult.remainingUsefulLife} Years</Typography>
                              </div>
                              <div className="col-span-2 pt-2 border-t border-white/10">
                                <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-1 block">Circular Benefits (Prevented Footprint)</Typography>
                                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                  <div className="bg-white/5 p-2 rounded">
                                    <div className="text-green-400 font-bold">-{carbonResult.repairBenefit}kg</div>
                                    <div className="text-[10px] text-white/55">Repair</div>
                                  </div>
                                  <div className="bg-white/5 p-2 rounded">
                                    <div className="text-green-400 font-bold">-{carbonResult.reuseBenefit}kg</div>
                                    <div className="text-[10px] text-white/55">Reuse</div>
                                  </div>
                                  <div className="bg-white/5 p-2 rounded">
                                    <div className="text-green-400 font-bold">-{carbonResult.recyclingBenefit}kg</div>
                                    <div className="text-[10px] text-white/55">Recycle</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* AI Visual Analysis Overlay */}
                        {aiResult && (
                          <div className="bg-black/80 backdrop-blur-md border border-blue-500/30 p-6 rounded-2xl flex flex-col items-start w-full shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                            <div className="flex items-center gap-3 mb-6">
                              <Cpu className="text-blue-400" size={28} />
                              <div>
                                <Typography variant="h4" className="text-white">AI Visual Analysis</Typography>
                                <Typography variant="small" className="text-blue-400/80">Confidence: {(aiResult.confidence.overall * 100).toFixed(1)}%</Typography>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 w-full">
                              <div>
                                <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs">Category</Typography>
                                <Typography variant="body" className="text-white font-medium">{aiResult.category}</Typography>
                              </div>
                              <div>
                                <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs">Product Type</Typography>
                                <Typography variant="body" className="text-white font-medium">{aiResult.productType}</Typography>
                              </div>
                              <div>
                                <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs">Condition</Typography>
                                <span className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${aiResult.condition === 'New' || aiResult.condition === 'Good' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                  {aiResult.condition}
                                </span>
                              </div>
                              <div className="col-span-2 mt-2">
                                <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-1 block">Visible Damage</Typography>
                                {aiResult.damageDetected.length > 0 ? (
                                  <div className="flex flex-wrap gap-2">
                                    {aiResult.damageDetected.map((d, i) => (
                                      <span key={i} className="bg-red-500/20 border border-red-500/30 text-red-300 px-2 py-1 rounded text-xs">
                                        {d}
                                      </span>
                                    ))}
                                  </div>
                                ) : (
                                  <Typography variant="small" className="text-white/50">None detected</Typography>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3 w-full mt-2">
                          <EosButton variant="secondary" className="flex-1" onClick={() => setActiveMode('idle')}>
                            Cancel
                          </EosButton>
                          <EosButton variant="primary" className="flex-1 font-bold" onClick={handleRegister}>
                            Register Object
                          </EosButton>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className={`absolute inset-0 w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                    />
                  )}
                  
                  {/* Viewfinder Overlay */}
                  <div className="absolute inset-0 pointer-events-none border-[40px] border-black/40"></div>
                  {!capturedImage && !decodedResult && !ocrData && !aiResult && (
                    <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 border-2 border-white/50 rounded-xl flex items-center justify-center pointer-events-none">
                      <Maximize size={48} className="text-white/30" />
                      
                      {/* Scanning Animation */}
                      {isScanning && (
                        <div className="absolute inset-0 overflow-hidden rounded-xl">
                          <div className="w-full h-1 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)] animate-scan-line"></div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Capture Controls */}
                  {!capturedImage && !decodedResult && !ocrData && !aiResult && (
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
                      <button 
                        onClick={executeCapture}
                        disabled={isScanning}
                        className="h-20 w-20 rounded-full border-4 border-white flex items-center justify-center bg-white/20 hover:bg-white/40 transition-colors disabled:opacity-50"
                      >
                        {isScanning ? <Loader2 size={32} className="text-white animate-spin" /> : <Scan size={32} className="text-white" />}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Global Scanning Overlay for Upload */}
          {isScanning && activeMode === 'upload' && (
            <div className="absolute inset-0 bg-white/90 dark:bg-[#0B1220]/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
              <Loader2 size={48} className="animate-spin text-[#1F2937] dark:text-[#F8FAFC] mb-4" />
              <Typography variant="h3" className="font-display">AI Deep Scan Running...</Typography>
              <Typography variant="small" className="text-[#B0BEC5] mt-2">Analyzing image for object category, condition, and extracting text.</Typography>
            </div>
          )}

          {/* Global Combined Results Overlay for Upload */}
          {!isScanning && activeMode === 'upload' && (ocrData || aiResult) && (
            <div className="absolute inset-0 bg-white dark:bg-[#0B1220] flex flex-col items-start p-8 z-40 overflow-y-auto">
              <button onClick={() => { setOcrData(null); setAiResult(null); setCarbonResult(null); setActiveMode('idle'); }} className="mb-6 text-[#1F2937] dark:text-[#F8FAFC] hover:opacity-70 transition-opacity">
                <X size={24} />
              </button>
              
              <div className="w-full max-w-3xl mx-auto space-y-8 pb-12">
                {/* Carbon Estimation Card */}
                {carbonResult && (
                  <div className="border border-green-500/20 bg-green-500/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6 border-b border-green-500/20 pb-4">
                      <Sparkles className="text-green-500" size={32} />
                      <div>
                        <Typography variant="h3" className="font-display text-green-500">Environmental Carbon Impact</Typography>
                        <Typography variant="small" className="text-[#B0BEC5]">Methodology LCA Score: {carbonResult.confidence}%</Typography>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white/5 p-4 rounded-xl text-center">
                        <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs">Total Footprint</Typography>
                        <Typography variant="h3" className="text-red-400 font-bold mt-1">{carbonResult.footprint} kg CO2e</Typography>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl text-center">
                        <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs">Remaining Life</Typography>
                        <Typography variant="h3" className="text-green-400 font-bold mt-1">{carbonResult.remainingUsefulLife} Years</Typography>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl text-center flex flex-col justify-center">
                        <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs block">LCA Methodology</Typography>
                        <Typography variant="small" className="text-xs text-slate-400 mt-1 leading-snug">Baseline material models calculated dynamically.</Typography>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-green-500/10">
                      <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-3 block">Estimated Circular Offset Benefits</Typography>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                          <div className="text-green-400 font-bold">-{carbonResult.repairBenefit} kg</div>
                          <div className="text-xs text-white/50 mt-0.5">Repair Offsets</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                          <div className="text-green-400 font-bold">-{carbonResult.reuseBenefit} kg</div>
                          <div className="text-xs text-white/50 mt-0.5">Reuse Offsets</div>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                          <div className="text-green-400 font-bold">-{carbonResult.recyclingBenefit} kg</div>
                          <div className="text-xs text-white/50 mt-0.5">Recycling Offsets</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Visual Analysis Section */}
                {aiResult && (
                  <div className="border border-blue-500/20 bg-blue-500/5 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6 border-b border-blue-500/20 pb-4">
                      <Cpu className="text-blue-500" size={32} />
                      <div>
                        <Typography variant="h3" className="font-display text-blue-500">AI Visual Analysis</Typography>
                        <Typography variant="small" className="font-mono text-blue-500/80">
                          Confidence: {(aiResult.confidence.overall * 100).toFixed(1)}%
                        </Typography>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-1 block">Category</Typography>
                        <Typography variant="h4">{aiResult.category}</Typography>
                      </div>
                      <div>
                        <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-1 block">Product Type</Typography>
                        <Typography variant="h4">{aiResult.productType}</Typography>
                      </div>
                      <div>
                        <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-1 block">Condition</Typography>
                        <span className={`inline-block px-3 py-1 rounded text-sm font-bold ${aiResult.condition === 'New' || aiResult.condition === 'Good' ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'}`}>
                          {aiResult.condition}
                        </span>
                      </div>
                      <div>
                        <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-1 block">Damage</Typography>
                        {aiResult.damageDetected.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {aiResult.damageDetected.map((d, i) => (
                              <span key={i} className="bg-red-500/10 border border-red-500/20 text-red-500 px-2 py-1 rounded text-xs font-bold">
                                {d}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <Typography variant="body" className="text-[#B0BEC5]">None detected</Typography>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* OCR Results Section */}
                {ocrData && (
                  <div className="border border-[#B0BEC5]/30 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6 border-b border-[#B0BEC5]/30 pb-4 w-full">
                      <FileText className="text-[#1F2937] dark:text-[#F8FAFC]" size={32} />
                      <div>
                        <Typography variant="h3" className="font-display">Text Extracted</Typography>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-1 block">Brand / Product</Typography>
                        <Typography variant="h4">{ocrData.structuredData.brand || 'Unknown'} {ocrData.structuredData.productName || ''}</Typography>
                      </div>
                      <div>
                        <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-1 block">Model Number</Typography>
                        <Typography variant="h4" className="font-mono">{ocrData.structuredData.modelNumber || 'Not Found'}</Typography>
                      </div>
                      <div className="md:col-span-2">
                        <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-1 block">Serial Number</Typography>
                        <Typography variant="h4" className="font-mono">{ocrData.structuredData.serialNumber || 'Not Found'}</Typography>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons for Upload Result Page */}
                <div className="flex gap-4 pt-6 border-t border-[#B0BEC5]/30 w-full justify-end">
                  <EosButton variant="secondary" onClick={() => { setOcrData(null); setAiResult(null); setCarbonResult(null); setActiveMode('idle'); }}>
                    Cancel
                  </EosButton>
                  <EosButton variant="primary" className="font-bold" onClick={handleRegister}>
                    Register Object
                  </EosButton>
                </div>
              </div>
            </div>
          )}
        </EosCard>
      ) : (
        /* ==================== SCAN HISTORY VIEW ==================== */
        <EosCard variant="glass" className="p-6 border border-[#B0BEC5]/30 flex flex-col gap-6">
          {/* Filters Panel */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#B0BEC5]">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={historySearch}
                onChange={(e) => { setHistorySearch(e.target.value); setHistoryPage(1); }}
                placeholder="Search scans by barcode or product..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32] transition-colors text-sm"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <select
                value={historyCategory}
                onChange={(e) => { setHistoryCategory(e.target.value); setHistoryPage(1); }}
                className="w-full px-4 py-2 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32] transition-colors text-sm"
              >
                <option value="ALL">All Categories</option>
                <option value="ELECTRONICS">Electronics</option>
                <option value="TEXTILES">Textiles</option>
                <option value="FURNITURE">Furniture</option>
                <option value="METAL">Metal</option>
                <option value="PLASTIC">Plastic</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Date Range Inputs */}
            <div className="flex gap-2 md:col-span-2">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#B0BEC5]">
                  <Calendar size={14} />
                </span>
                <input
                  type="date"
                  value={historyStartDate}
                  onChange={(e) => { setHistoryStartDate(e.target.value); setHistoryPage(1); }}
                  className="w-full pl-9 pr-2 py-2 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32] transition-colors text-xs"
                  placeholder="Start"
                />
              </div>
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#B0BEC5]">
                  <Calendar size={14} />
                </span>
                <input
                  type="date"
                  value={historyEndDate}
                  onChange={(e) => { setHistoryEndDate(e.target.value); setHistoryPage(1); }}
                  className="w-full pl-9 pr-2 py-2 bg-white dark:bg-[#162033] border border-[#B0BEC5] dark:border-[#263238] rounded-xl text-[#1F2937] dark:text-[#F8FAFC] focus:outline-none focus:border-[#2E7D32] transition-colors text-xs"
                  placeholder="End"
                />
              </div>
            </div>
          </div>

          {/* Clear Button */}
          <div className="flex justify-end">
            <button 
              onClick={handleClearAllHistory}
              className="text-xs text-red-500 hover:text-red-600 font-bold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 size={14} />
              Clear Scan History
            </button>
          </div>

          {/* History List */}
          <div className="flex flex-col gap-4">
            {historyData && historyData.items.length > 0 ? (
              historyData.items.map((item: ScanHistoryItem) => (
                <div 
                  key={item.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-[#B0BEC5]/20 rounded-xl hover:bg-white/5 transition-colors gap-4"
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${item.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <Typography variant="body" className="font-bold text-white">
                        {item.aiResult?.productType || 'Unknown Object'}
                      </Typography>
                      <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded font-mono">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#B0BEC5]">
                      <span>Scanned: {new Date(item.timestamp).toLocaleString()}</span>
                      {item.barcode && <span>Barcode: <span className="font-mono bg-white/10 px-1 rounded">{item.barcode}</span></span>}
                      {item.carbonEstimate && <span>Footprint: <span className="font-bold text-red-400">{item.carbonEstimate.footprint} kg CO2e</span></span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleReuseScan(item)}
                      className="px-3 py-1.5 bg-[#2E7D32]/20 hover:bg-[#2E7D32]/40 border border-[#2E7D32]/30 text-green-400 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <RefreshCw size={12} />
                      Reuse Result
                    </button>
                    <button 
                      onClick={() => handleDeleteHistoryItem(item.id)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      title="Delete log"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-12 text-[#B0BEC5]">
                <Typography variant="h4">No scan records found</Typography>
                <Typography variant="small" className="text-slate-500">Scan items to start building your environmental history logs.</Typography>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {historyData && historyData.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-[#B0BEC5]/10 pt-4 mt-2">
              <Typography variant="small" className="text-slate-400">
                Page {historyData.pagination.page} of {historyData.pagination.totalPages} ({historyData.pagination.total} records)
              </Typography>
              <div className="flex gap-2">
                <EosButton 
                  size="sm" 
                  variant="secondary"
                  disabled={!historyData.pagination.hasPrevPage}
                  onClick={() => setHistoryPage(p => p - 1)}
                >
                  Previous
                </EosButton>
                <EosButton 
                  size="sm" 
                  variant="secondary"
                  disabled={!historyData.pagination.hasNextPage}
                  onClick={() => setHistoryPage(p => p + 1)}
                >
                  Next
                </EosButton>
              </div>
            </div>
          )}
        </EosCard>
      )}

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept="image/jpeg, image/png, image/webp" 
        className="hidden" 
      />
    </div>
  );
};

export default Scanner;
