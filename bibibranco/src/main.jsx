import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Project from './pages/Project.jsx';
import RouteTracker from './components/Analytics/RouteTracker';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project/:projectId" element={<Project />}/>
      </Routes>
    </Router>
  </React.StrictMode>
)
