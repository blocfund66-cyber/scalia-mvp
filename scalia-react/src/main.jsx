import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ScaliaProvider } from './context/ScaliaContext'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScaliaProvider>
      <App />
    </ScaliaProvider>
  </StrictMode>,
)
