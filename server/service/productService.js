import ProductRepo from "../repositories/productRepo.js";

class ProductsService {
    static async fetchProduct(productID){
        const products = await ProductRepo.fetchProduct(productID)
        return products
    }

    static async fetchAllProducts(){
        const products = await ProductRepo.fetchAllProducts()
        // console.log("The list of products returned in service ", products)
        return products
    }

    static async addProducts(data){
        const products = await ProductRepo.addProducts(data)
        return products
    }
}

export default ProductsService;