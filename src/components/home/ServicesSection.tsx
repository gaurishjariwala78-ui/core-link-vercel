import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Megaphone,
  Palette,
  Video,
  User,
  Globe,
  Share2,
} from "lucide-react";

const services = [
  {
    icon: Share2,
    title: "Social Media Management",
    description:
      "End-to-end management of your social presence with strategic content planning, community engagement, and growth optimization.",
  },
  {
    icon: Megaphone,
    title: "Paid Advertising",
    description:
      "High-converting ad campaigns across Meta, Google, and LinkedIn that maximize ROI and drive quality leads.",
  },
  {
    icon: Palette,
    title: "Content Creation",
    description:
      "Scroll-stopping reels, graphics, and carousels designed to capture attention and boost engagement.",
  },
  {
    icon: Video,
    title: "Video & Motion Graphics",
    description:
      "Professional video editing and motion design that brings your brand story to life.",
  },
  {
    icon: User,
    title: "Personal Branding",
    description:
      "Build authority and influence as a founder, creator, or professional with strategic personal brand development.",
  },
  {
    icon: Globe,
    title: "Website Development",
    description:
      "High-converting landing pages and websites that turn visitors into customers.",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding">
      <div className="container mx-auto container-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading mt-4 mb-4 sm:mb-6">
            Everything You Need to{" "}
            <span className="gradient-text">Dominate Digital</span>
          </h2>
          <p className="text-muted-foreground text-body-lg">
            Full-service digital marketing solutions designed for brands that 
            want to stand out and scale fast.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group premium-card hover:border-accent/20 border border-transparent"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-secondary group-hover:gradient-accent transition-all duration-500 flex items-center justify-center mb-4 sm:mb-6">
                <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-semibold mb-2 sm:mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
