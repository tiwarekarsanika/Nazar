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

export async function getWishlist(user_id: number) {
  try {
    const response = await axios.get(`${baseURL}/wishlist/getWishlist/${user_id}`);
    // console.log("Fetched wishlist ", response)
    return response
  } catch (error) {
    console.error(error)
  }
}

export async function removeItemFromWishlist(wishlist_item_id: number) {
  try { 
    // console.log("Removing wishlist item id ", wishlist_item_id)
    const response = await axios.delete(`${baseURL}/wishlist/removeItemsFromWishlist/${wishlist_item_id}`);
    // console.log("Removed wishlist item ", response)
    return response
  } catch (error) {
    console.error(error)
  } 
}

export async function clearWishlist(wishlist_id: number) {
  try {
    const response = await axios.delete(`${baseURL}/wishlist/clearWishlist/${wishlist_id}`);
    // console.log("Cleared wishlist ", response)
    return response
  } catch (error) {
    console.error(error)
  }
}

