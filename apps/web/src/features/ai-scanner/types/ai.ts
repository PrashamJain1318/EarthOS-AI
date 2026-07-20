export type ObjectCondition = 'New' | 'Good' | 'Fair' | 'Poor';

export interface ObjectRecognitionResult {
  category: string;
  productType: string;
  condition: ObjectCondition;
  damageDetected: string[];
  confidence: {
    category: number;
    productType: number;
    condition: number;
    overall: number;
  };
}

export interface AIProvider {
  /**
   * Analyzes an image and returns structured object recognition data.
   * @param image Data URL, File, or Blob
   */
  analyzeObject(image: string | File | Blob | HTMLCanvasElement): Promise<ObjectRecognitionResult | null>;
}
