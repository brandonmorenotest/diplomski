import React, { useState, useEffect } from 'react';
import { fetchCategories, addCategory } from '../hooks/category-hook'; // Import the custom hook

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

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

  const handleAddCategory = async () => {
    try {
      // Call the addCategory function to add the new category
      await addCategory(newCategory);
      
      // Fetch categories again to update the list
      const updatedCategories = await fetchCategories();
      setCategories(updatedCategories);

      // Clear the input field
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category:', error);
      // Handle error if needed
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching categories: {error.message}</div>;

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-lg font-semibold mb-4">Create Category</h1>

      <div className="flex mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 mr-2"
          placeholder="Enter new category"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleAddCategory}
        >
          Add
        </button>
      </div>

      <ul className="divide-y divide-gray-200">
        {categories.map(category => (
          <li key={category._id} className="py-2">
            {category.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateCategory;
