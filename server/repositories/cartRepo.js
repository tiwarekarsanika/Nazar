import supabase from "../supabase/configure";

class CartRepo {
    static fetchCart = async(cartID) => {
        const { data, error } = await supabase
                                .from('cart_items')
                                .eq('cart_id', cartID)
                                .select()
        if (error) {
            console.log("Failed to fetch the wishlist ", error)
        }

        return data
    }

    static addNewCart = async(cart, cartItems) => {
        const { newCart, error1 } = await supabase
                                .from('carts')
                                .insert(cart)
                                .select()
        if (error1) {
            console.log("Failed to add the cart ", error1)
        }

        const { items, error2 } = await supabase
                                .from('cart_items')
                                .delete() 
                                .eq('cart_item_id', cartItems)
                                .select()
        if (error2) {
            console.log("Failed to add the item to the cart ", error2)
        }

        return { cart, items}
    }

    static updateCartItemQuantity = async(itemID, newQuantity) => {
        const { data, error } = await supabase
                                .from('cart_items')
                                .update({ quantity: newQuantity })
                                .eq('cart_item_id', itemID)
                                .select()
        if (error){
            console.log("Failed to update the item to the cart ", error)
        }

        return data
    }

    static removeItemFromCart = async(cartID) => {
        const { data, error } = await supabase
                                .from('cart_items')
                                .delete()
                                .eq('cart_item_id', cartID)
                                .select()
        if (error) {
            console.log("Failed to remove the element ", error)
        }

        return data
    }

    static clearCart = async(cartID) => {
        const { cart, error1 } = await supabase
                                .from('carts')
                                .delete() 
                                .eq('cart_id', cartID)
                                .select()
        if (error1) {
            console.log("Failed to remove the cart ", error1)
        }

        const { items, error2 } = await supabase
                                .from('cart_items')
                                .delete() 
                                .eq('cart_id', cartID)
                                .select()
        if (error2) {
            console.log("Failed to remove the element ", error2)
        }

        return { cart, items}
    }
}

export default CartRepo;