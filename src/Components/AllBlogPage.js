import React from 'react';
import SingleBlog from './SingleBlog';

const AllBlogPage = ({ blogPosts }) => {
  return (
    <div div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-red-800 mb-4 py-6 justify-center text-center">All Blog Posts</h2>
      <div className="flex flex-wrap -mx-4">
        {blogPosts.map((post, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
            <SingleBlog title={post.postTitle} content={post.postBody} imageUrl={`http://localhost:8080/getImage/${post.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogPage;
