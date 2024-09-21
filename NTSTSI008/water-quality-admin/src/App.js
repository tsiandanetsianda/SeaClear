import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import BeachDetailsPage from './BeachDetailsPage';
import CommunityPage from './CommunityPage';
import EducationalContentPage from './EducationalContentPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import AboutPage from './AboutPage';
import CommunityReport from './CommunityReport'; // Ensure casing is consistent



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/beach/:beachName" element={<BeachDetailsPage />} />
        <Route path="/education" element={<EducationalContentPage />} />
        <Route path="/community" element={<CommunityPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/report" element={<CommunityReport />} />
      </Routes>
    </Router>
  );
}

export default App;