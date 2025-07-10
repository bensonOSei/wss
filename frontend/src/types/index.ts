export interface SenyoQuote {
  id: string;
  quote: string;
  timestamp: string;
}

export interface CreateQuoteRequest {
  quote: string;
}