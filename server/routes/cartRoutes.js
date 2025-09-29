import CartController from "../controller/cartController.js";
import express from 'express';

const router = express.Router()

router.get('/getCart', CartController.fetchCart);
router.post('/addCart', CartController.addNewCart);
router.put('/updateCart', CartController.updateCartItemQuantity);
router.delete('/removeCartItem', CartController.removeItemFromCart);
router.delete('/clearCart', CartController.clearCart);

export default router;