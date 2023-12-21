import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  
  const handleLogin = async () => {
    setError(null); 
    if (email && password) {
      try {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        if (response.data.message === 'Login successful') {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/home');
        }
      } catch (error) {
        setError('Invalid email or password. Please try again.');
      }
    } else {
      setError('Please fill in both email and password fields for login.');
    }
  };

  const handleSignUp = async () => {
    setError(null); 
    if (email && password && confirmPassword && password === confirmPassword) {
      try {
        const response = await axios.post('http://localhost:5000/signup', { email, password });
        if (response.data.message === 'Signup successful') {
          navigate('/login'); 
        }
      } catch (error) {
        setError('An error occurred during signup. Please try again.');
      }
    } else {
      setError('Please fill in all fields and ensure passwords match for sign up.');
    }
  };
  return (
    <div className='Container'>
      <div className="header">
        <div className="text1-container">
          <div className={action === "Login" ? "text1 gray" : "text1"} onClick={() => setAction("Sign Up")}>Sign Up</div>
          <div className={action === "Sign Up" ? "text1 gray" : "text1"} onClick={() => setAction("Login")}>Login</div>
        </div>
        <div className="text">{action}</div>
      </div>
      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt=""/>
            <input type="text" placeholder='Name'/>
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt=""/>
          <input type="email" placeholder='Email' value={email} onChange={handleEmailChange}/>
        </div>
        <div className="input">
          <img src={password_icon} alt=""/>
          <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange}/>
        </div>
        {action === "Login" ? null :
                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                    </div>
                }
            </div>
            <div className="submit-container">
                {action === "Login" ? (
                    <button className="submit" onClick={handleLogin}>Login</button>
                ) : (
                    <button className="submit" onClick={handleSignUp}>Sign Up</button>
                )}
                
            </div>
        </div>
    );
};

export default LoginSignup;
