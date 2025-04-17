
import { createRoot } from 'react-dom/client'
import React, { useEffect } from 'react'
import App from './App'
import authStore from './store/authStore'



createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>


)
