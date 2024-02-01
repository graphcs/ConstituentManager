import React, { useState } from 'react';
import Axios from 'axios';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

const CsvGenerator = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleGenerateCsv = async () => {
    try {
      const url = `http://45.55.42.44:9090/api/constituents/export?startTime=${startTime}&endTime=${endTime}`;
      const response = await Axios.get(url, { responseType: 'blob' });

      // Save the CSV file using FileSaver
      saveAs(new Blob([response.data]), 'constituents.csv');
      alert('CSV generated and downloaded successfully!');
      
    } catch (error) {
      console.error('Error generating CSV:', error);
      alert('Error generating CSV. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        Back to Home
      </Link>
      <h2 className="text-3xl font-bold mb-4">Export CSV</h2>

      <div className="mb-4">
        <label htmlFor="startTime" className="block text-gray-600">Start Time:</label>
        <input
          type="date"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="endTime" className="block text-gray-600">End Time:</label>
        <input
          type="date"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="p-2 border border-gray-300 rounded focus:outline-none"
        />
      </div>

      <button
        onClick={handleGenerateCsv}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Generate CSV
      </button>
    </div>
  );
};

export default CsvGenerator;
