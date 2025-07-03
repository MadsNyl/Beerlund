import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center overflow-hidden pt-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-400 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-orange-400 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-red-400 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Løp. Drikk.
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              {" "}Gjenta.
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Den ultimate testen av fart, utholdenhet og drikkeevne. 
            Fire runder, fire øl, én utrolig utfordring.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Link
                to="/events"
              >
                Meld deg på neste beer mile
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;