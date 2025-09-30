import supabase from "../supabase/configure.js";

class WishlistRepo {
    static fetchWishlist = async(wishlistID) => {
        const { data, error } = await supabase
                                .from('wishlist_items')
                                .select()
                                .eq('wishlist_id', wishlistID)
        if (error) {
            console.log("Failed to fetch the wishlist ", error)
        }

        return data
    }

    static addWishlist = async(wishList, wishItems) => {
        const { data1, error1 } = await supabase
                        .from('wishlists')
                        .insert(wishList)
                        .select()
        if (error1) {
            console.log("Failed to add the wishlist ", error1)
        }

        const { data2, error2 } = await supabase
                        .from('wishlist_items')
                        .insert(wishItems)
                        .select()
        if (error2) {
            console.log("Failed to add the wishlist ", error2)
        }

        return { data1, data2 }
    }

    static removeItemFromWishlist = async(itemID) => {
        const { data, error } = await supabase
                                .from('wishlist_items')
                                .delete()
                                .eq('wishlist_item_id', itemID)
                                .select()
        if (error) {
            console.log("Failed to remove the element ", error)
        }

        return data
    }

    static clearWishlist = async(wishlistID) => {
        const { wishlist, error1 } = await supabase
                                .from('wishlists')
                                .delete() 
                                .eq('wishlist_id', wishlistID)
                                .select()
        if (error1) {
            console.log("Failed to remove the element ", error1)
        }

        const { items, error2 } = await supabase
                                .from('wishlist_items')
                                .delete() 
                                .eq('wishlist_id', wishlistID)
                                .select()
        if (error2) {
            console.log("Failed to remove the element ", error2)
        }

        return { wishlist, items}
    }
}

export default WishlistRepo;