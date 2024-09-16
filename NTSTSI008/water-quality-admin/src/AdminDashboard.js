import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Upload, Users, MessageSquare, Search, LogOut, FileText, CheckSquare, XSquare } from 'lucide-react';
import axios from 'axios';


const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<DashboardContent />} />
              <Route path="/upload" element={<UploadContent />} />
              <Route path="/reports" element={<ReportsContent />} />
              <Route path="/posts" element={<PostsContent />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-indigo-700 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="mt-8">
        <SidebarItem icon={<FileText />} text="Dashboard" to="/admin" active={location.pathname === '/admin'} />
        <SidebarItem icon={<Upload />} text="Upload Data" to="/admin/upload" active={location.pathname === '/admin/upload'} />
        <SidebarItem icon={<Users />} text="Beachgoer Reports" to="/admin/reports" active={location.pathname === '/admin/reports'} />
        <SidebarItem icon={<MessageSquare />} text="Community Posts" to="/admin/posts" active={location.pathname === '/admin/posts'} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text, to, active }) => (
  <Link
    to={to}
    className={`flex items-center py-2 px-4 transition duration-200 ${
      active ? 'bg-indigo-800' : 'hover:bg-indigo-600'
    }`}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </Link>
);

axios.defaults.withCredentials = true;

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/logout');
      if (response.data.status === 'success') {
        navigate('/login');
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Water Quality Management</h2>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-red-600 transition duration-300">
          <LogOut size={18} className="mr-2" /> Logout
        </button>
      </div>
    </header>
  );
};

const DashboardContent = () => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Today's Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Beaches" value="15" icon={<FileText size={24} />} color="bg-blue-500" />
      <StatCard title="New Reports" value="5" icon={<Users size={24} />} color="bg-green-500" />
      <StatCard title="Pending Posts" value="8" icon={<MessageSquare size={24} />} color="bg-yellow-500" />
      <StatCard title="Data Updates" value="3" icon={<Upload size={24} />} color="bg-purple-500" />
    </div>
  </div>
);

const StatCard = ({ title, value, icon, color }) => (
  <div className={`${color} text-white rounded-lg shadow-md p-4 flex items-center justify-between`}>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    <div className="text-white opacity-75">{icon}</div>
  </div>
);

const UploadContent = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setMessage(`Selected file: ${selectedFile.name}`);
    } else {
      setFile(null);
      setMessage('Please select a valid PDF file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false);
      setFile(null); // Reset file selection after upload
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Water Quality Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="border-dashed border-2 border-gray-300 rounded-lg p-8 text-center">
          <Upload size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Click the button below to open file selector</p>
          <input 
            type="file" 
            className="hidden" 
            id="file-upload" 
            accept=".pdf"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-700 transition duration-300">
            Select File
          </label>
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: {file.name}
            </p>
          )}
        </div>
        <button 
          type="submit" 
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
          disabled={isLoading || !file}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

const ReportsContent = () => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Beachgoer Reports</h2>
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beach</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Type</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {/* Sample data - replace with actual data */}
        <ReportRow date="2024-09-10" beach="Clifton" type="Water Quality" status="Pending" />
        <ReportRow date="2024-09-09" beach="Muizenberg" type="Litter" status="Reviewed" />
      </tbody>
    </table>
  </div>
);

const ReportRow = ({ date, beach, type, status }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">{date}</td>
    <td className="px-6 py-4 whitespace-nowrap">{beach}</td>
    <td className="px-6 py-4 whitespace-nowrap">{type}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <a href="#" className="text-indigo-600 hover:text-indigo-900">View</a>
    </td>
  </tr>
);

const PostsContent = () => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Community Posts</h2>
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content Preview</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {/* Sample data - replace with actual data */}
        <PostRow date="2024-09-10" author="JohnDoe" content="Great day at the beach!" status="Pending" />
        <PostRow date="2024-09-09" author="JaneSmith" content="Water seemed a bit murky today." status="Approved" />
      </tbody>
    </table>
  </div>
);

const PostRow = ({ date, author, content, status }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">{date}</td>
    <td className="px-6 py-4 whitespace-nowrap">{author}</td>
    <td className="px-6 py-4 whitespace-nowrap">{content.substring(0, 30)}...</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
        status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button className="text-green-600 hover:text-green-900 mr-2">
        <CheckSquare size={18} />
      </button>
      <button className="text-red-600 hover:text-red-900">
        <XSquare size={18} />
      </button>
    </td>
  </tr>
);

export default AdminDashboard;