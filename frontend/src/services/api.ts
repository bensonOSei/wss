import type { SenyoQuote, CreateQuoteRequest } from "@/types";

const API_BASE_URL = '';

export const quotesApi = {
  getAllQuotes: async (): Promise<SenyoQuote[]> => {
    const response = await fetch(`${API_BASE_URL}/api/quotes`);
    if (!response.ok) {
      throw new Error('Failed to fetch quotes');
    }
    return response.json();
  },

  createQuote: async (quoteData: CreateQuoteRequest): Promise<SenyoQuote> => {
    const response = await fetch(`${API_BASE_URL}/api/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quoteData),
    });
    if (!response.ok) {
      throw new Error('Failed to create quote');
    }
    return response.json();
  },
};