import axios from 'axios';

const baseURL = 'http://localhost:5500'

export async function getAllProducts() {
  try {
    const response = await axios.get(`${baseURL}/product/allProducts`);
    
    return response
  } catch (error) {
    console.error(error);
  }
}


