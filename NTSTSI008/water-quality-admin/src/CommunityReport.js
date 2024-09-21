import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CommunityReport = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [beach, setBeach] = useState('');
  const [description, setDescription] = useState('');
  const [action, setAction] = useState('');
  const navigate = useNavigate();

  const beaches = [
    "Bailey's Cottage Beach", "Bakoven Beach", "Beta Beach", "Big Bay Beach", "Bikini Beach",
    "Blaauwberg Beach", "Blue Waters Beach", "Broken Baths Beach", "Camps Bay Beach",
    "Cayman Beach", "Cemetery Beach", "Clifton 1st Beach", "Clifton 2nd Beach", "Clifton 3rd Beach",
    "Clifton 4th Beach", "Clovelly Beach", "Cosy Bay", "Dalebrook Beach", "Danger Beach",
    "Dappat se Gat Beach", "Dolphin Beach", "East Beach", "Fish Hoek Beach", "Fisherman's Beach",
    "Frank's Beach", "Glen Beach", "Glencairn Beach", "Gordon's Bay Beach", "Granger Bay Beach",
    "Harmony Park Beach", "Hendon Park Resort Beach", "Hout Bay Beach", "Kalk Bay Beach",
    "Klippies Bay Beach", "Kogel Bay Beach", "Llandudno Beach", "Long Beach, Kommetjie",
    "Long Beach, Simon's Town", "Macassar Beach", "Mackerel Beach", "Maiden's Cove Beach",
    "Melkbaai Beach", "Melkbosstrand Beach", "Miller's Point Beach", "Miller's Point Day Camp Area",
    "Milnerton Beach", "Milnerton Lagoon", "Milton Beach", "Misty Cliffs Beach", "Mnandi Beach",
    "Monwabisi Beach", "Mostertsbaai Beach", "Muizenberg Beach", "Nine Miles Beach", "Queen's Beach",
    "Rocklands Beach", "Rocky Beach", "Saunders' Rocks Beach", "Seaforth Beach", "Shelley Beach",
    "Silwerstroomstrand Beach", "Small Bay Beach", "Soetwater Beach", "Sonwabe Beach",
    "Spark's Bay Beach", "St James Beach", "Strand Beach", "Strandfontein Beach", "Sunrise Beach",
    "Sunset Beach, Gordon's Bay", "Sunset Beach, Milnerton", "Surfer's Corner Beach",
    "Table View Beach", "Three Anchor Bay Beach", "Water's Edge Beach", "Windmill Beach",
    "Wireless Road Beach", "Witsands Beach"
  ]; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!name || !contact || !beach || !description || !action) {
      alert('Please fill in all required fields');
      return;
    }

    const reportData = {
      name,
      contact,
      beach,
      description,
      action
    };

    try {
      const response = await axios.post('http://localhost:5000/api/community/report', reportData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        alert('Report submitted successfully');
        navigate('/');
      }
    } catch (error) {
      console.error("Error submitting report:", error.response ? error.response.data : error.message);
      alert("Error submitting report: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto max-w-lg shadow-md rounded-lg bg-white p-8">
        <h2 className="text-2xl font-bold mb-6">Submit a Community Report</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Contact Information</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Beach of Concern</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={beach}
              onChange={(e) => setBeach(e.target.value)}
              required
            >
              <option value="">Select a Beach</option>
              {beaches.map((beach, index) => (
                <option key={index} value={beach}>{beach}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description of the Issue</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Type of Action Required</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              required
            >
              <option value="">Select Action</option>
              <option value="Investigation">Investigation</option>
              <option value="Feedback">Feedback</option>
              <option value="Immediate Attention">Immediate Attention</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              Submit Report
            </button>
            <Link to="/" className="text-blue-500 p-2 hover:underline">Back to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityReport;