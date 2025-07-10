import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quotesApi } from '@/services/api';
import type { CreateQuoteRequest } from '@/types';

export const useQuotes = () => {
  return useQuery({
    queryKey: ['quotes'],
    queryFn: quotesApi.getAllQuotes,
  });
};

export const useCreateQuote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quoteData: CreateQuoteRequest) => quotesApi.createQuote(quoteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
  });
};