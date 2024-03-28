import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className='flex flex-col items-center'>
      <hr className="border-t-2 border-gray-300 w-full mb-4 md:mb-0" />
      <div className='flex flex-col md:flex-row w-full py-8 items-center justify-center text-[14px] text-gray-700 dark:text-gray-500'>
        <div className='flex gap-5'>
          <Link to='/contacts'>Contact Us</Link>
          <Link to='/terms-of-service'>Terms of Service</Link>
          <Link to='/privacy-policy'>
            Privacy Policy
          </Link>
        </div>
      </div>
      <div>
      <div className='flex gap-2 text-[20px] md:hidden lg:flex mb-10'>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className='text-red-600'>
          <FaYoutube />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='text-blue-600'>
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className='text-rose-600'>
          <FaInstagram />
        </a>
        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className='text-blue-500'>
          <FaTwitterSquare />
        </a>
      </div>
      </div>
    </div>
  );
};

export default Footer;
