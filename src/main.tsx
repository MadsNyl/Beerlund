import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './routes/App.tsx'
import { nbNO } from '@clerk/localizations'
import EventsPage from './routes/Events.tsx'
import EventDetails from './routes/EventDetails.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ScrollToTop } from './components/ScrollToTop.tsx'
import { Toaster } from './components/ui/sonner.tsx'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { 
      staleTime: 1000 * 60 * 5,  // 5m
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <ClerkProvider
          localization={nbNO}
          publishableKey={PUBLISHABLE_KEY}
          afterSignOutUrl="/"
        >
          <Routes>
            <Route path="/" element={<App />} />
            <Route path='/events' element={<EventsPage />} />
            <Route
              path="/events/:id"
              element={<EventDetails />}
            />
          </Routes>
          <Toaster position='top-right' />
        </ClerkProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
