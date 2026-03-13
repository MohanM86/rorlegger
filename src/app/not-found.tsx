import Link from "next/link";
import { Droplets, Home, Search, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[calc(2.5rem+4rem)] min-h-[70vh] flex items-center">
        <div className="container-site py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-6">
            <Droplets className="w-10 h-10 text-primary-500" />
          </div>
          <h1 className="font-display font-black text-display-xl text-secondary-950 mb-4">404</h1>
          <p className="text-body-lg text-secondary-600 max-w-md mx-auto mb-8">
            Denne siden finnes ikke. Kanskje du leter etter en rørlegger i din kommune?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              <Home className="w-4 h-4" /> Gå til forsiden
            </Link>
            <Link href="/elektriker" className="btn-secondary">
              <Search className="w-4 h-4" /> Finn rørlegger
            </Link>
            <a href="tel:+4780000000" className="btn-phone">
              <Phone className="w-4 h-4" /> Ring 800 00 000
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
