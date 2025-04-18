import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateBlog.css';

function EditBlog() {
  const [urlExist, setUrlExist] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/blogs/blog/${id}`);
        const blog = response.data.data;
        setTitle(blog.title);
        setContent(blog.content);
        setImage(blog.image || "");
        if (blog.image) setUrlExist(true);
      } catch (err) {
        console.log("Fetch Blog Error:", err.response?.data || err.message || err);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      alert("You must be logged in to update a blog.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3002/api/blogs/blog/${id}`, 
        { title, content, image: image || "", author: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Success Response:", response.data);
      alert("Blog Updated!");
      navigate("/profile"); 
    } catch (err) {
      console.log("Axios Error: ", err.response?.data || err.message || err);
    }
  };

  return (
    <div className='create-blog-container'>
      <form onSubmit={handleSubmit} className='form-page'>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id='title'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">Content</label>
        <textarea
          className='fixed-textarea'
          id='content'
          name='content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {urlExist ? (
          <div className='image-add'>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id='image'
              name='image'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        ) : (
          <button
            type="button"
            style={{ backgroundColor: 'blue', height: '30px', width: '100px', borderRadius: '20px' }}
            onClick={() => setUrlExist(true)}
          >
            Add Image
          </button>
        )}

        <button style={{ backgroundColor: 'green' }} type='submit'>Update</button>
      </form>
    </div>
  );
}

export default EditBlog;
