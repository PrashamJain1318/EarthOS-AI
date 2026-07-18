import { useQuery } from '@tanstack/react-query';
import { taxonomyService } from '../services/taxonomyService';

export const useCategories = (q?: string, parentId?: string | null) => {
  return useQuery({
    queryKey: ['categories', q, parentId],
    queryFn: async () => {
      const response = await taxonomyService.getCategories(q, parentId);
      return response.data;
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

export const usePopularTags = (limit: number = 10) => {
  return useQuery({
    queryKey: ['popularTags', limit],
    queryFn: async () => {
      const response = await taxonomyService.getPopularTags(limit);
      return response.data;
    },
    staleTime: 5 * 60 * 1000
  });
};

export const useTagSearch = (q: string) => {
  return useQuery({
    queryKey: ['searchTags', q],
    queryFn: async () => {
      if (!q) return [];
      const response = await taxonomyService.searchTags(q);
      return response.data;
    },
    enabled: q.length > 0,
    staleTime: 1 * 60 * 1000
  });
};
