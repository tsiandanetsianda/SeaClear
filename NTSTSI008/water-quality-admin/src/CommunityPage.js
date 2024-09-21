import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CommunityPage.css';
import Header from './Header'; // Import the shared header

axios.defaults.baseURL = 'http://localhost:5000';

const CommunityPage = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newDiscussion, setNewDiscussion] = useState({ title: '', description: '', category: 'Beach Experiences' });
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(null);
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [activeDiscussion, setActiveDiscussion] = useState(null);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  useEffect(() => {
    filterDiscussions();
  }, [discussions, searchQuery, selectedCategory]);

  const fetchDiscussions = async () => {
    try {
      const response = await axios.get('/api/general-discussions');
      setDiscussions(response.data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    }
  };

  const filterDiscussions = () => {
    let updatedDiscussions = [...discussions];
    if (searchQuery) {
      updatedDiscussions = updatedDiscussions.filter(discussion =>
        discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        discussion.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      updatedDiscussions = updatedDiscussions.filter(discussion =>
        discussion.category === selectedCategory
      );
    }
    setFilteredDiscussions(updatedDiscussions);
  };

  const handleNewDiscussionChange = (e) => {
    const { name, value } = e.target;
    setNewDiscussion({ ...newDiscussion, [name]: value });
  };

  const handleAddDiscussion = async () => {
    if (newDiscussion.title.trim() === '' || newDiscussion.description.trim() === '') {
        alert('Please fill in all fields');
        return;
    }
    try {
        const payload = {
            title: newDiscussion.title,
            content: newDiscussion.description,
            category: newDiscussion.category,
            author: 'Anonymous'
        };
        const response = await axios.post('/api/general-discussions', payload);
        setDiscussions(prevDiscussions => {
          const discussionExists = prevDiscussions.some(discussion => discussion._id === response.data._id);
          if (!discussionExists) {
            return [...prevDiscussions, response.data];
          }
          return prevDiscussions;
        });
        setNewDiscussion({ title: '', description: '', category: 'Beach Experiences' });
        setShowDiscussionForm(false);
        fetchDiscussions();
    } catch (error) {
        console.error('Error adding discussion:', error);
        alert('Failed to add discussion');
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`/api/general-discussions/${postId}/comments`);
      const sortedComments = response.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      setComments({ ...comments, [postId]: sortedComments });
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  
  const handleAddComment = async (postId) => {
    if (newComment.trim() === '') {
      alert('Comment cannot be empty');
      return;
    }
    try {
      const payload = {
        content: newComment,
        author: 'Anonymous'
      };
      const response = await axios.post(`/api/general-discussions/${postId}/comments`, payload);
      setComments(prevComments => {
        const updatedComments = prevComments[postId] ? [...prevComments[postId]] : [];
        updatedComments.push(response.data);
        return { ...prevComments, [postId]: updatedComments };
      });
      setNewComment('');
      setShowCommentBox(null);
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleBackToDiscussions = () => {
    setActiveDiscussion(null);
    setShowCommentBox(null);
    setNewComment('');
  };

  return (
    <div className="community-page">
      <Header /> {/* Use shared Header component */}

      <div className="community-header">
        <h1>Community Discussions</h1>
        <p>Share your beach experiences and join the conversation about water quality.</p>
        <div className="community-controls">
          <input
            type="text"
            className="search-bar"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Beach Experiences">Beach Experiences</option>
            <option value="Water Quality Awareness">Water Quality Awareness</option>
            <option value="Beach Events and Cleanups">Beach Events and Cleanups</option>
          </select>
          <button className="button" onClick={() => setShowDiscussionForm(!showDiscussionForm)}>
            {showDiscussionForm ? 'Cancel' : 'Start a New Discussion'}
          </button>
        </div>
      </div>

      {showDiscussionForm && (
        <div className="new-discussion-form">
          <h3>Add a New Discussion</h3>
          <input
            type="text"
            name="title"
            placeholder="Discussion Title"
            value={newDiscussion.title}
            onChange={handleNewDiscussionChange}
          />
          <textarea
            name="description"
            placeholder="Discussion Description"
            value={newDiscussion.description}
            onChange={handleNewDiscussionChange}
          />
          <select
            name="category"
            value={newDiscussion.category}
            onChange={handleNewDiscussionChange}
          >
            <option value="Beach Experiences">Beach Experiences</option>
            <option value="Water Quality Awareness">Water Quality Awareness</option>
            <option value="Beach Events and Cleanups">Beach Events and Cleanups</option>
          </select>
          <button className="button" onClick={handleAddDiscussion}>Add Discussion</button>
        </div>
      )}

      {activeDiscussion && (
        <button className="back-button" onClick={handleBackToDiscussions}>
          Back to Discussions
        </button>
      )}

      <div className="discussion-list">
        {filteredDiscussions.length > 0 ? (
          filteredDiscussions.map(discussion => (
            <div key={discussion._id} className="discussion-card">
              <h2>{discussion.title || "Discussion"}</h2>
              <p className="discussion-category">Category: {discussion.category}</p>
              <p>{discussion.content}</p>
              <div className="discussion-info">
                <span>Author: {discussion.author}</span>
                <span className="time-posted">Time Posted: {formatDate(discussion.created_at)}</span>
              </div>
              <button onClick={() => {
                if (activeDiscussion === discussion._id) {
                  setActiveDiscussion(null);
                  setShowCommentBox(null);
                } else {
                  setActiveDiscussion(discussion._id);
                  fetchComments(discussion._id);
                }
              }}>
                {activeDiscussion === discussion._id ? 'Hide Comments' : 'View Comments'}
              </button>

              {activeDiscussion === discussion._id && comments[discussion._id] && (
                <div className="comments-section">
                  {comments[discussion._id].map((comment) => (
                    <div key={comment._id} className="comment">
                      <p>{comment.content}</p>
                      <span className="comment-author">By {comment.author}</span>
                      <span className="time-posted">{formatDate(comment.created_at)}</span>
                    </div>
                  ))}
                  <div className="comment-box">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                    />
                    <button onClick={() => handleAddComment(discussion._id)}>Add Comment</button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No discussions found.</p>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
