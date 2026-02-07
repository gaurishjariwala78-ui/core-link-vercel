import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Megaphone,
  Palette,
  Video,
  User,
  Globe,
  Share2,
  ArrowRight,
  Check,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "918141085418";

const services = [
  {
    icon: Share2,
    title: "Social Media Management",
    description:
      "End-to-end management of your social presence with strategic content planning, community engagement, and growth optimization.",
    features: [
      "Content calendar planning",
      "Daily posting & scheduling",
      "Community management",
      "Monthly analytics reports",
    ],
  },
  {
    icon: Megaphone,
    title: "Social Media Marketing (Paid Ads)",
    description:
      "High-converting ad campaigns across Meta, Google, and LinkedIn that maximize ROI and drive quality leads.",
    features: [
      "Campaign strategy & setup",
      "Audience targeting & retargeting",
      "A/B testing & optimization",
      "Performance tracking",
    ],
  },
  {
    icon: Palette,
    title: "Content Creation (Reels & Creatives)",
    description:
      "Scroll-stopping reels, graphics, and carousels designed to capture attention and boost engagement.",
    features: [
      "Trending reel concepts",
      "Professional graphic design",
      "Carousel & story design",
      "Brand consistency",
    ],
  },
  {
    icon: Video,
    title: "Video Editing & Motion Graphics",
    description:
      "Professional video editing and motion design that brings your brand story to life.",
    features: [
      "Professional video editing",
      "Motion graphics & animations",
      "Sound design",
      "Multi-platform formatting",
    ],
  },
  {
    icon: User,
    title: "Personal Branding",
    description:
      "Build authority and influence as a founder, creator, or professional with strategic personal brand development.",
    features: [
      "Brand positioning strategy",
      "Content pillars development",
      "LinkedIn optimization",
      "Thought leadership content",
    ],
  },
  {
    icon: Globe,
    title: "Website & Landing Page Development",
    description:
      "High-converting landing pages and websites that turn visitors into customers.",
    features: [
      "Custom design & development",
      "Mobile-responsive design",
      "SEO optimization",
      "Conversion optimization",
    ],
  },
];

const openWhatsApp = (serviceName: string) => {
  const message = `Hello Coreelink 👋
I am interested in your *${serviceName}* service.`;

  const encodedMessage = encodeURIComponent(message);
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
    "_blank",
  );
};

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="premium-card border border-border/50 hover:border-accent/30"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SECTION */}
        <div className="lg:w-1/3">
          <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mb-4">
            <service.icon className="w-7 h-7 text-primary-foreground" />
          </div>

          <h3 className="text-2xl font-heading font-semibold mb-3">
            {service.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:w-2/3 lg:pl-8 lg:border-l border-border flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
              What's Included
            </h4>

            <div className="grid sm:grid-cols-2 gap-3">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full gradient-accent flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP BUTTON (RIGHT SIDE) */}
          <div className="hidden lg:flex justify-end mt-6">
            <Button
              variant="accent"
              size="default"
              className="group text-white"
              onClick={() => openWhatsApp(service.title)}
            >
              Enquire Now
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* MOBILE BUTTON (BOTTOM) */}
        <div className="lg:hidden mt-4">
          <Button
            variant="accent"
            size="default"
            className="group w-full text-white"
            onClick={() => openWhatsApp(service.title)}
          >
            Enquire Now
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container mx-auto container-padding text-center">
            {/* Top Label */}
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Our Services
            </span>

            {/* Heading (2 lines exactly like before) */}
            <h1 className="font-heading mt-4 mb-6 leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Full-Service Digital
              <br />
              <span className="gradient-text">Marketing Solutions</span>
            </h1>

            {/* Subtitle (original full sentence) */}
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg sm:text-xl">
              From strategy to execution, we provide everything your brand needs
              to dominate the digital landscape.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto container-padding space-y-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
              />
            ))}
          </div>
        </section>

        <section className="section-padding section-muted text-center">
          <h2 className="text-headline font-heading mb-6">
            Ready to Get Started?
          </h2>

          <Button
            variant="hero"
            size="lg"
            className="group"
            onClick={() => openWhatsApp("Free Strategy Call")}
          >
            Book a Free Strategy Call
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
