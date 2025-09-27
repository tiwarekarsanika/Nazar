import supabase from "../supabase/configure";

class OrdersRepo {
    static fetchOrder = async(orderID) => {
        const { data, error } = await supabase
                                .from('order_items')
                                .eq('order_id', orderID)
                                .select()
        if (error) {
            console.log("Failed to fetch the order ", error)
        }

        return data
    }

    static addNewOrder = async(order, orderItems) => {
        const { newOrder, error1 } = await supabase
                                .from('orders')
                                .insert(order)
                                .select()
        if (error1) {
            console.log("Failed to add the order ", error1)
        }

        const { items, error2 } = await supabase
                                .from('order_items')
                                .delete() 
                                .eq('order_item_id', orderItems)
                                .select()
        if (error2) {
            console.log("Failed to add the item to the order ", error2)
        }

        return { newOrder, items}
    }
}

export default OrdersRepo;

