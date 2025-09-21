import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CoursePage from './pages/CoursePage';
import ProgressPage from './pages/ProgressPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/generate/:id" element={<ProgressPage />} />
          <Route path="/course/:id" element={<CoursePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;