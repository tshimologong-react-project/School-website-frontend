import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateEditPost = () => {
  const location = useLocation();
  const initialPostData = location.state?.initialPostData;

  const [postTitle, setPostTitle] = useState(initialPostData ? initialPostData.postTitle : '');
  const [postBody, setPostBody] = useState(initialPostData ? initialPostData.postBody : '');
  const [postTags, setPostTags] = useState(initialPostData ? initialPostData.postTags : '');
  const [file, setFile] = useState(null);
  const [picturePreview, setPicturePreview] = useState(initialPostData ? `http://localhost:8080/getImage/${initialPostData.id}`: null);

  useEffect(() => {
    if (initialPostData) {
      setPostTitle(initialPostData.postTitle);
      setPostBody(initialPostData.postBody);
      setPostTags(initialPostData.postTags);
      setPicturePreview(`http://localhost:8080/getImage/${initialPostData.id}`);
    }
  }, [initialPostData]);

  const navigate = useNavigate();

  const handlePictureChange = (e) => {
    const selectedPicture = e.target.files[0];
    if (selectedPicture) {
      setFile(selectedPicture);
      setPicturePreview(URL.createObjectURL(selectedPicture));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('postTitle', postTitle);
    formData.append('postBody', postBody);
    formData.append('postTags', postTags);

    try {
      if (initialPostData) {
        await axios.put(`http://localhost:8080/editBlog/${initialPostData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log("Post updated:", formData);
      } else {
        await axios.post('http://localhost:8080/saveBlog', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log("Post created:", formData);
      }
      navigate('/Story');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1 className="w-250 h-15 top-133 left-363 font-bold mx-10 text-4xl">{initialPostData ? 'EDIT' : 'CREATE'} POST</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-4/5 mx-10 my-10 relative">
          <label htmlFor="pictureInput" className="block mb-2 text-center">
            <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center">
              {picturePreview ? (
                <img src={picturePreview} alt="Preview" className="rounded-full object-cover w-full h-full" />
              ) : (
                <span className="text-4xl">+</span>
              )}
            </div>
            <input
              id="pictureInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePictureChange}
            />
          </label>
        </div>

        <div className="w-4/5 bg-gray-200 rounded-md p-4 mx-10">
          <input
            type="text"
            placeholder="Post Title"
            className="bg-transparent w-full outline-none"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>

        <div className="w-4/5 bg-gray-200 rounded-md p-4 mx-10 mt-20 h-80">
          <input
            type="text"
            placeholder="Post Body"
            className="bg-transparent w-full outline-none"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
        </div>

        <div className="w-4/5 bg-gray-200 rounded-md p-4 mx-10 mt-20">
          <input
            type="text"
            placeholder="TAG /CATEGORY"
            className="bg-transparent w-full outline-none"
            value={postTags}
            onChange={(e) => setPostTags(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-red-800 text-white px-10 py-2 mt-10 mx-10 items-center justify-center hover:bg-blue-900 hover:text-white hover:border-white"
        >
          {initialPostData ? 'UPDATE' : 'SUBMIT'}
        </button>
      </form>
    </div>
  );
};

export default CreateEditPost;
