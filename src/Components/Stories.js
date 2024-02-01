import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Stories = () => {
  const [blogData, setBlogData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBlogsData = async () => {
      const result = await axios.get("http://localhost:8080/allBlogs");
      setBlogData(result.data);
    }
    loadBlogsData();
  }, []);

  const editPost = (post) => {
    navigate('/create-posts', { state: { initialPostData: post } });
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${postId}`);
      setBlogData(blogData.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <>
      <div className='flex items-center'>
        <h1 className="w-250 font-bold text-4xl mt-16 mx-auto">Our Stories</h1>
        <div className="mx-auto">
          <button onClick={() => navigate('/create-posts')} className="bg-red-800 text-white px-10 py-2 mt-10 hover:bg-blue-900 hover:text-white hover:border-white">CREATE POST</button>
        </div>
      </div>

      <div className="flex flex-wrap mx-20 mt-16 py-2">
        {blogData.map((post, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
            <div className="bg-white shadow-md p-7 mb-4">
              <img src={`http://localhost:8080/getImage/${post.id}`} alt="Placeholder" className="w-full h-36 mb-8" />
              <span className='text-xs uppercase'>{post.postTags}</span>
              <h3 className="text-xl font-semibold text-gray-800">{post.postTitle}</h3>
              <div className="justify-center py-2">
                <div className="border-t-2 border-grey-900 w-12"></div>
              </div>
              <p className="text-gray-600 text-sm pl-0 tracking-tighter">
                {post.postBody}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button className='text-blue-900 border border-blue-900 text-center w-[80px] font-smaller text-xs px-8 py-1' onClick={() => editPost(post)}>Edit</button>
                <button className='text-red-900 border border-red-900 text-center w-[80px] font-smaller text-xs px-8 py-1' onClick={() => deletePost(post.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stories;
