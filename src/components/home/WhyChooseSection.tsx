import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Zap, Shield, HeartHandshake, BarChart3 } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Fast Execution",
    description: "Quick turnaround without compromising quality.",
  },
  {
    icon: Shield,
    title: "Proven Results",
    description: "Track record of delivering measurable growth.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Support",
    description: "Your success is our priority, always available.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven",
    description: "Every decision backed by analytics and insights.",
  },
];

const WhyChooseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding section-muted relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full gradient-accent opacity-5" />
      
      <div className="container mx-auto container-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading mt-4 mb-6">
              Your Growth Partner in the{" "}
              <span className="gradient-text">Digital Age</span>
            </h2>
            <p className="text-muted-foreground text-body-lg leading-relaxed mb-8">
              We're not just another agency. We're an extension of your team, 
              invested in your success and committed to delivering exceptional results.
            </p>
            
            {/* Checklist */}
            <ul className="space-y-4">
              {[
                "Custom strategies tailored to your brand",
                "Transparent reporting and communication",
                "Flexible packages for every budget",
                "Continuous optimization and improvement",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full gradient-accent flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="premium-card text-center"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <reason.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
                <h3 className="text-base sm:text-lg font-heading font-semibold mb-1 sm:mb-2">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
