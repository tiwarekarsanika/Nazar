import ProductsController from "../controller/productController.js";
import express from 'express';

const router = express.Router()

router.get("/product/:id", ProductsController.fetchProduct);
router.get("/allProducts", ProductsController.fetchAllProducts);
router.post("/addProducts", ProductsController.addProducts);

export default router;