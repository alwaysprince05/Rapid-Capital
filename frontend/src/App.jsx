import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import KnowledgeHub from './pages/KnowledgeHub'
import DeveloperDocs from './pages/DeveloperDocs'
import LiveTest from './pages/LiveTest'
import AdminDashboard from './pages/AdminDashboard'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/knowledge" element={<KnowledgeHub />} />
                <Route path="/docs" element={<DeveloperDocs />} />
                <Route path="/test" element={<LiveTest />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

