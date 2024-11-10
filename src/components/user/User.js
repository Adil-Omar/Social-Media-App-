
import React from 'react';
import './User.css';
import { useSelector } from 'react-redux';

export default function User() {
  const user= useSelector(store=>store.authSlice.user)

  return (
    <div className="user-container">
      <img src={user.pPic} alt="User" className="profile-pic" />
      <h2>{user.userName}</h2>
    </div>
  );
}
