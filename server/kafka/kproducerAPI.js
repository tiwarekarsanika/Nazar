import producer from './producer.js'

class kProducers {
    static addUserWishlist = async (data) => {
        const msg = data
        try {
            await producer.send({
                topic: 'nazar-user-events',
                messages: [
                    {
                        key: msg.userID,
                        value: JSON.stringify(
                            {
                                eventType: "wishlist",
                                userID: msg.userID,
                                productID: msg.productID,
                                timestamp: new Date().toISOString()
                            }
                        ),
                        timeStamp: Date.now()
                    }
                ],
            })
        } catch (error) {
            console.error("Error sending user wishlist event :(", error)
        }
    }

    static addUserClicks = async (data) => {
        const msg = data
        try {
            await producer.send({
                topic: 'nazar-user-events',
                messages: [
                    {
                        key: msg.userID,
                        value: JSON.stringify(
                            {
                                eventType: "views",
                                userID: msg.userID,
                                productID: msg.productID,
                                timestamp: new Date().toISOString()
                            }
                        ),
                        timeStamp: Date.now()
                    }
                ],
            })
        } catch (error) {
            console.error("Error sending user click event :(", error)
        }
    }

    static addUserPurchase = async (data) => {
        const msg = data
        try {
            await producer.send({
                topic: 'nazar-user-events',
                messages: msg.purchases.map(p => ({
                    key: msg.userID,
                    value: JSON.stringify(
                        {
                            eventType: "purchase",
                            userID: msg.userID,
                            orderID: msg.orderID,
                            productID: p.productID,
                            quantity: p.quantity,
                            timestamp: new Date().toISOString()
                        }
                    ),
                    timeStamp: Date.now()
                }
                ))
            })
        } catch (error) {
            console.error("Error sending user purchase event :(", error)
        }
    }
}

export default kProducers;