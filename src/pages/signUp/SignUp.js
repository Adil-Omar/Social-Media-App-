import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase';

export default function SignUp() {
  const user = useSelector(store=>store.authSlice.user)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupHandler = () => {
    let user = {
      email,
      password,
      userName,
      gender,
      profilePic
    };
    console.log("User", user);
    
    dispatch(signup(user));
  };
  useEffect(()=>{
    if(user){
      navigate('/')
    }

  },[user])
  const handleRegister = () => {
    navigate('/login');
  };
  const AddProfilePic = async (e) => {
    try {
      const file = e.target.files[0]
      const metadata = {
        contentType: file.type
      }
      const fileRef =  ref(storage, "profilePic/"+ file.name)
      await uploadBytes(fileRef, file, metadata)
      const url = await getDownloadURL(fileRef)
      console.log(url)
      setProfilePic(url)
    } catch (error) {
      console.log(error);

    }

  }

  return (
    <div className="signup-container ">
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="Enter Your Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Your Password"
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Your Username"
        onChange={e => setUserName(e.target.value)}
      />
      <div>
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={() => setGender("male")}
        />
        <label htmlFor="female">Female</label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          onChange={() => setGender("female")}
        />
        <br />
        <label htmlFor="pic">Enter Profile Pic:</label>
        <input onChange={AddProfilePic} type="file" id='pic' />
      </div>
      <button onClick={signupHandler}>Signup</button>
      <button className="login-btn" onClick={handleRegister}>
        Login
      </button>
    </div>
  );
}
