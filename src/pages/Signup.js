import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    emailId: '',
    contactNo: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/signup', formData);
      navigate('/login');
    } catch (err) {
      setError('Signup failed. Please check inputs or try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="w-50">
        <div className="form-group mb-3">
          <label>Username</label>
          <input name="username" className="form-control" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Email ID</label>
          <input type="email" name="emailId" className="form-control" value={formData.emailId} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label>Contact No</label>
          <input name="contactNo" className="form-control" value={formData.contactNo} onChange={handleChange} required />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;