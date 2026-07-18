import { useQuery } from '@tanstack/react-query';
import { aiInsightsService } from '../services/aiInsightsService';
import { ObjectItem } from '../services/objectService';

export const useAiInsights = (object: ObjectItem) => {
  return useQuery({
    queryKey: ['ai-insights', object._id, object.repairCount, object.condition], // Re-fetch if key stats change
    queryFn: () => aiInsightsService.getInsightsForObject(object),
    enabled: !!object,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};
