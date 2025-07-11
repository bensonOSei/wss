import { QuoteCard } from './components/QuoteCard'
import { AddQuoteForm } from './components/AddQuoteForm'
import { useQuotes } from './hooks/useQuotes'
import { Loader2, AlertCircle } from 'lucide-react'
import './App.css'

function App() {
  const { data: quotes, isLoading, error } = useQuotes()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading quotes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">Failed to load quotes. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Senyo Once Said</h1>
          <p className="text-gray-600 mt-2">A collection of wisdom from our office sage</p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {!quotes || quotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No quotes yet. Be the first to add one!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {quotes.map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </div>
        )}
      </main>
      
      <AddQuoteForm />
    </div>
  )
}

export default App
