import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const categories = ["All", "Social Media", "Paid Ads", "Branding", "Content"];

const projects = [
  {
    id: 1,
    title: "Luxury Fashion Brand",
    category: "Social Media",
    description:
      "Complete social media transformation resulting in 400% follower growth.",
    result: "+400% Followers",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
  },
  {
    id: 2,
    title: "Tech Startup Launch",
    category: "Paid Ads",
    description: "Strategic ad campaigns that generated 2000+ qualified leads.",
    result: "2000+ Leads",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: 3,
    title: "Personal Brand - CEO",
    category: "Branding",
    description:
      "Built thought leadership presence reaching 500K+ monthly impressions.",
    result: "500K+ Reach",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    id: 4,
    title: "E-commerce Growth",
    category: "Paid Ads",
    description: "ROAS-focused campaigns driving 10x return on ad spend.",
    result: "10x ROAS",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
  {
    id: 5,
    title: "Fitness Influencer",
    category: "Content",
    description: "Viral reels strategy generating millions of views monthly.",
    result: "5M+ Views",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
  },
  {
    id: 6,
    title: "SaaS Company Rebrand",
    category: "Branding",
    description: "Complete brand overhaul increasing conversions by 150%.",
    result: "+150% Conversions",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative rounded-2xl overflow-hidden mb-5">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
          <div className="flex items-center gap-2 text-primary-foreground font-medium">
            View Project
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>

        {/* Result Badge */}
        <div className="absolute top-4 right-4 px-4 py-2 rounded-full gradient-accent text-sm font-semibold text-primary-foreground">
          {project.result}
        </div>
      </div>

      {/* Content */}
      <span className="text-xs font-medium text-accent uppercase tracking-wider">
        {project.category}
      </span>
      <h3 className="text-xl font-heading font-semibold mt-2 mb-2 group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm">{project.description}</p>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container mx-auto container-padding">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Our Work
              </span>
              <h1 className="text-display font-heading mt-4 mb-6">
                Results That Speak{" "}
                <span className="gradient-text">For Themselves</span>
              </h1>
              <p className="text-subheadline text-muted-foreground">
                Explore our portfolio of successful campaigns and brand
                transformations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter */}
        <section className="pb-12">
          <div className="container mx-auto container-padding">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "gradient-accent text-primary-foreground shadow-lg"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-24">
          <div className="container mx-auto container-padding">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding section-muted">
          <div className="container mx-auto container-padding text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-headline font-heading mb-6">
                Want Results Like These?
              </h2>
              <p className="text-muted-foreground text-body-lg max-w-xl mx-auto mb-8">
                Your brand could be our next success story. Let's talk about
                your goals.
              </p>
              <Button
                variant="hero"
                size="lg"
                className="group"
                onClick={() =>
                  window.open(
                    "https://wa.me/918141085418?text=Hello%20Corelink%20%F0%9F%91%8B%0AI%20want%20to%20start%20a%20project%20with%20you.%20Please%20share%20details%20about%20process,%20pricing,%20and%20timeline.",
                    "_blank",
                  )
                }
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
