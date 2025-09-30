import OrdersRepo from "../repositories/ordersRepo.js";

class OrdersService {
    static async fetchOrder(orderID){
        const order = await OrdersRepo.fetchOrder(orderID)
        return order
    }

    static async addNewOrder(data){
        const order = data.order
        const orderItems = data.orderItems
        const { newOrder, items} = await OrdersRepo.addNewOrder(order, orderItems)
        return { newOrder, items}
    }
}

export default OrdersService