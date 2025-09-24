"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

export default function Component() {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      image: "/placeholder.svg",
      title: "Cozy Blanket",
      price: 29.99,
    },
    {
      id: 2,
      image: "/placeholder.svg",
      title: "Autumn Mug",
      price: 12.99,
    },
    {
      id: 3,
      image: "/placeholder.svg",
      title: "Fall Fragrance Candle",
      price: 16.99,
    },
    {
      id: 4,
      image: "/placeholder.svg",
      title: "Autumn Leaves Wall Art",
      price: 39.99,
    },
  ])
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id))
  }
  const clearWishlist = () => {
    setWishlist([])
  }
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <Button variant="outline" onClick={clearWishlist}>
          Clear Wishlist
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <img
                src="/placeholder.svg"
                alt={item.title}
                width={300}
                height={300}
                className="rounded-t-lg object-cover w-full aspect-square"
              />
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" onClick={() => removeFromWishlist(item.id)}>
                Remove from Wishlist
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}