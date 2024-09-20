import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { FileText, MessageSquare, Upload, Droplet, AlertTriangle, LogOut, CheckSquare, XSquare, Edit2 } from 'lucide-react';
import axios from 'axios';
import Select from 'react-select';


const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/check-auth', { withCredentials: true });
      if (response.data.authenticated) {
        setUser(response.data.user);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/logout', { withCredentials: true });
      localStorage.removeItem('isLoggedIn');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/posts" element={<PostsContent />} />
              <Route path="/upload" element={<UploadContent />} />
              <Route path="/beaches" element={<BeachesContent />} />
              <Route path="/reports" element={<ReportsContent />} />
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
    <div className="bg-blue-800 text-blue-100 w-64 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav className="flex flex-col space-y-2">
        <SidebarLink icon={FileText} text="Dashboard" to="/admin" active={location.pathname === '/admin'} />
        <SidebarLink icon={MessageSquare} text="Moderate Posts" to="/admin/posts" active={location.pathname === '/admin/posts'} />
        <SidebarLink icon={Upload} text="Upload Data" to="/admin/upload" active={location.pathname === '/admin/upload'} />
        <SidebarLink icon={Droplet} text="Manage Beaches" to="/admin/beaches" active={location.pathname === '/admin/beaches'} />
        <SidebarLink icon={AlertTriangle} text="View Reports" to="/admin/reports" active={location.pathname === '/admin/reports'} />
      </nav>
    </div>
  );
};

const SidebarLink = ({ icon: Icon, text, to, active }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 py-2.5 px-4 rounded transition duration-200 ${
      active ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
    }`}
  >
    <Icon size={20} />
    <span className="text-sm font-medium">{text}</span>
  </Link>
);


const Header = ({ user, onLogout }) => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
      <div className="flex items-center">
        <span className="mr-4">Welcome, {user}</span>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center"
        >
          <LogOut size={18} className="mr-2" /> Logout
        </button>
      </div>
    </div>
  </header>
);

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Beaches" value="75" icon={Droplet} />
        <DashboardCard title="Pending Comments" value="12" icon={MessageSquare} />
        <DashboardCard title="Recent Reports" value="5" icon={AlertTriangle} />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
    <div className="rounded-full bg-blue-100 p-3 mr-4">
      <Icon size={24} className="text-blue-600" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const PostsContent = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const fetchPendingPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5000/api/community/posts/pending', { withCredentials: true });
      setPendingPosts(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching pending posts:', error);
      setError('Failed to fetch pending posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (postId) => {
    try {
      await axios.post(`http://localhost:5000/api/community/posts/${postId}/approve`, {}, { withCredentials: true });
      fetchPendingPosts();
    } catch (error) {
      console.error('Error approving post:', error);
      alert('Failed to approve post. Please try again.');
    }
  };

  const handleDisapprove = async (postId) => {
    try {
      await axios.post(`http://localhost:5000/api/community/posts/${postId}/disapprove`, {}, { withCredentials: true });
      fetchPendingPosts();
    } catch (error) {
      console.error('Error disapproving post:', error);
      alert('Failed to disapprove post. Please try again.');
    }
  };

  if (isLoading) {
    return <div>Loading pending posts...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pending Community Posts</h2>
      {pendingPosts.length === 0 ? (
        <p>No pending posts at the moment.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beach</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingPosts.map((post) => (
                <tr key={post.post_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.beach_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{post.content}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleApprove(post.post_id)} className="text-green-600 hover:text-green-900 mr-2">
                      <CheckSquare size={18} />
                    </button>
                    <button onClick={() => handleDisapprove(post.post_id)} className="text-red-600 hover:text-red-900">
                      <XSquare size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

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
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false);
      setFile(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Upload Water Quality Data</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
              Select PDF file to upload
            </label>
            <input
              type="file"
              id="file-upload"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !file}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

const BeachesContent = () => {
  const [beaches, setBeaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBeaches();
  }, []);

  const fetchBeaches = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/beaches');
      setBeaches(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching beaches:', error);
      setError('Failed to fetch beaches. Please try again.');
      setLoading(false);
    }
  };

  const updateBeachStatus = async (beachName, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/beaches/${encodeURIComponent(beachName)}`, { status: newStatus });
      fetchBeaches(); // Refresh the beach list after updating
    } catch (error) {
      console.error('Error updating beach status:', error);
      alert('Failed to update beach status. Please try again.');
    }
  };

  if (loading) return <div>Loading beaches...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Manage Beaches</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sampled</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {beaches.map((beach) => (
              <tr key={beach.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{beach.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Select
  value={{ label: beach.is_safe, value: beach.is_safe }}
  onChange={(selectedOption) => updateBeachStatus(beach.name, selectedOption.value)}
  options={[
    { value: 'Excellent', label: 'Excellent' },
    { value: 'Good', label: 'Good' },
    { value: 'Poor', label: 'Poor' },
    { value: 'Unknown', label: 'Unknown' }
  ]}
/>

                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(beach.date_sampled).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


const ReportsContent = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch reports from your backend
    // This is a placeholder using mock data
    const mockReports = [
      { id: 1, date: '2024-09-15', beach: 'Clifton Beach', type: 'Water Quality', status: 'Pending' },
      { id: 2, date: '2024-09-14', beach: 'Muizenberg Beach', type: 'Litter', status: 'Resolved' },
      { id: 3, date: '2024-09-13', beach: 'Camps Bay Beach', type: 'Facilities', status: 'In Progress' },
    ];
    setReports(mockReports);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">View Reports</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beach</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.beach}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${report.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                      report.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;