import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import Logo from '../assets/diverse.jpg';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
          Welcome to Blog Wave
        </h1>
        <div className="animated-logo"> {/* Apply animation class to the logo */}
          <img
            src={Logo}
            alt="News Pulse Logo"
            className="rounded-lg shadow-lg mb-4"
          />
        </div>
        <div className="space-y-4">
          <p className="text-lg text-gray-800 dark:text-gray-200">
            Welcome to Blog Wave, your go-to source for the latest updates, breaking news, and insightful analysis from around the world.
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            Our dedicated team of journalists is committed to delivering accurate and timely information on a wide range of topics, including politics, technology, business, entertainment, and more.
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            Whether you're interested in global affairs, tech innovations, or cultural trends, Blog Wave has you covered. Stay informed and stay ahead with our comprehensive coverage and in-depth reporting.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/contacts"
            className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            Get in touch
            <FaChevronRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
