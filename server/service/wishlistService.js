import WishlistRepo from '../repositories/wishlistRepo.js'

class WishlistService {
    static async fetchWishlist(wishlistID){
        const wishlist = await WishlistRepo.fetchWishlist(wishlistID)
        return wishlist
    }

    static async addWishlist(data){
        const wishList = data.wishList
        const wishItems = data.wishItems
        const { data1, data2 } = await WishlistRepo.addWishlist(wishList, wishItems)
        return { data1, data2 }
    }

    static async removeItemFromWishlist(itemID){
        const item = await WishlistRepo.removeItemFromWishlist(itemID)
        return item
    }

    static async clearWishlist(wishlistID){
        const { wishlist, items } = await WishlistRepo.clearWishlist(wishlistID)
        return { wishlist, items }
    }
}

export default WishlistService;
