import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import SingleBlog from './pages/SingleBlog';

function App() {

  return (
    <div className='main-container'>
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}
function AppContent() {
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  };

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateBlog />} />
        <Route path='/login' element={<Login />} />
        <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
        <Route path='/register' element={<Register />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
    </>
  );
}

export default App;
