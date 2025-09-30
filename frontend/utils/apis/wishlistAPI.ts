import axios from 'axios';

const baseURL = "http://localhost:5500"

export async function getUser() {
  try {
    const response = await axios.get(`{$baseURL}/addToWishlist`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

