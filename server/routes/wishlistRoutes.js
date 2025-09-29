import WishlistController from "../controller/wishlistController.js";
import express from 'express';

const router = express.Router()

router.get('/getWishlist', WishlistController.fetchWishlist);
router.post('/addWishlist', WishlistController.addWishlist);
router.delete('/removeItemsFromWishlist', WishlistController.removeItemFromWishlist);
router.delete('/clearWishlist', WishlistController.clearWishlist);

export default router;