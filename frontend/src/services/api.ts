import axios from 'axios';
import type { SenyoQuote, CreateQuoteRequest } from '@/types';

// In development, use relative URLs so Vite proxy can forward to backend
// In production, use the full backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const quotesApi = {
  getAllQuotes: async (): Promise<SenyoQuote[]> => {
    const response = await apiClient.get<SenyoQuote[]>('/api/quotes');
    return response.data;
  },

  createQuote: async (quoteData: CreateQuoteRequest): Promise<SenyoQuote> => {
    const response = await apiClient.post<SenyoQuote>('/api/quotes', quoteData);
    return response.data;
  },
};