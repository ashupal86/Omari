import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import GeneratePage from './pages/GeneratePage'
import DocsPage from './pages/DocsPage'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
