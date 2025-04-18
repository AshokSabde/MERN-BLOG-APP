import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './SingleBlog.css';

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:3002/api/blogs/blog/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch blog");
        }
        const data = await res.json();
        const blogData = data.data;
        setBlog(blogData);
        const authorId = typeof blogData.author === "object" ? blogData.author._id : blogData.author;

        if (authorId) {
          const userRes = await fetch(`http://localhost:3002/auth/user/${authorId}`);
          if (!userRes.ok) {
            throw new Error("Failed to fetch author");
          }
          const userData = await userRes.json();
          setUsername(userData.data.username);
        } else {
          setUsername("Unknown Author");
        }

      } catch (err) {
        console.error("Error fetching blog or author:", err);
        setError("Failed to load blog.");
      }
    };

    fetchBlog();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!blog) return <div>Loading...</div>;
  return (
    <div className="blog-page">
      <div className="blog-title">
        <h1>{blog.title}</h1>
      </div>
      <div className="blog-content">
        <p>{blog.content}</p>
        <p style={{fontWeight:'bold', marginTop:'20px'}}> - {username}</p>
      </div>
    </div>
  );
};
export default SingleBlog;
