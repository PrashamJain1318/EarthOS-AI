import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Typography, EosCard, EosButton } from '@earthos/ui';
import { Camera, UploadCloud, X, Loader2, Maximize, Scan, RefreshCcw, QrCode, FileText } from 'lucide-react';
import { barcodeService } from '../features/ai-scanner/services/barcodeService';
import { ocrService, OCRResult } from '../features/ai-scanner/services/ocrService';

export const Scanner: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'idle' | 'upload' | 'camera'>('idle');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [decodedResult, setDecodedResult] = useState<string | null>(null);
  const [ocrData, setOcrData] = useState<OCRResult | null>(null);
  
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

  // Handle Camera Mode
  const startCamera = async (mode: 'environment' | 'user' = facingMode) => {
    cleanupStream(); // Ensure previous streams are closed before starting new one
    setActiveMode('camera');
    setCameraError(null);
    setCapturedImage(null);
    setDecodedResult(null);
    setOcrData(null);
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
          // Once found, stop stream and simulate processing
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
      
      // Set canvas dimensions to match video source
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Compress image to JPEG format with 80% quality
        return canvas.toDataURL('image/jpeg', 0.8);
      }
    }
    return null;
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
      setIsScanning(true);

      // Attempt barcode scan first
      const barcodeResult = await barcodeService.scanImage(file);
      if (barcodeResult) {
        setDecodedResult(barcodeResult);
        setIsScanning(false);
      } else {
        // Fallback to OCR
        const result = await ocrService.analyzeImage(file);
        setOcrData(result);
        setIsScanning(false);
      }
    }
  };

  const executeCapture = async () => {
    const image = captureAndCompressImage();
    if (image) {
      setCapturedImage(image);
      setIsScanning(true);
      cleanupStream(); // Stop camera while processing

      // Wait a tick for UI update, then run heavy OCR on the canvas
      setTimeout(async () => {
        if (canvasRef.current) {
          const result = await ocrService.analyzeImage(canvasRef.current);
          setOcrData(result);
          setIsScanning(false);
        }
      }, 100);
    }
  };

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      stopCamera();
      // Logic for displaying mock AI results goes here in the future
      alert('Mock scan completed. Compressed image is ready for upload. AI results will be rendered here.');
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col gap-2 text-center md:text-left">
        <Typography variant="h2" className="font-display font-bold">
          AI Object Scanner
        </Typography>
        <Typography variant="small" className="text-[#B0BEC5] font-medium">
          Identify materials, check repairability, and calculate carbon footprints instantly.
        </Typography>
      </div>

      {/* Hidden Canvas for Image Compression */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Main Scanner Container */}
      <EosCard variant="glass" className="relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] border border-[#B0BEC5]/30 p-6">
        
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
                {capturedImage || decodedResult || ocrData ? (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-900 overflow-y-auto pt-20 pb-8">
                    {capturedImage && <img src={capturedImage} alt="Captured" className="absolute inset-0 w-full h-full object-cover opacity-30" />}
                    
                    {/* Barcode Overlay */}
                    {decodedResult && (
                      <div className="z-20 bg-black/70 backdrop-blur-md border border-[#4ADE80]/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center max-w-sm m-4 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                        <QrCode size={48} className="text-[#4ADE80] mb-4" />
                        <Typography variant="h4" className="text-white">Barcode Found</Typography>
                        <Typography variant="small" className="text-white/80 font-mono mt-2 bg-white/10 px-3 py-1 rounded-md">{decodedResult}</Typography>
                      </div>
                    )}

                    {/* OCR Results Overlay */}
                    {ocrData && !decodedResult && (
                      <div className="z-20 bg-black/80 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex flex-col items-start w-full max-w-md m-4 relative max-h-full overflow-y-auto">
                        <div className="flex items-center gap-3 mb-6">
                          <FileText className="text-white" size={28} />
                          <div>
                            <Typography variant="h4" className="text-white">Text Extracted</Typography>
                            <Typography variant="small" className={`font-mono ${ocrData.confidence > 70 ? 'text-green-400' : 'text-orange-400'}`}>
                              Confidence: {ocrData.confidence.toFixed(1)}%
                            </Typography>
                          </div>
                        </div>

                        <div className="w-full space-y-4">
                          <Typography variant="h5" className="text-white/70 border-b border-white/10 pb-2">Structured Data</Typography>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs">Brand</Typography>
                              <Typography variant="body" className="text-white font-medium">{ocrData.structuredData.brand || 'Unknown'}</Typography>
                            </div>
                            <div>
                              <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs">Model Number</Typography>
                              <Typography variant="body" className="text-white font-medium">{ocrData.structuredData.modelNumber || 'Not Found'}</Typography>
                            </div>
                            <div className="col-span-2">
                              <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs">Serial Number</Typography>
                              <Typography variant="body" className="text-white font-medium font-mono">{ocrData.structuredData.serialNumber || 'Not Found'}</Typography>
                            </div>
                            <div>
                              <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs">Purchase Date</Typography>
                              <Typography variant="body" className="text-white font-medium">{ocrData.structuredData.purchaseDate || 'Not Found'}</Typography>
                            </div>
                            <div>
                              <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs">Warranty</Typography>
                              <Typography variant="body" className="text-white font-medium">{ocrData.structuredData.warrantyDate || 'Not Found'}</Typography>
                            </div>
                          </div>

                          <div className="mt-6">
                            <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-2 block">Raw Output</Typography>
                            <pre className="text-xs text-white/50 font-mono bg-white/5 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap max-h-32">
                              {ocrData.rawText}
                            </pre>
                          </div>
                        </div>

                        <EosButton variant="primary" className="w-full mt-6" onClick={() => setActiveMode('idle')}>
                          Done
                        </EosButton>
                      </div>
                    )}
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
                {!capturedImage && !decodedResult && !ocrData && (
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
                {!capturedImage && !decodedResult && !ocrData && (
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
            
            <Typography variant="h3" className="font-display">Running Optical Recognition...</Typography>
            <Typography variant="small" className="text-[#B0BEC5] mt-2">Extracting serial numbers and structured text via Tesseract.</Typography>
          </div>
        )}

        {/* Global OCR Results Overlay for Upload */}
        {!isScanning && activeMode === 'upload' && ocrData && (
          <div className="absolute inset-0 bg-white dark:bg-[#0B1220] flex flex-col items-start p-8 z-40 overflow-y-auto">
            <button onClick={() => { setOcrData(null); setActiveMode('idle'); }} className="mb-6 text-[#1F2937] dark:text-[#F8FAFC] hover:opacity-70 transition-opacity">
              <X size={24} />
            </button>
            <div className="flex items-center gap-3 mb-8 border-b border-[#B0BEC5]/30 pb-4 w-full">
              <FileText className="text-[#1F2937] dark:text-[#F8FAFC]" size={32} />
              <div>
                <Typography variant="h3" className="font-display">OCR Results</Typography>
                <Typography variant="small" className={`font-mono ${ocrData.confidence > 70 ? 'text-green-500' : 'text-orange-500'}`}>
                  Confidence: {ocrData.confidence.toFixed(1)}%
                </Typography>
              </div>
            </div>

            <div className="w-full max-w-3xl mx-auto space-y-8">
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
                <div>
                  <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-1 block">Purchase Date</Typography>
                  <Typography variant="h4">{ocrData.structuredData.purchaseDate || 'Not Found'}</Typography>
                </div>
                <div>
                  <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-1 block">Warranty Date</Typography>
                  <Typography variant="h4">{ocrData.structuredData.warrantyDate || 'Not Found'}</Typography>
                </div>
              </div>

              <div className="pt-6 border-t border-[#B0BEC5]/30">
                <Typography variant="small" className="text-[#B0BEC5] uppercase tracking-wider text-xs mb-3 block">Raw Extracted Text</Typography>
                <pre className="text-xs font-mono bg-black/5 dark:bg-white/5 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap max-h-60 border border-[#B0BEC5]/20">
                  {ocrData.rawText}
                </pre>
              </div>
            </div>
          </div>
        )}

      </EosCard>

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
