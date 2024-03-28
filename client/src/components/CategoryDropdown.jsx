import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchCategories from '../hooks/category-hook'

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to track whether the dropdown is open or closed
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function to cancel any pending requests if component unmounts
    return () => {
      // Cleanup logic, if needed
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button 
        className="text-base text-gray-600 dark:text-white font-semibold px-3 py-1 rounded-full border border-gray-400 dark:border-gray-600 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)} // Toggle isOpen state on button click
      >
        All Categories
      </button>
      {isOpen && ( // Render the categories only if isOpen is true
        <ul className="absolute top-full left-0 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-b-md shadow-md dark:text-white">
          {isLoading ? (
            <li>Loading...</li>
          ) : isError ? (
            <li>Error: {error.message}</li>
          ) : (
            categories.map((category) => (
              <li key={category._id}>
                <Link
                  to={`/category?cat=${category.category}`}
                  className=" block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {category.category}
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;
