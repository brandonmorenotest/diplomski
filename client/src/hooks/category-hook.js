import axios from "axios";
import { API_URI } from "../utils/apiCalls";


async function fetchCategories() {
    const categoriesUrl = `${API_URI}categories`; // Updated to fetch categories from root endpoint
    const response = await axios.get(categoriesUrl);
    return response.data;
}

export default fetchCategories;