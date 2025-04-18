import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/blogs/");
      const blogData = response.data.data;

      const authorCache = {};

      const updatedBlogs = await Promise.all(
        blogData.map(async (blog) => {
          const authorId = typeof blog.author === "object"
            ? blog.author._id
            : blog.author;

          if (!authorId) {
            return { ...blog, author: "Unknown Author" };
          }
          if (authorCache[authorId]) {
            return { ...blog, author: authorCache[authorId] };
          }

          try {
            const userResponse = await axios.get(`http://localhost:3002/auth/user/${authorId}`);
            const username = userResponse.data?.data?.username || "Unknown Author";
            authorCache[authorId] = username;
            return { ...blog, author: username };
          } catch (err) {
            console.log(`Failed to fetch user for authorId ${authorId}:`, err);
            return { ...blog, author: "Unknown Author" };
          }
        })
      );

      setBlogs(updatedBlogs);
    } catch (err) {
      console.log("Axios Error (failed to fetch blogs):", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="blog-container">
      <h1>Blogs</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            className="blogs-content"
            key={blog._id}
            onClick={() => handleBlogClick(blog._id)}
          >
            <div className="blog-title-text">
              <p>{blog.title}</p>
            </div>
            <div className="author-text">
              <p className="author-name">{blog.author}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Loading blogs...</p>
      )}
    </div>
  );
};

export default Home;
