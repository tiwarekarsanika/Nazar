"use client";

import { useEffect, useState } from "react";
import { Search, Grid3X3, List, Heart, Star, ShoppingCart, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProductStore } from "./store";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProducts } from "@/utils/apis/productsAPI";
import { Progress } from "@/components/ui/progress"
import { addWishlist } from "@/utils/apis/wishlistAPI";
import { useUser } from "@/context/userContext";
import FilterSection from './product-filter';
import { addCart } from "@/utils/apis/cartAPI";

type ProductButtonProps = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function ProductList() {
  const {
    filteredProducts,
    searchQuery,
    viewMode,
    setSearchQuery,
    setViewMode,
    applyFilters
  } = useProductStore();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getAllProducts()
  });
  const router = useRouter();

  const setProducts = useProductStore((state) => state.setProducts);

  useEffect(() => {
    if (productsData) {
      console.log(productsData)
      setProducts(productsData.data); // populate Zustand store
    }
  }, [productsData]);

  // Apply initial filters on mount
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const user = useUser();
  console.log("User is ", user)
  const queryClient = useQueryClient();

  // Mutation hook
  const addToWishlistMutation = useMutation({
    mutationFn: (productId: number) => addWishlist(user?.user.id, productId),
    onSuccess: () => {
      console.log("Item added to wishlist ");
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

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, price }: { productId: number; price: number }) => addCart(user?.user.id, productId, 1, price),
    onSuccess: () => {
      // console.log(productId, price)
      console.log("Item added to cart ");
      setTimeout(() => {
        router.push("/checkout-cart");
      }, 800);
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (error) => {
      console.error("Failed to add cart item ", error);
    },
  });

  // if (isLoading) return <Progress />;
  if (error) return <div>Sorry There was an Error</div>;

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden w-64 lg:block">
          <FilterSection />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Controls Bar */}
          <div className="mb-4 flex flex-col gap-4 sm:mb-6">
            {/* Top row - Mobile filter button and product count */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-transparent lg:hidden">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 sm:w-96">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-full pr-4">
                      <div className="py-4">
                        <FilterSection />
                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>

                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  {filteredProducts.length} products
                </div>
              </div>

              {/* View Toggle - Desktop only */}
              <div className="hidden sm:block">
                <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
                  <ToggleGroupItem value="grid" aria-label="Grid view">
                    <Grid3X3 className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="List view">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {/* Bottom row - Search */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:w-64"
                />
              </div>

              {/* View Toggle - Mobile */}
              <div className="sm:hidden">
                <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
                  <ToggleGroupItem value="grid" aria-label="Grid view" size="sm">
                    <Grid3X3 className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list" aria-label="List view" size="sm">
                    <List className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground text-lg">
                No products found matching your filters.
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Try adjusting your search criteria.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-4 sm:gap-6 ${viewMode === "grid"
                ? "xs:grid-cols-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
                }`}>
              {filteredProducts.map((product: any) => (
                <Card key={product.product_id} className="group transition-shadow hover:shadow-lg">
                  <CardContent className="p-3 sm:p-4">
                    <div onClick={() => router.push(`/product-details/${product.product_id}`)}>
                      <div className="relative mb-3 sm:mb-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.title}
                          className="h-40 w-full rounded-md object-cover sm:h-48"
                        />
                        {product.isNew && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-xs hover:bg-red-600">
                            New
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h3 className="line-clamp-2 text-sm leading-tight font-medium">
                          {product.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-base font-bold text-blue-600 sm:text-lg">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <>
                              <span className="text-muted-foreground text-xs line-through sm:text-sm">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                              <Badge variant="destructive" className="text-xs">
                                -{product.discount}%
                              </Badge>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-muted-foreground text-xs">{product.rating}</span>
                        </div>

                        <p className="text-muted-foreground text-xs">
                          {product.orders} orders this week
                        </p>

                        <p className="text-muted-foreground text-xs">Seller: {product.seller}</p>

                        <div className="text-muted-foreground text-xs">
                          Delivery:{" "}
                          {product.deliveryDays === 0
                            ? "Today"
                            : product.deliveryDays === 1
                              ? "Tomorrow"
                              : `${product.deliveryDays} days`}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2 mt-2">
                      <Button className="flex-1" size="sm" onClick={() => addToCartMutation.mutate({ productId: product.product_id, price: product.price })}>
                        <ShoppingCart className="mr-1 h-4 w-4 sm:mr-2" />
                        <span>Add to cart</span>
                      </Button>
                      <Button
                        onClick={() => addToWishlistMutation.mutate(product.product_id)}
                        variant="outline"
                        size="sm"
                        className="bg-transparent px-2 sm:px-3"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}