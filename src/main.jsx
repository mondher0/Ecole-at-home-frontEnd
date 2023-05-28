/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SearchProvider from './context/SearchContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <SearchProvider>
    <App />
  </SearchProvider>
)
