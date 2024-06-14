import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export  const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">ToDoList</h2>
            <p className="text-sm">Manage your tasks efficiently.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-white text-2xl hover:text-gray-400" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-white text-2xl hover:text-gray-400" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-white text-2xl hover:text-gray-400" />
            </a>
          </div>
        </div>
        <hr className="border-gray-600 my-4" />
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} ToDoList. All rights reserved.</p>
          <div>
            <a href="/privacy-policy" className="text-sm mr-4 hover:text-gray-400">Privacy Policy</a>
            <a href="/terms-of-service" className="text-sm hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


