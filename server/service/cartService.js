import CartRepo from "../repositories/cartRepo";

class CartService {
    static async fetchCart(cartID){
        const cart = await CartRepo.fetchCart(cartID)
        return cart
    }

    static async addNewCart(data){
        const cart = data.cart
        const cartItems = data.cartItems
        const { newCart, items } = await CartRepo.addNewCart(cart, cartItems)
        return { newCart, items }
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