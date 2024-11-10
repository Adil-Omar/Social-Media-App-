import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import * as yup from 'yup';

import './Login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    let user = {
      email,
      password,
    };
    try {
      let scheme = yup.object().shape({
        email: yup.string().email().min(4).max(18).required().typeError("Invalid email"),
        password: yup.string().min(5).required().typeError("Invalid password"),
      })
      await scheme.validate(user)
      setError('')
      setEmail('');
      setPassword('');

    } catch (error) {
      console.log("Error", error.toString());
      setError(error.toString())
      return;
    }
    dispatch(login(user));
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container ">
      <h1>Facebook</h1>
      <input
        type="email"
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <span className="create-post__error">{error}</span>}
      <button onClick={handleLogin}>Login</button>
      <button className="signup-btn" onClick={handleRegister}>
        Create New Account
      </button>
    </div>
  );
}
