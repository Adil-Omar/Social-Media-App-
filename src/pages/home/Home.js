import React from 'react';
import CreatePost from '../../components/createPost/CreatePost';
import Feedlisting from '../../components/feedListing/Feedlisting';
import User from '../../components/user/User';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="home">
      <div className="home__sidebar">
        <User />
        <button className="home__logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="home__main">
        <CreatePost />
        <Feedlisting />
      </div>
    </div>
  );
}
