import Category from "../models/categories.js";

// Controller function to create a new category
export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;

    // Check if the category already exists
    const existingCategory = await Category.findOne({ category });
    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    // Create a new category
    const newCategory = new Category({ category });
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

// Controller function to fetch categories
export const getCategories = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find();

    // Send the categories as a response
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
