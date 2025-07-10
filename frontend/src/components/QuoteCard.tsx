import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { SenyoQuote } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface QuoteCardProps {
  quote: SenyoQuote;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <Card className="w-full max-w-lg mx-auto mb-4 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <blockquote className="text-lg font-medium text-gray-900 italic">
          "{quote.quote}"
        </blockquote>
        <cite className="block mt-2 text-sm text-gray-600">— Senyo</cite>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-gray-50 border-t">
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(quote.timestamp), { addSuffix: true })}
        </p>
      </CardFooter>
    </Card>
  );
}