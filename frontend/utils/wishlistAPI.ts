import axios from 'axios';

const basURL = "http://localhost:5500"

export async function getUser() {
  try {
    const response = await axios.get('/addToWishlist');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

