import WishlistRepo from '../repositories/wishlistRepo.js'

class WishlistService {
    static async fetchWishlist (userID){
        let wishlistID = await WishlistRepo.fetchWishlist(userID)
        wishlistID = wishlistID?.wishlist_id

        if (wishlistID) {
            const wishlistItems = await WishlistRepo.fetchWishlistItems(wishlistID)
            console.log("Fetched wishlist items are ", wishlistItems)
            return wishlistItems
        }
        else {
            console.log("Could not fetch wishlist items :(")
        }
    }

    static async addWishlist(data){
        const { userID, productID } = data
        let wishlistID = await WishlistRepo.fetchWishlist(userID)
        wishlistID = wishlistID?.wishlist_id
        let wishlistItem = null

        if (wishlistID){
            wishlistItem = await WishlistRepo.addWishlistItem(wishlistID, productID)
            console.log("Inserted item ", wishlistItem, " in already existing wishlist ", wishlistID)
        }
        else {
            const newWishlist = await WishlistRepo.addWishlist(userID)
            wishlistID = newWishlist?.wishlist_id
            wishlistItem = await WishlistRepo.addWishlistItem(wishlistID, productID)
            console.log("Inserted item ", wishlistItem, " in newly created wishlist ", wishlistID)
        }
        return wishlistItem
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
