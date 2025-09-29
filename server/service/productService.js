import ProductsRepo from "../repositories/productRepo.js";

class ProductsService {
    static async fetchProduct(productID){
        const products = await ProductsRepo.fetchProduct(productID)
        return products
    }

    static async fetchAllProducts(){
        const products = await ProductsRepo.fetchAllProducts()
        return products
    }

    static async addProducts(data){
        const products = await ProductsRepo.addProducts(data)
        return products
    }
}

export default ProductsService;