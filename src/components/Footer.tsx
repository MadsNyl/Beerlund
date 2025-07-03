import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const quickLinks = [
    { name: "Kommende løp", href: "#" },
    { name: "Treningstips", href: "#" },
    { name: "Resultatlister", href: "#" },
    { name: "Løpsresultater", href: "#" }
  ];

  const supportLinks = [
    { name: "Hvordan arrangere", href: "#" },
    { name: "Sikkerhetsretningslinjer", href: "#" },
    { name: "Utstyrsguide", href: "#" },
    { name: "FAQ", href: "#" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Beerlund
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Verdens fremste beer mile løpsfellesskap. Løp raskere, drikk smartere, push grenser.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-gray-800 p-3 rounded-full hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">Hurtiglenker</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Støtte</h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-red-400">Kontakt</h4>
            <div className="space-y-4">
              <div className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-3 text-amber-400" />
                <span>info@beerlund.no</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-3 text-orange-400" />
                <span>+47 123 45 678</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-3 text-red-400" />
                <span>Norge</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Beerlund. Alle rettigheter forbeholdt. Drikk ansvarlig.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Personvern
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Vilkår
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Informasjonskapsler
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
