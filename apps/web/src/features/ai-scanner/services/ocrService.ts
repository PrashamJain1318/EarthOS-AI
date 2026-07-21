import Tesseract from 'tesseract.js';

export interface OCRResult {
  structuredData: {
    brand: string | null;
    productName: string | null;
    modelNumber: string | null;
    serialNumber: string | null;
    warrantyDate: string | null;
    purchaseDate: string | null;
  };
  rawText: string;
  confidence: number;
}

class OcrService {
  /**
   * Extracts raw text and confidence from an image, then parses it into structured data.
   */
  public async analyzeImage(imageSource: string | File | HTMLCanvasElement): Promise<OCRResult | null> {
    try {
      let imageToProcess: Tesseract.ImageLike = imageSource;
      
      // If canvas is passed, convert to dataURL for Tesseract
      if (imageSource instanceof HTMLCanvasElement) {
        imageToProcess = imageSource.toDataURL('image/jpeg');
      }

      // Initialize Tesseract and extract text
      // We use eng language as default
      const { data: { text, confidence } } = await Tesseract.recognize(
        imageToProcess,
        'eng',
        { logger: () => {} }
      );



      const structuredData = this.parseStructuredData(text);

      return {
        structuredData,
        rawText: text,
        confidence,
      };

    } catch (error) {
      console.error('OCR Service - Extraction Failed:', error);
      return null;
    }
  }

  /**
   * Attempts to parse structured fields out of raw OCR text using Heuristics and Regex.
   */
  private parseStructuredData(rawText: string) {
    const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const textUpper = rawText.toUpperCase();

    // 1. Model Number
    // Look for Model, M/N, Mod, followed by alphanumeric
    const modelMatch = textUpper.match(/(?:MODEL|M\/N|MOD\.?)\s*[:-]?\s*([A-Z0-9-]{4,20})/i);
    const modelNumber = modelMatch ? modelMatch[1] : null;

    // 2. Serial Number
    // Look for S/N, SN, Serial, followed by alphanumeric
    const serialMatch = textUpper.match(/(?:SERIAL|S\/N|SN)\s*[:-]?\s*([A-Z0-9-]{6,25})/i);
    const serialNumber = serialMatch ? serialMatch[1] : null;

    // 3. Dates (Purchase & Warranty)
    // Basic date matcher for DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD
    const dateRegex = /\b(\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4})\b/g;
    const dates = [...rawText.matchAll(dateRegex)].map(m => m[1]);
    
    let purchaseDate: string | null = null;
    let warrantyDate: string | null = null;

    if (dates.length > 0) {
      // Very naive heuristic: first date is purchase, second is warranty (or if text contains 'Warranty')
      purchaseDate = dates[0];
      
      const warrantyMatch = textUpper.match(/WARRANTY.*?(\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4})/i);
      if (warrantyMatch) {
        warrantyDate = warrantyMatch[1];
      } else if (dates.length > 1) {
        warrantyDate = dates[1]; // fallback guess
      }
    }

    // 4. Brand / Product Name
    // Extremely naive heuristic without a DB: assume first couple of lines contain the Brand/Name
    // if they don't contain common structural words.
    let brand: string | null = null;
    let productName: string | null = null;

    const ignoreWords = ['WARRANTY', 'SERIAL', 'MODEL', 'RECEIPT', 'DATE', 'PURCHASE', 'S/N'];
    const potentialNameLines = lines.filter(line => !ignoreWords.some(w => line.toUpperCase().includes(w)));
    
    if (potentialNameLines.length > 0) {
      brand = potentialNameLines[0].split(' ')[0] || null; // Just guess first word is brand
      if (brand && brand.length > 15) brand = null; // Filter out garbage OCR
      
      productName = potentialNameLines.slice(0, 2).join(' ').substring(0, 50);
    }

    return {
      brand,
      productName,
      modelNumber,
      serialNumber,
      purchaseDate,
      warrantyDate
    };
  }
}

export const ocrService = new OcrService();
