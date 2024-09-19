import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CommunityPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "This is a sample post from John Doe",
      author: "John Doe",
      createdAt: "2023-02-20 14:30:00",
    },
    {
      id: 2,
      content: "Another sample post from Jane Smith",
      author: "Jane Smith",
      createdAt: "2023-02-21 10:45:00",
    },
    {
      id: 3,
      content: "This is a longer sample post from Bob Johnson. It has multiple sentences and will wrap to the next line.",
      author: "Bob Johnson",
      createdAt: "2023-02-22 12:00:00",
    },
  ]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/community/posts');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleNewPost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPost, author: 'Anonymous' }),
      });
      const data = await response.json();
      setPosts([...posts, data]);
      setNewPost('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/2000/1000')` }}>
      <header className="bg-blue-500 text-white">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            
            <Link to="/" className="text-white hover:text-blue-200">Back to Home</Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-3">
        <h1 className="text-4xl font-bold font-serif text-shadow-md text-gradient-to-r from-blue-500 to-purple-500">
          Community Discussion
        </h1>
        <p className="text-lg text-white-600 font-sans">Join the conversation and connect with other SeaClear enthusiasts!</p>
        <p className="text-lg text-white-600 font-sans">Share your thoughts, ask questions, and get feedback from the community.</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <form onSubmit={handleNewPost}>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-2 pl-10 text-sm text-gray-700 font-mono"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Post
              </button>
            </form>
            <ul className="mt-4">
              {posts.map((post, index) => (
                <li
                  key={post.id}
                  className={`mb-4 p-4 rounded-lg ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
                >
                  <p className="font-serif">{post.content}</p>
                  <small className="font-sans">
                    Posted by {post.author} on {post.createdAt}
                  </small>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default CommunityPage;