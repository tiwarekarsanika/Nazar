import axios from 'axios';

const baseURL = "http://localhost:5500"

export async function fetchOrder(user_id: number){
    try{
        const response = await axios.get(`${baseURL}/orders/getOrder/${user_id}`);
        console.log("Fetched order ", response)
        return response
    } catch (error) {
        console.error(error)
    }
}

export async function fetchOrderItems(user_id: number) {
    try {
        // console.log("Fetching order for user_id: ", user_id)
        const response = await axios.get(`${baseURL}/orders/getOrderItems/${user_id}`);
        console.log("Fetched order items ", response)
        return response
    } catch (error) {
        console.error(error)
    }
}

export async function addOrder(user_id: number, cart_id: number, subtotal: number, tax: number, total: number) {
    try {
        const response = await axios.post(`${baseURL}/orders/addOrder`,
            { user_id, cart_id, subtotal, tax, total });
        console.log("Added order item ", response)
        return response
    } catch (error) {
        console.error(error)
    }
}