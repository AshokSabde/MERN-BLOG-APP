import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBlog.css';

function CreateBlog() {
  const [urlExist, setUrlExist] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      alert("You must be logged in to create a blog.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3002/api/blogs/create", { title, content, image: image || "",author: userId },{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Success Response:", response.data);
      alert("Blog Posted!");
      navigate("/");
      
    } catch (err) {
      console.log("Axios Error: ", err)
    }
  }
  return (
    <div className='create-blog-container'>
      <form onSubmit={handleSubmit} className='form-page'>
        <label htmlFor="title">Title</label>
        <input type="text" id='title' name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="content">Content</label>
        <textarea className='fixed-textarea' type='content' id='content' name='content' value={content} onChange={(e) => setContent(e.target.value)} />

        {
          urlExist ? <div className='image-add'>
            <label htmlFor="image">Image URL</label>
            <input type="text" id='image' name='image' value={image} onChange={(e) => setImage(e.target.value)} />
          </div> : <button style={{ backgroundColor: 'blue', height: '30px', width: '100px', borderRadius: '20px' }} onClick={() => setUrlExist(true)}>Add Image</button>
        }
        <button style={{ backgroundColor: 'green' }} type='submit'>Post</button>
      </form>
    </div>
  )
}

export default CreateBlog;