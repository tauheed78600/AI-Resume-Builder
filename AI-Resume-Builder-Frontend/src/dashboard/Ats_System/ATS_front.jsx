import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import Header from '../../components/custom/header';
import axios from 'axios';

function ATS_front() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);
    setFile(uploadedFile);
  };
  
  

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    for (let [key, value] of formData.entries()) {
        console.log("key value in for loop",key, value);
    }

    try {
        console.log("formData before call", formData)
      const response = await axios.post('http://localhost:3000/api/resumes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-100 via-white to-indigo-50">
      <Header />
      <div className="flex flex-col justify-center items-center flex-grow">
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={`w-96 h-48 flex flex-col items-center justify-center border-4 border-dashed transition-all duration-300 ${
            isDragging ? 'border-indigo-500 bg-indigo-100' : 'border-gray-300 bg-white'
          } rounded-lg shadow-lg hover:shadow-2xl`}
        >
          <p className="mt-3 text-gray-500 font-medium">
            Drag & drop your file here or{' '}
            <span className="text-indigo-600 font-bold cursor-pointer hover:underline">
              browse
            </span>
          </p>
        </div>
        <input
            className="mt-4 w-96 bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            type="file"
            onChange={handleFileChange} />

        <button
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          onClick={handleUpload}
        >
          Upload Resume
        </button>
      </div>
    </div>
  );
}

export default ATS_front;
