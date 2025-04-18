import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ handleLogout }) => {
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/auth/user/${userId}`);
        setUser(response.data?.data || {});
        const fetchingBlogs = await axios.get(`http://localhost:3002/api/blogs/author/${userId}`);
        setUserBlogs(fetchingBlogs.data?.data || []);
      } catch (err) {
        console.log("Axios Error:", err);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);
  const handleBlogClick = (id)=>{
    navigate(`/blog/${id}`);
  }
  const handleEditBlog = async(id)=>{
    navigate(`/edit/${id}`);
  }
  const handleDeleteBlog = async(id)=>{
    try{
    const token = localStorage.getItem('token')
      const deleteBlog = await axios.delete(`http://localhost:3002/api/blogs/blog/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(deleteBlog){
        alert('deleted successfully!')
        setUserBlogs(prev => prev.filter(blog => blog._id !== id));
      }else{
        alert('something went wrong!')
      }
    }catch(err){ 
        console.log("Delete Blog Error:", err.response?.data || err.message || err); 
    }
  }

  return (
    <div className="profile-container">
      <h1 className="heading-text-profile">Welcome to Your Profile</h1>
      <div className="user-details">
        <p className="details-text"><span className="inline-text">Username:</span> {user?.username || "Loading..."}</p>
        <p className="details-text"><span className="inline-text">Email:</span> {user?.email || "Loading..."}</p>
      </div>
      <div className="user-blogs">
        <h2>Your Blogs</h2>
        {
          userBlogs.map((blog)=>(
            <div key={blog._id} className="user-blog-card" onClick={()=>handleBlogClick(blog._id)}>
              <p className="profile-blog-title">{blog.title}</p>
              <div>
              <button className="blog-btn" onClick={(e)=>{
                e.stopPropagation();
                handleEditBlog(blog._id)
              }}>Edit</button>
              <button className="blog-btn delete" onClick={(e)=>{
                e.stopPropagation();
                handleDeleteBlog(blog._id)
                
              }}>Delete</button>
              </div>
            </div>
          ))
        }
      </div>
      <div>
        <button className="auth-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
