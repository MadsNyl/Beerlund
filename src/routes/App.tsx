import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function App() {
  return (
    <div className="min-h-screen mx-auto bg-background">
      <Header />
      <Hero />
      <About />
      <Footer />
    </div>
  )
}