import OrdersService from "../service/orderService.js";

class OrdersController {
    static async fetchOrder(req, res){
        try {
            const response = await OrdersService.fetchOrder(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async addNewOrder(req, res){
        try {
            const response = await OrdersService.addNewOrder(req.body)
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default OrdersController;
