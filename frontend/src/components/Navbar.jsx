import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav 
      className="
        fixed top-4 left-1/2 -translate-x-1/2 z-50 
        strider text-2xl
        flex items-center gap-10 
        bg-cyan-700 
        py-2 px-4 
        rounded-xl
        shadow-lg
      "
    >      

      <ul className="list-none flex m-0 p-0 gap-4">
        <li>
          <Link 
            to="/" 
            className="text-yellow-400 p-2 rounded-lg no-underline 
                         transition-colors duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            className="text-yellow-400 p-2 rounded-lg no-underline 
                         transition-colors duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="/signup" 
            className="text-yellow-400 p-2 rounded-lg no-underline 
                         transition-colors duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Signup
          </Link>
        </li>
        <li>
          <Link 
            to="/login" 
            className="text-yellow-400 p-2 rounded-lg no-underline 
                         transition-colors duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;