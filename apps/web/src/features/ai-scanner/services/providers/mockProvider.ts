import { AIProvider, ObjectRecognitionResult } from '../../types/ai';

export class MockAIProvider implements AIProvider {
  public async analyzeObject(image: string | File | Blob | HTMLCanvasElement): Promise<ObjectRecognitionResult | null> {
    // Simulate network delay for AI processing
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return a realistic mock response
        resolve({
          category: 'Electronics',
          productType: 'Laptop',
          condition: 'Fair',
          damageDetected: ['Scratched chassis', 'Worn keys'],
          confidence: {
            category: 0.98,
            productType: 0.92,
            condition: 0.75,
            overall: 0.88
          }
        });
      }, 3000);
    });
  }
}
