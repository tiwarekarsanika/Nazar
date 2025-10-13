import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartItemProps {
  cart_id: string;
  cart_item_id: string;
  product_id: string;
  title: string;
  image: string;
  quantity: number;
  cost: number;
  onUpdateQuantity: (id: string, quantity: number) => string | void | Promise<string | void>;
  onRemove: (id: string) => void;
}

export const CartItem = ({
  cart_item_id,
  product_id,
  title,
  cost,
  quantity,
  image,
  onUpdateQuantity,
  onRemove
}: CartItemProps) => {
  const router = useRouter();

  return (
    < div className="bg-cart-item border-cart-border flex items-center justify-between gap-4 rounded-lg border p-4 w-full" >
      {/* Left: Image + Details */}
      < div className="flex items-center gap-4 min-w-0 cursor-pointer" onClick={() => router.push(`/product-details/${product_id}`)}>
        {/* Product Image */}
        < div className="bg-muted flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg" >
          <Image src={image} alt={title} className="h-full w-full rounded-lg object-cover" />
        </div >

        {/* Product Details */}
        < div className="min-w-0 flex-1" >
          <h3 className="text-foreground line-clamp-2 text-sm font-medium lg:text-base">{title}</h3>
          {/* optional: <p className="text-cart-color mt-1 text-sm">Color: {color}</p> */}
        </div >
      </div >

      {/* Right: Quantity + Price + Remove */}
      < div className="flex items-center gap-4" >
        {/* Quantity Controls */}
        < div className="bg-cart-quantity flex items-center gap-2 rounded-lg p-1" >
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted h-8 w-8"
            onClick={() => onUpdateQuantity(cart_item_id, Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="min-w-[2rem] text-center text-sm font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted h-8 w-8"
            onClick={() => onUpdateQuantity(cart_item_id, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div >

        {/* Price */}
        < div className="text-cart-price min-w-[80px] text-right text-sm font-semibold lg:text-base" >
          ${(cost * quantity).toFixed(2)}
        </div >

        {/* Remove Button */}
        < Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8"
          onClick={() => onRemove(cart_item_id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button >
      </div >
    </div >

  );
};