import axios from 'axios';

const baseURL = "http://localhost:5500"

export async function fetchCart(user_id: number) {
    try {
        // console.log("Fetching cart for user_id: ", user_id)
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

export async function removeItemFromCart(cart_item_id: number) {
    try {
        const response = await axios.delete(`${baseURL}/cart/removeCartItem/${cart_item_id}`);
        console.log("Removed cart item ", response)
        return response
    } catch (error) {
        console.error(error)
    }   
}

export async function clearCart(cart_id: number) {
    try {
        const response = await axios.delete(`${baseURL}/cart/clearCart/${cart_id}`);
        console.log("Cleared cart ", response)
        return response
    } catch (error) {
        console.error(error)
    }
}

export async function updateCartItem(cart_item_id: number, quantity: number) {
    try {
        console.log("Updating cart item ", cart_item_id, quantity)
        const response = await axios.put(`${baseURL}/cart/updateCartItem`, 
            { itemID: cart_item_id, quantity: quantity });
        console.log("Updated cart item ", response)
        return response
    } catch (error) {
        console.error(error)
    }
}
