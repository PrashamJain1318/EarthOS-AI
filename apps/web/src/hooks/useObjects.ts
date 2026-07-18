import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { objectService, ObjectFilters } from '../services/objectService';

export const useObject = (id: string) => {
  return useQuery({
    queryKey: ['object', id],
    queryFn: async () => {
      const response = await objectService.getObjectById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useInfiniteObjects = (filters: ObjectFilters) => {
  return useInfiniteQuery({
    queryKey: ['objects', filters],
    queryFn: async ({ pageParam = 1 }) => {
      return objectService.getObjects({ ...filters, page: pageParam, limit: 12 });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
  });
};

export const useUpdateObject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ObjectItem> }) => 
      objectService.updateObject(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['object', id] });
      await queryClient.cancelQueries({ queryKey: ['objects'] });

      const previousObject = queryClient.getQueryData(['object', id]);

      // Optimistically update the single object query
      queryClient.setQueryData(['object', id], (old: ObjectItem | undefined) => {
        if (!old) return data;
        return { ...old, ...data };
      });

      return { previousObject };
    },
    onError: (err, newObject, context) => {
      // Rollback to previous state on error
      if (context?.previousObject) {
        queryClient.setQueryData(['object', newObject.id], context.previousObject);
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['object', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['objects'] });
    },
  });
};

export const useDeleteObject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => objectService.deleteObject(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['objects'] });
      
      const previousObjects = queryClient.getQueryData(['objects']);

      // Optimistically remove from list
      queryClient.setQueryData(['objects'], (old: { pages: { data: ObjectItem[] }[] } | undefined) => {
        if (!old || !old.pages) return old;
        return {
          ...old,
          pages: old.pages.map(page => ({
            ...page,
            data: page.data.filter(obj => obj._id !== id)
          }))
        };
      });

      return { previousObjects };
    },
    onError: (err, id, context) => {
      if (context?.previousObjects) {
        queryClient.setQueryData(['objects'], context.previousObjects);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['objects'] });
    },
  });
};
