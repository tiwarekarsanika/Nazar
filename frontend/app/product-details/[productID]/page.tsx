"use client";

import {
  Star,
  ShoppingBagIcon
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { addWishlist } from "@/utils/apis/wishlistAPI";
import { useUser } from "@/context/userContext";
import { addCart } from "@/utils/apis/cartAPI";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchProductById } from "@/utils/apis/productsAPI";
import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { useWishlist } from "@/context/wishlistContext";

interface ProductType {
  product_id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  orders: number;
  image: string;
  category: string;
  productDetails: string;
}

interface ProductsResponse {
  data: ProductType[];
  status: number;
}

interface ProductDetailPageProps {
  params: Promise<{ productID: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const queryClient = useQueryClient();
  const { productID } = React.use(params);
  const router = useRouter();
  const user = useUser();

  const { data: product } = useQuery({
    queryKey: ["product", productID],
    queryFn: () => fetchProductById(productID), // API call that also increments views
    initialData: () => {
      const productsData = queryClient.getQueryData<ProductsResponse>(["products"]);
      // console.log("Products data in product details page ", productsData?.data);
      return productsData?.data?.find((p: ProductType) => p.product_id === productID);
    },
  });

  // console.log("Product in product details page ", product?.[0]);

  const addToWishlist = useWishlist((state) => state.addWishlist);
  const wishlist = useWishlist((state) => state.wishlist);

  const handleAddToWishlist = async (productId: string) => {
    await addToWishlistMutation.mutateAsync(productId);
    addToWishlist({ id: productId });
  }

  // Mutation hook
  const addToWishlistMutation = useMutation({
    mutationFn: (productId: string) => {
      if (!user?.user?.id) throw new Error("User ID is required to add to wishlist");
      return addWishlist(user.user.id, productId);
    },
    onSuccess: () => {
      // console.log("Item added to wishlist ");
      setTimeout(() => {
        router.push("/wishlist"); // navigate after short delay
      }, 800);
      // invalidate & refetch wishlist data
      queryClient.invalidateQueries({ queryKey: ["wishlists"] });
    },
    onError: (error) => {
      console.error("Failed to add wishlist item ", error);
    },
  });

  const addZustandCart = useCart((state) => state.addCart);
  const cart = useCart((state) => state.cart);

  // Resetting user store
  // useEffect(() => {
  //   useCart.persist.clearStorage();
  //   useWishlist.persist.clearStorage();
  // }, []);


  const handleAddToCart = async ({ productId, price }: { productId: string; price: number }) => {
    await addToCartMutation.mutateAsync({ productId, price });
    addZustandCart({ id: productId, quantity: 1 });
  };

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, price }: { productId: string; price: number }) => {
      if (!user?.user?.id) throw new Error("User ID is required to add to cart");
      return addCart(user.user.id, productId, 1, price);
    },
    onSuccess: () => {
      // console.log(productId, price)
      // console.log("Item added to cart ");
      setTimeout(() => {
        router.push("/checkout-cart");
      }, 800);
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (error) => {
      console.error("Failed to add cart item ", error);
    },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">

        {/* Main Product Image */}
        <div className="relative">
          <Image
            src={product.image}
            alt={product.title}
            className="aspect-4/3 h-[410px] w-full rounded-lg border object-cover"
          />
        </div>

        {/* Product Details Section */}
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="text-sm text-gray-500">{product.category}</div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <Star className="h-4 w-4 fill-gray-300 text-gray-300" />
              </div>
              <span className="text-sm text-gray-500">{product.rating}</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.discount && (
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
                  {product.discount}% OFF
                </span>
                <span className="text-lg text-gray-500 line-through">${product.original_price}</span>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500">{product.orders} products sold out</div>

          <div className="grid gap-4">

            <div className="grid gap-2">
              <Label htmlFor="composition" className="text-base font-medium">
                Product Details
              </Label>
              <p className="text-sm text-gray-500">
                {product.product_details}
              </p>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row py-8">
              <Button className="h-12 flex-1 text-lg" onClick={() => handleAddToCart({ productId: product.product_id, price: product.price })}>
                <ShoppingBagIcon />
                Add to Cart
              </Button>
              <Button className="h-12 flex-1 bg-[#D9FF66] text-lg text-gray-900 hover:bg-[#c6eb5e]" onClick={() => handleAddToWishlist(product.product_id)}>
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}