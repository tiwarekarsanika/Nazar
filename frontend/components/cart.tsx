"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "./ui/cart-item";
import { OrderSummary } from "./ui/order-summary";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cartItems, updateQuantity, removeItem } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const delivery = 29.99;
  const tax = (subtotal * 18) / 100;

  return (
    <div className="bg-background min-h-screen p-4 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-card border-cart-border rounded-lg border p-6">
              <h1 className="mb-6 text-2xl font-semibold">Shopping Cart</h1>

              <div className="space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-muted-foreground">Your cart is empty.</p>
                ) : (
                  cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      {...item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <OrderSummary subtotal={subtotal} discount={discount} delivery={delivery} tax={tax} />
            <div className="flex flex-col space-y-4">
              <Link href="/order-confirmation">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 w-full">
                  Purchase
                </Button>
              </Link>
              <Button
                variant="destructive"
                className="bg-destructive hover:bg-destructive/90 text-primary-foreground h-12 w-full"
              >
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

