import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './CommunityPage.css';

axios.defaults.baseURL = 'http://localhost:5000';  // Ensure baseURL is set to your backend server

const CommunityPage = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newDiscussion, setNewDiscussion] = useState({ title: '', description: '', category: 'Beach Experiences' });
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState(''); // Controlled state for new comment input
  const [showCommentBox, setShowCommentBox] = useState(null); // State to control which comment box is visible
  const [showDiscussionForm, setShowDiscussionForm] = useState(false); // State to control form visibility

  useEffect(() => {
    fetchDiscussions();
  }, []);

  useEffect(() => {
    filterDiscussions();
  }, [discussions, searchQuery, selectedCategory]);

  const fetchDiscussions = async () => {
    try {
      const response = await axios.get('/api/community/posts');
      setDiscussions(response.data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    }
  };

  const filterDiscussions = () => {
    let updatedDiscussions = discussions;

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

        console.log("Payload being sent:", payload);  // Debugging statement

        const response = await axios.post('/api/community/posts', payload);
        setDiscussions([...discussions, response.data]);
        setNewDiscussion({ title: '', description: '', category: 'Beach Experiences' });
        setShowDiscussionForm(false);  // Hide form after adding discussion
        fetchDiscussions();  // Fetch discussions again to update the list
    } catch (error) {
        console.error('Error adding discussion:', error);
        alert('Failed to add discussion');
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`/api/community/posts/${postId}/comments`);
      setComments({ ...comments, [postId]: response.data });
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

      const response = await axios.post(`/api/community/posts/${postId}/comments`, payload);
      setNewComment(''); // Reset the comment input
      setShowCommentBox(null); // Hide comment box after submission
      fetchComments(postId);  // Fetch updated comments
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    }
  };

  return (
    <div className="community-page">
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

      {/* Conditionally Render the New Discussion Form */}
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

      <div className="discussion-list">
        {filteredDiscussions.length > 0 ? (
          filteredDiscussions.map(discussion => (
            <div key={discussion._id} className="discussion-card">
              <h2>{discussion.title || "Discussion"}</h2> {/* Display Title */}
              <p className="discussion-category">Category: {discussion.category}</p> {/* Display Category */}
              <p>{discussion.content}</p>
              <div className="discussion-info">
                <span>Author: {discussion.author}</span>
                <span>Time Posted: {new Date(discussion.created_at).toLocaleString()}</span>
              </div>
              <button onClick={() => {
                setShowCommentBox(discussion._id); // Show the comment box for this discussion
                fetchComments(discussion._id); // Fetch comments when the button is clicked
              }}>
                View Comments
              </button>

              {/* Display comments for the selected discussion */}
              {comments[discussion._id] && (
                <div className="comments-section">
                  {comments[discussion._id].map((comment) => (
                    <div key={comment._id} className="comment">
                      <p>{comment.content}</p>
                      <span>By {comment.author} on {new Date(comment.created_at).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Conditionally render the comment textbox when the button is clicked */}
              {showCommentBox === discussion._id && (
                <div className="comment-box">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                  />
                  <button onClick={() => handleAddComment(discussion._id)}>Add Comment</button>
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
