import OrdersController from "../controller/ordersController.js";
import express from 'express';

const router = express.Router()

router.get('/getOrder', OrdersController.fetchOrder);
router.post('/addOrder', OrdersController.addNewOrder);

export default router;