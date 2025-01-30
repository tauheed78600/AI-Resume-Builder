import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import Header from '../../components/custom/header';
import axios from 'axios';
import * as pdfjs from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min.mjs';
import { MoveRight } from 'lucide-react';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
      toast.success("Please select a file first");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let extractedText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        extractedText += pageText + ' ';
      }

      console.log('Extracted text:', extractedText);

      try {
        const response = await axios.post('http://127.0.0.1:5000/ats-scan', { text: extractedText }, {
          headers: { 'Content-Type': 'application/json' },
        });
        console.log('Response from server:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-100 via-white to-indigo-50">
      <Toaster position="top-center" />
      <Header />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 px-6 lg:px-16'>
        {/* File Upload Section */}
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            className={`w-full h-64 flex flex-col items-center justify-center border-4 border-dashed rounded-lg transition-all duration-300 ${isDragging ? 'border-indigo-500 bg-indigo-100' : 'border-gray-300 bg-gray-50'} cursor-pointer`}
          >
            <p className="mt-3 text-gray-600 font-semibold text-lg text-center">
              Drag & drop your file here or{' '}
              <span className="text-indigo-600 font-bold hover:underline">browse</span>
            </p>
          </div>

          <input
            className="mt-4 w-full bg-gray-100 border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            type="file"
            onChange={handleFileChange}
          />

          <button
            className="mt-6 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
            onClick={handleUpload}
          >
            Check ATS Score
          </button>
        </div>

        {/* Guidelines Section */}
        <div className='bg-gradient-to-br from-violet-200 via-white to-indigo-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300'>
          <h2 className='text-center text-3xl lg:text-4xl text-violet-700 font-extrabold mb-6'>Guidelines for Uploading Your Resume</h2>
          <p className='text-center text-gray-600 mb-6'>
            To ensure accurate analysis and recommendations, please follow these guidelines when uploading your resume:
          </p>
          <div className='space-y-4'>
            {["is in PDF or DOCX", "is in English", "contains readable text & is not an image", "is a maximum of 2 MB in filesize", "is a resume and not any other file", "is not password protected", "contains only your resume and no other additional documents"].map((item, index) => (
              <div key={index} className='flex items-center gap-4 text-xl text-gray-700'>
                <MoveRight className='text-indigo-600' />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ATS_front;
