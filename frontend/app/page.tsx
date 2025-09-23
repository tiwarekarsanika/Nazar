import { Navbar } from '@/components/navbar'
import ProductList from "@/components/product-list";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="flex-1 py-10 px-20">
        <ProductList />
      </main>
      <footer className="flex py-4 px-20 justify-center items-center opacity-80">
        Created as a part of a bigger project Nazar with ❤️ by Sanika
      </footer>
    </div>
  );
}
