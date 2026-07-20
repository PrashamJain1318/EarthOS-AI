import { AIProvider } from '../../types/ai';
import { MockAIProvider } from './providers/mockProvider';

class AIProviderRegistry {
  private activeProvider: AIProvider;

  constructor() {
    // In the future, this can be swapped based on environment variables
    // e.g. import.meta.env.VITE_AI_PROVIDER === 'gemini' ? new GeminiProvider() : new MockAIProvider()
    this.activeProvider = new MockAIProvider();
  }

  public getProvider(): AIProvider {
    return this.activeProvider;
  }
}

export const aiRegistry = new AIProviderRegistry();
