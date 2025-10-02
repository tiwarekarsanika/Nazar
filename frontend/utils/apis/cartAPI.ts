import axios from 'axios';

const baseURL = "http://localhost:5500"

export async function fetchCart(user_id: number) {
    try {
        const response = await axios.get(`${baseURL}/cart/getCart/${user_id}`);
        console.log("Fetched cart items ", response)
        return response
    } catch (error) {
        console.error(error)
    }
}

export async function addCart(user_id: number, product_id: number, quantity: number, price: number) {
    try {
        const response = await axios.post(`${baseURL}/cart/addCart`,
            { userID: user_id, productID: product_id, quantity: quantity, cost: price });
        console.log("Added cart item ", response)
        return response
    } catch (error) {
        console.error(error)
    }
}
