import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import ImpressumScreen from './components/ImpressumScreen.jsx'
import DatenschutzScreen from './components/DatenschutzScreen.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/impressum" element={<ImpressumScreen />} />
        <Route path="/datenschutz" element={<DatenschutzScreen />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)