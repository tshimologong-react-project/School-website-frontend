import React from 'react';
import { useLocation } from 'react-router-dom';

const BlogPage = () => {
  
  const location = useLocation();
  const { title, content, imageUrl } = location.state || {};

  if (!title || !content || !imageUrl) {
   
    return <div>Blog post details not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-red-800 mb-4 py-6 justify-center text-center">{title}</h1>
      <img src={imageUrl} alt={title} />
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

export default BlogPage;
