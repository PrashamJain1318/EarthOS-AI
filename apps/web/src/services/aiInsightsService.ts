import { ObjectItem } from './objectService';

export interface AiInsightMetrics {
  conditionScore: number;
  resaleValue: number;
  carbonImpactSaved: number;
  lifecyclePredictionMonths: number;
}

export interface AiRecommendation {
  id: string;
  title: string;
  description: string;
  type: 'REPAIR' | 'UPGRADE' | 'RECYCLE' | 'MAINTENANCE';
  confidence: number;
}

export interface ObjectAiInsights {
  metrics: AiInsightMetrics;
  environmentalImpact: string;
  recommendations: AiRecommendation[];
}

/**
 * Mock AI Service.
 * In the future, this will be replaced with a real fetch call to the EARTHOS AI backend 
 * (e.g. Gemini / OpenAI integration).
 */
export const aiInsightsService = {
  getInsightsForObject: async (object: ObjectItem): Promise<ObjectAiInsights> => {
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock logic based on object data
    const baseValue = object.purchasePrice || 1000;
    const conditionMultiplier = object.condition === 'NEW' ? 0.9 : object.condition === 'GOOD' ? 0.7 : 0.4;
    const repairPenalty = (object.repairCount || 0) * 0.05;
    const resaleValue = Math.max(0, baseValue * (conditionMultiplier - repairPenalty));

    const conditionScore = Math.max(10, Math.round(100 - (object.repairCount * 15)));
    
    return {
      metrics: {
        conditionScore,
        resaleValue: Number(resaleValue.toFixed(2)),
        carbonImpactSaved: object.carbonScore || 42.5,
        lifecyclePredictionMonths: object.condition === 'NEW' ? 48 : object.condition === 'GOOD' ? 24 : 6,
      },
      environmentalImpact: `By keeping this ${object.category} in circulation instead of purchasing a new one, you have offset approximately ${(object.carbonScore || 42.5).toFixed(1)} kg of CO2 equivalent.`,
      recommendations: [
        {
          id: 'rec-1',
          title: 'Preventative Battery Service',
          description: 'Based on the lifecycle stage, a battery health check is recommended within the next 3 months to prevent unexpected failure.',
          type: 'MAINTENANCE',
          confidence: 0.89,
        },
        {
          id: 'rec-2',
          title: 'Optimal Resale Window',
          description: 'Market data indicates the resale value for this model drops significantly after 36 months. Consider listing it soon.',
          type: 'UPGRADE',
          confidence: 0.74,
        }
      ]
    };
  }
};
