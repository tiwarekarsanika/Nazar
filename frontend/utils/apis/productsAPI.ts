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

export async function fetchProductById(product_id: string) {
  try {
    const response = await axios.get(`${baseURL}/product/getProduct/${product_id}`);
    console.log("Fetched product by id ", response.data[0])
    return response.data[0];
  } catch (error) {
    console.error(error);
  }
}
