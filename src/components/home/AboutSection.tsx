import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Sparkles, TrendingUp } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Target,
      title: "Strategy First",
      description: "Every campaign begins with deep research and a customized strategy.",
    },
    {
      icon: Sparkles,
      title: "Creative Excellence",
      description: "Stunning visuals and compelling content that captures attention.",
    },
    {
      icon: TrendingUp,
      title: "Results Driven",
      description: "Data-backed decisions that deliver measurable growth.",
    },
  ];

  return (
    <section ref={ref} className="section-padding section-muted">
      <div className="container mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              About Corelink
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading mt-4 mb-6">
              We Transform Brands Into{" "}
              <span className="gradient-text">Digital Powerhouses</span>
            </h2>
            <p className="text-body-lg text-muted-foreground leading-relaxed mb-8">
              At Corelink, we don't just manage social media – we build digital empires. 
              Our team of strategists, creatives, and data analysts work together to 
              create campaigns that resonate with your audience and drive real business results.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From startups to established brands, we partner with ambitious businesses 
              ready to dominate their digital space. Our approach combines creative 
              storytelling with data-driven optimization to ensure every piece of content 
              serves your growth objectives.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="premium-card flex flex-col sm:flex-row gap-4 sm:gap-5"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl gradient-accent flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
