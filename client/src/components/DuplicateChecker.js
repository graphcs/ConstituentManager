import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'

const DuplicateChecker = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleCheckDuplicates = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/api/constituents/check_duplicates`);
      console.log(res);
      if (res.data) {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error checking duplicates:', error);
      alert('Error checking duplicates. Please try again.');
    }
  };

  return (
    <div className="container w-full flex justify-center mx-auto p-4">
      <div className='w-2/3'>
        <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
          Back to Home
        </Link>
        <h2 className="text-3xl font-bold mb-4">Merge Duplicates</h2>
        <button
          onClick={handleCheckDuplicates}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Merge Duplicates
        </button>
      </div>
    </div>
  );
};

export default DuplicateChecker;
