import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-primary" />

          {/* Gradient Overlays */}
          <div className="absolute top-0 right-0 w-1/2 h-full gradient-accent opacity-20" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-accent/30 blur-[100px]" />
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-accent-warm/20 blur-[100px]" />

          {/* Content */}
          <div className="relative z-10 px-5 py-12 sm:px-8 sm:py-16 md:px-16 md:py-24 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading text-primary-foreground mb-4 sm:mb-6"
            >
              Ready to Transform Your{" "}
              <span className="text-accent block sm:inline">
                Digital Presence?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-primary-foreground/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 px-2"
            >
              Let's discuss how we can help you build a powerful brand, grow
              your audience, and achieve your business goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="px-2"
            >
              <Button
                variant="accent"
                size="xl"
                className="group w-full sm:w-auto"
                onClick={() =>
                  window.open(
                    "https://wa.me/919876543210?text=Hello%20Coreelink%20%F0%9F%91%8B%0AI%20visited%20your%20website%20and%20would%20like%20to%20book%20a%20Free%20Strategy%20Call.%0APlease%20share%20available%20time%20slots.",
                    "_blank",
                  )
                }
              >
                <span>Book Your Free Strategy Call</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 flex-shrink-0" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
