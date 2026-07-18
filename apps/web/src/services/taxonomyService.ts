import { api } from '../lib/api';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  parentId: string | null;
  usageCount: number;
}

export interface Tag {
  _id: string;
  name: string;
  slug: string;
  usageCount: number;
}

export const taxonomyService = {
  getCategories: async (q?: string, parentId?: string | null): Promise<{ success: boolean; data: Category[] }> => {
    let url = '/taxonomy/categories';
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (parentId !== undefined) params.append('parentId', parentId === null ? 'null' : parentId);
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    return api.get(url);
  },

  getPopularTags: async (limit: number = 10): Promise<{ success: boolean; data: Tag[] }> => {
    return api.get(`/taxonomy/tags/popular?limit=${limit}`);
  },

  searchTags: async (q: string): Promise<{ success: boolean; data: Tag[] }> => {
    return api.get(`/taxonomy/tags/search?q=${encodeURIComponent(q)}`);
  }
};
