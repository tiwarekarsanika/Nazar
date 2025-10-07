import ProductsService from '../service/productService.js'

class ProductsController {
    static async fetchProduct(req, res){
        try {
            const id = req.params.id
            // console.log("The product id is ", id);
            const response = await ProductsService.fetchProduct(id)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async fetchAllProducts(req, res){
        try{
            const response = await ProductsService.fetchAllProducts()
            // console.log("This is the response ", response)
            res.status(200).json(response)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async addProducts(req, res){
        try {
            const response = await ProductsService.addProducts(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default ProductsController;