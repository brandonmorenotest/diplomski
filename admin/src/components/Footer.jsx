import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='py-4'>
      <Link
        to=''
        target='_blank'
        className='text-gray-500'
      >
        Blog Wave <span className='text-blue-500'>@2024</span>
      </Link>
    </footer>
  );
};

export default Footer;
