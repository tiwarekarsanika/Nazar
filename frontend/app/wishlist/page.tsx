"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { getWishlist, removeItemFromWishlist, clearWishlist } from "@/utils/apis/wishlistAPI"
import { useUser } from "@/context/userContext"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Progress } from "@/components/ui/progress"

interface WishlistItem {
  wishlist_id: number;
  product_id: number;
  wishlist_item_id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
}

export default function WishlistPage() {
  const user = useUser();
  const queryClient = useQueryClient();

  const { data: wishlistData, isLoading, error } = useQuery({
    queryKey: ["wishlist", user?.user.id],
    queryFn: () => getWishlist(user?.user.id),
    enabled: !!user?.user.id, // only run when user is available
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: (wishlist_item_id: number) =>
      removeItemFromWishlist(wishlist_item_id),
    onSuccess: () => {
      // console.log("Item removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist", user?.user.id] });
    },
    onError: (error) => {
      console.error("Failed to remove wishlist item", error);
    },
  });

  const clearWishlistMutation = useMutation({
    mutationFn: (wishlist_id: number) => clearWishlist(wishlist_id),
    onSuccess: () => {
      // console.log("Wishlist cleared");
      queryClient.invalidateQueries({ queryKey: ["wishlist", user?.user.id] });
    },
  });

  if (isLoading) return <Progress />;
  if (error) return <div>Sorry, there was an error fetching this wishlist</div>;

  const wishlist = wishlistData?.data || [];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <Button
          variant="outline"
          onClick={() => clearWishlistMutation.mutate(wishlist[0]?.wishlist_id)}
          disabled={clearWishlistMutation.isPending}
        >
          Clear Wishlist
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.map((item: WishlistItem) => (
          <Card key={item.wishlist_item_id}>
            <CardHeader>
              <img
                src={item.image}
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
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  removeFromWishlistMutation.mutate(item.wishlist_item_id)
                }
                disabled={removeFromWishlistMutation.isPending}
              >
                Remove from Wishlist
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
