import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-2 sm:py-3" : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="container mx-auto container-padding">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          {/* <Link to="/" className="flex items-center gap-2 shrink-0">
            <motion.img
              src="/o.png"
              alt="Coreelink Logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20 w-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] object-contain"
            />
          </Link> */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <motion.img
              src="/o.png"
              alt="Coreelink Logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18 w-auto max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[240px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-base font-medium text-foreground/80 hover:text-foreground animated-underline transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <Button
              variant="hero"
              size="default"
              onClick={() =>
                window.open(
                  "https://wa.me/918141085418?text=Hello%20Corelink,%20I%20would%20like%20to%20book%20a%20Free%20Strategy%20Call",
                  "_blank",
                )
              }
            >
              Book a Free Strategy Call
            </Button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-border/50"
          >
            <div className="container mx-auto container-padding py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium py-2"
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="hero" size="default" className="mt-4 w-full">
                Book a Strategy Call
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
