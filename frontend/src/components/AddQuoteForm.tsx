import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2 } from "lucide-react";
import { useCreateQuote } from "@/hooks/useQuotes";

export function AddQuoteForm() {
  const [quote, setQuote] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const createQuoteMutation = useCreateQuote();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quote.trim()) {
      createQuoteMutation.mutate(
        { quote: quote.trim() },
        {
          onSuccess: () => {
            setQuote("");
            setIsOpen(false);
          },
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add a New Senyo Quote</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="What did Senyo say?"
            className="min-h-[100px] resize-none"
            maxLength={500}
            disabled={createQuoteMutation.isPending}
          />
          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              disabled={createQuoteMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!quote.trim() || createQuoteMutation.isPending}
            >
              {createQuoteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Quote"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}