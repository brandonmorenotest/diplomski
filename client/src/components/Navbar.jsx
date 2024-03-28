import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useStore from "../store";
import Button from "./Button";
import Logo from "./Logo";
import ThemeSwitch from "./Switch";



const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='flex '>
      <button
        onClick={toggleMenu}
        className='lg:hidden p-2 text-gray-600 hover:text-gray-800'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>
      {isMenuOpen && (
        <div className='fixed top-0 left-0 w-full h-fit bg-white dark:bg-[#020b19] z-50 flex flex-col py-10 items-center justify-center shadow-xl gap-8'>
          <Link to='/'><Logo /></Link>
          <ul className='flex flex-col gap-4 text-base text-black dark:text-gray-300'>
            <li onClick={toggleMenu}>
              <Link to='/'>Home</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to='/contacts'>Contact</Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to='/about'>About</Link>
            </li>
          </ul>
         

          {/* theme switch */}
          <ThemeSwitch />

          <span
            className='cursor-pointer text-xl font-semibold dark:text-white'
            onClick={toggleMenu}
          >
            <AiOutlineClose />
          </span>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { user, signOut } = useStore();
  const [showProfile, setShowProfile] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("userInfo");
    signOut();
  };

  return (
    <nav className='flex flex-col md:flex-row w-full py-5  items-center justify-between gap-4 md:gap-0'>
      <div className='flex gap-2 text-[20px] md:hidden lg:flex'>
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

      <Logo />
      <div className='hidden md:flex gap-14 items-center'>
        <ul className='flex gap-8 text-base text-black dark:text-white'>
          <Link to='/'>Home</Link>
          <Link to='/contacts'>Contact</Link>
          <Link to='/about'>About</Link>
        </ul>

        {/* theme switch */}
        <ThemeSwitch />

      </div>
      <div className='block md:hidden'>
        <MobileMenu user={user} signOut={handleSignOut} />
      </div>
    </nav>
  );
};

export default Navbar;
