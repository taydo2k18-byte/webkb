import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { KbSection, KbArticle, InsertKbSection, InsertKbArticle } from '@shared/schema';

// Knowledge Base Sections
export function useSections() {
  return useQuery<KbSection[]>({
    queryKey: ['/api/sections'],
  });
}

export function useSection(id: string) {
  return useQuery<KbSection>({
    queryKey: ['/api/sections', id],
    enabled: !!id,
  });
}

export function useCreateSection() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (section: InsertKbSection) => {
      const res = await apiRequest('POST', '/api/sections', section);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sections'] });
    },
  });
}

export function useUpdateSection() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, section }: { id: string; section: Partial<InsertKbSection> }) => {
      const res = await apiRequest('PUT', `/api/sections/${id}`, section);
      return res.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['/api/sections'] });
      queryClient.invalidateQueries({ queryKey: ['/api/sections', id] });
    },
  });
}

export function useDeleteSection() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/sections/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sections'] });
    },
  });
}

// Knowledge Base Articles
export function useArticles(params?: { sectionId?: string; search?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.sectionId) searchParams.set('sectionId', params.sectionId);
  if (params?.search) searchParams.set('search', params.search);
  
  const queryKey = params?.search 
    ? ['/api/articles', 'search', params.search]
    : params?.sectionId 
    ? ['/api/articles', 'section', params.sectionId]
    : ['/api/articles'];

  return useQuery<KbArticle[]>({
    queryKey,
    queryFn: async () => {
      const url = `/api/articles${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
      return res.json();
    },
  });
}

export function useArticle(id: string) {
  return useQuery<KbArticle>({
    queryKey: ['/api/articles', id],
    enabled: !!id,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (article: InsertKbArticle) => {
      const res = await apiRequest('POST', '/api/articles', article);
      return res.json();
    },
    onSuccess: (_, article) => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      queryClient.invalidateQueries({ queryKey: ['/api/articles', 'section', article.sectionId] });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, article }: { id: string; article: Partial<InsertKbArticle> }) => {
      const res = await apiRequest('PUT', `/api/articles/${id}`, article);
      return res.json();
    },
    onSuccess: (updatedArticle: KbArticle, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
      queryClient.invalidateQueries({ queryKey: ['/api/articles', id] });
      queryClient.invalidateQueries({ queryKey: ['/api/articles', 'section', updatedArticle.sectionId] });
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/articles'] });
    },
  });
}