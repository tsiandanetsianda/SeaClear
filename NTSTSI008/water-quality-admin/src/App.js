import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import BeachDetailsPage from './BeachDetailsPage';
import EducationalContentPage from './EducationalContentPage';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/beach/:beachName" element={<BeachDetailsPage />} />
        <Route path="/education" element={<EducationalContentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;