"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "./ui/cart-item";
import { OrderSummary } from "./ui/order-summary";
import Link from "next/link";
import { fetchCart, removeItemFromCart, clearCart, updateCartItem } from "@/utils/apis/cartAPI"
import { useUser } from "@/context/userContext"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Progress } from "@/components/ui/progress"

interface CartItemType {
  cart_id: number;
  cart_item_id: number;
  product_id: number;
  title: string;
  image: string;
  quantity: number;
  cost: number;

}

// export type CartItemType = (typeof cartData)[number];
export default function Cart() {
  const user = useUser();
  console.log("User in cart is ", user)

  
  const { data: cartData , isLoading, error } = useQuery({
    queryKey: ["cart", user?.user.id],
    queryFn: () => fetchCart(user?.user.id),
    enabled: !!user?.user.id, // only run when user is available
  });

  // console.log("Cart data is ", cartData)

  const queryClient = useQueryClient();

  const removeItemFromCartMutation = useMutation({
    mutationFn: (cart_item_id: number) =>
      removeItemFromCart(cart_item_id),
    onSuccess: () => {
      // console.log("Item removed from cart");
      queryClient.invalidateQueries({ queryKey: ["cart", user?.user.id] });
    }
  });

  const clearCartMutation = useMutation({
    mutationFn: (cart_id: number) => clearCart(cart_id),
    onSuccess: () => {
      // console.log("Cart cleared");
      queryClient.invalidateQueries({ queryKey: ["cart", user?.user.id] });
    }
  });

  const updateCartItemMutation = useMutation({
    mutationFn: (data: { cart_item_id: number, quantity: number }) => {
      console.log("MutationFn called with: ", data);
      return updateCartItem(data.cart_item_id, data.quantity);
    },
    onSuccess: () => {
      console.log("Item quantity updated");
      queryClient.invalidateQueries({ queryKey: ["cart", user?.user.id] });
    }
  });

  if (isLoading) return <Progress />;
  if (error) return <div>Sorry, there was an error fetching the cart</div>;

  const subtotal = cartData?.data?.reduce((sum: number, item: CartItemType) => sum + item.cost * item.quantity, 0) ?? 0;
  const discount = 0;
  const delivery = 29.99;

  const tax = (subtotal * 18) / 100;

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-card border-cart-border rounded-lg border p-6">
              <h1 className="mb-6 text-2xl font-semibold">Shopping Cart</h1>
              <div className="space-y-4">
                {cartData?.data.map((item: CartItemType) => (
                  <CartItem
                    key={item.cart_item_id}
                    {...item}
                    onUpdateQuantity={(id, qty) => updateCartItemMutation.mutate({ cart_item_id: id, quantity: qty })}
                    onRemove={() => removeItemFromCartMutation.mutate(item.cart_item_id)}
                  />
                ))}
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
                onClick={() => clearCartMutation.mutate(cartData?.data[0]?.cart_id)}
                variant="destructive"
                className="bg-destructive hover:bg-destructive/90 text-primary-foreground h-12 w-full"
              >
                Clear Cart
              </Button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
