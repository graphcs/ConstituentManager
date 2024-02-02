import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const ConstituentForm = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios.post(`${apiUrl}/api/constituents`, formData);
      if (res.data && res.data.message) {
        if (res.data.message.includes('updated')) {
          alert('Constituent updated successfully!');
          navigate('/')
        } else if (res.data.message.includes('added')) {
          alert('Constituent added successfully!');
          navigate('/')
        } else {
          console.log('Message does not contain "updated" or "added":', res.data.message);
          // Handle other cases or provide a generic message if needed
        }
      }
      setFormData({
        email: '',
        name: '',
        address: ''
      });
    } catch (error) {
      console.error('Error adding constituent:', error);
      alert('Error adding constituent. Please try again.');
    }
  };

  return (
    <div className="container w-full mx-auto p-4 flex justify-center">
      <div className='w-2/3'>
        <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
          Back to Home
        </Link>
        <h2 className="text-3xl font-bold mb-4">Add Constituent</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-600">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>

    </div>
  );
};

export default ConstituentForm;
