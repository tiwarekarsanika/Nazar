import CartRepo from "../repositories/cartRepo.js";

class CartService {
    static async fetchCart(userID){
        let cartID = await CartRepo.fetchCart(userID)
        cartID = cartID?.cart_id
        if(cartID){
            let cartItems = await CartRepo.fetchCartItems(cartID)
            return cartItems
        }
        else{
            console.log("Could not fetch cart items :(")
            return []
        }
    }

    static async addNewCart(data){
        const { userID, productID, quantity, cost } = data
        // console.log("Adding to cart for userID: ", userID, " productID: ", productID, " quantity: ", quantity)
        let cartID = await CartRepo.fetchCart(userID)
        cartID = cartID?.cart_id
        // console.log("Fetched cartID: ", cartID)
        let cartItem = null
        if(cartID){
            console.log("Cart already exists for user ", userID, " with cartID ", cartID)
            // console.log("Adding new item in ", cartID, " with productID ", productID, " quantity ", quantity, " cost ", cost)
            cartItem = await CartRepo.addItemToCart(cartID, productID, quantity, cost)
            console.log("Inserted item ", cartItem, " in already existing cart ", cartID)
        }
        else{
            console.log("Cart does not exist for user ", userID, ". Creating a new cart.")
            const newCart = await CartRepo.addNewCart(userID)
            cartID = newCart?.cart_id
            // console.log("Adding new item in ", cartID, " with productID ", productID, " quantity ", quantity, " cost ", cost)
            cartItem = await CartRepo.addItemToCart(cartID, productID, quantity, cost)
            console.log("Inserted item ", cartItem, " in newly created cart ", cartID)
        }
        return cartItem
    }

    static async updateCartItemQuantity(data){
        const itemID = data.itemID
        const newQuantity = data.quantity
        const item = await CartRepo.updateCartItemQuantity(itemID, newQuantity)
        return item
    }

    static async removeItemFromCart(cartID){
        const item = await CartRepo.removeItemFromCart(cartID)
        return item
    }

    static async clearCart(cartID){
        const { cart, items } = await CartRepo.clearCart(cartID)
        return { cart, items }
    }
}

export default CartService;