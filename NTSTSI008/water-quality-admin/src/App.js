import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import BeachDetailsPage from './BeachDetailsPage';
import CommunityPage from './CommunityPage';
import EducationalContentPage from './EducationalContentPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

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
      </Routes>
    </Router>
  );
}

export default App;