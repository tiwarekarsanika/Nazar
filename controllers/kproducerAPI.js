import producer from '../kafka/producer.js'

class kProducers {
    static addUserWishlist = async (req, res) => {
        const msg = req.body

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
        
        res.status(201).send('Product added to user wishlist :)');
    }

    static addUserClicks = async (req, res) => {
        const msg = req.body

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
        
        res.status(201).send('Product viewed by the user :)');
    }

    static addUserPurchase = async (req, res) => {
        const msg = req.body
        
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
        
        res.status(201).send('Product(s) purchased by the user :)');
    }
}

export default kProducers;