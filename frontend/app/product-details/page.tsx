import {
  Star,
  Share2,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  ShoppingBagIcon
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProductDetailPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">

        {/* Main Product Image */}
        <div className="relative">
          <img
            src="https://placehold.co/600x400?text=01"
            alt="Stonewind Trekker Jacket"
            className="aspect-4/3 h-[410px] w-full rounded-lg border object-cover"
          />
        </div>

        {/* Product Details Section */}
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="text-sm text-gray-500">Jacket</div>
            <h1 className="text-3xl font-bold">Stonewind Trekker</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <Star className="h-4 w-4 fill-gray-300 text-gray-300" />
              </div>
              <span className="text-sm text-gray-500">4.9</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">$99.29</span>
            <span className="text-lg text-gray-500 line-through">$102.97</span>
          </div>
          <div className="text-sm text-gray-500">498 products sold out</div>

          <div className="grid gap-4">

            <div className="grid gap-2">
              <Label htmlFor="composition" className="text-base font-medium">
                Product Details
              </Label>
              <p className="text-sm text-gray-500">
                Premium Fabric Blend: 70% Merino Wool & 30% Acrylic
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quantity" className="text-base font-medium">
                Quantity
              </Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <div className="flex h-8 w-12 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium dark:border-gray-800 dark:bg-gray-950">
                  1
                </div>
                <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="h-12 flex-1 text-lg">
                <ShoppingBagIcon />
                Add to Cart
              </Button>
              <Button className="h-12 flex-1 bg-[#D9FF66] text-lg text-gray-900 hover:bg-[#c6eb5e]">
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}