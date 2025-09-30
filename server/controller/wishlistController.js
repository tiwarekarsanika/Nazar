import WishlistService from "../service/wishlistService.js";

class WishlistController {
    static async fetchWishlist(req, res){
        try {
            const response = await WishlistService.fetchWishlist(req.body.user_id)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async addWishlist(req, res){
        try {
            console.log("Request received as ", req.body)
            const response = await WishlistService.addWishlist(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async removeItemFromWishlist(req, res){
        try {
            const response = await WishlistService.removeItemFromWishlist(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async clearWishlist(req, res){
        try {
            const response = await WishlistService.clearWishlist(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default WishlistController;