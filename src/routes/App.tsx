import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function App() {
  return (
    <div className="min-h-screen mx-auto bg-background">
      <Header />
      <Hero />
      <About />

      <div className="mb-12 max-w-xl w-full mx-auto px-4">
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 flex justify-center"
        >
          <Link
            to="/events"
          >
            Se alle arrangementer
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      <Footer />
    </div>
  )
}