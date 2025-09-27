import CartService from "../service/cartService";

class CartController {
    static async fetchCart(req, res){
        try {
            const response = await CartService.fetchCart(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async addNewCart(req, res){
        try {
            const response = await CartService.addNewCart(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updateCartItemQuantity(req, res){
        try {
            const response = await CartService.updateCartItemQuantity(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async removeItemFromCart(req, res){
        try {
            const response = await CartService.removeItemFromCart(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async clearCart(req, res){
        try {
            const response = await CartService.clearCart(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default CartController;