import CartController from "../controller/cartController.js";
import express from 'express';

const router = express.Router()

router.get('/getCart/:userID', CartController.fetchCart);
router.post('/addCart', CartController.addNewCart);
router.put('/updateCart', CartController.updateCartItemQuantity);
router.delete('/removeCartItem/:cart_item_id', CartController.removeItemFromCart);
router.delete('/clearCart/:cartID', CartController.clearCart);

export default router;