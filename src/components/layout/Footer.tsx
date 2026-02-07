import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto container-padding section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            {/* <h3 className="text-2xl font-heading font-bold">
              CORE<span className="text-accent">LINK</span>
            </h3> */}

            <Link to="/" className="inline-block">
              <img
                src="/o-4.png"
                alt="Corelink Logo"
                className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-primary-foreground/70 leading-relaxed">
              Elevating brands through strategic social media marketing, content
              creation, and digital excellence.
            </p>
            {/* <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Twitter size={18} />
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Services", "Portfolio", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-semibold">Services</h4>
            <ul className="space-y-3">
              {[
                "Social Media Management",
                "Paid Advertising",
                "Content Creation",
                "Personal Branding",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/services"
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-semibold">Get in Touch</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:corelink.services@gmail.com"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <Mail size={18} />
                  corelink.services@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918141085418"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <Phone size={18} />
                  +91 8141085418
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © 2026 Corelink. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <a
              href="#"
              className="hover:text-primary-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
