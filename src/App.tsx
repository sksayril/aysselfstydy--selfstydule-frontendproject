import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Blog from './components/Blog';
import StudyMaterials from './components/StudyMaterials';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/study-materials/:categoryId?" element={<StudyMaterials />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;