import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { LogIn } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-12">
          <Link
            to="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600"
          >
            Beerlund
          </Link>

          <nav className="flex space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Hjem
            </Link>
            <Link
              to="/events"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Arrangementer
            </Link>
          </nav>
        </div>
        
        <SignedOut>
          <SignInButton>
            <Button
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white flex items-center space-x-2 cursor-pointer"
            >
              <LogIn className="h-5 w-5" />
              <span>Logg inn</span>
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;