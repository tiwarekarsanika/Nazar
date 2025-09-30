import axios from 'axios';

const baseURL = "http://localhost:5500"

export async function addWishlist(user_id: number, product_id: number) {
  try {
    const response = await axios.post(`${baseURL}/wishlist/addWishlist`, 
      { userID: user_id, productID: product_id});
    console.log("Added wishlist item ", response)
    return response
  } catch (error) {
    console.error(error)
  }
}

export async function getWishlist() {
  try {
    const response = await axios.get(`${baseURL}/wishlist/getWishlist`);
    console.log("Fetched wishlist ", response)
    return response
  } catch (error) {
    console.error(error)
  }
}

