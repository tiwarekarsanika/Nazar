import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <Card className="w-full max-w-xl py-0">
        <CardHeader className="bg-primary text-primary-foreground p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Order Confirmed</CardTitle>
              <CardDescription className="text-sm">Thank you for your purchase!</CardDescription>
            </div>
            <CircleCheckIcon className="w-10 h-10" />
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Order #</span>
                  <span>123456789</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>June 15, 2023</span>
                </div>
                {/* <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span>Visa ending in 1234</span>
                </div> */}
              </div>
            </div>
            <Separator />
            <div className="grid gap-2">
              <div className="font-medium">Items Purchased</div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      alt="Product Image"
                      width={48}
                      height={48}
                      className="rounded-md"
                      style={{ aspectRatio: "48/48", objectFit: "cover" }}
                    />
                    <div>
                      <div className="font-medium">Acme Widgets</div>
                      <div className="text-sm text-muted-foreground">Quantity: 2</div>
                    </div>
                  </div>
                  <div className="font-medium">$99.98</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      alt="Product Image"
                      width={48}
                      height={48}
                      className="rounded-md"
                      style={{ aspectRatio: "48/48", objectFit: "cover" }}
                    />
                    <div>
                      <div className="font-medium">Acme Gizmos</div>
                      <div className="text-sm text-muted-foreground">Quantity: 1</div>
                    </div>
                  </div>
                  <div className="font-medium">$49.99</div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="grid gap-2">
              <div className="font-medium">Order Summary</div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>$149.97</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>$5.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$12.00</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>$166.97</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 bg-muted/50 p-6 rounded-b-lg">
          <Link
            href="/product-list"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary/50"
            prefetch={false}
          >
            Return to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}