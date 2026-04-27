import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
const cleanRoute = window.location.pathname.startsWith(basePath)
  ? window.location.pathname.slice(basePath.length)
  : ''

if (!window.location.hash && cleanRoute && cleanRoute !== '/') {
  window.history.replaceState(null, '', `${basePath}/#${cleanRoute}${window.location.search}`)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
