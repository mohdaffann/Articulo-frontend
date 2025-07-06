import { createRoot } from 'react-dom/client'
import React from 'react'
import axios from 'axios';
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'



const queryClient = new QueryClient();
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <>
    <QueryClientProvider client={queryClient}>
      <App />

    </QueryClientProvider>

  </>


)
