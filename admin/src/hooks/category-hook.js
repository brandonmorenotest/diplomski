import axios from "axios";
import { API_URL } from "../utils";

async function fetchCategories() {
    const categoriesUrl = `${API_URL}/categories`; // Updated to fetch categories from root endpoint
    const response = await axios.get(categoriesUrl);
    return response.data;
}

async function addCategory(category) {
    const categoriesUrl = `${API_URL}/categories/create-category`; // Updated to use create-category endpoint
    const response = await axios.post(categoriesUrl, { category: category.trim().toUpperCase() });
    return response.data;
}

export { fetchCategories, addCategory };
