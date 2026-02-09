import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const categories = ["All", "Social Media", "Paid Ads", "Branding"];

/* Extract YouTube ID */
const getYouTubeId = (url: string) => {
  const reg = /(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([^&?/]+)/;
  const match = url.match(reg);
  return match ? match[1] : "";
};

const projects = [
  {
    id: 1,
    title: "Luxury Fashion Brand",
    category: "Social Media",
    description:
      "Complete social media transformation resulting in 400% follower growth.",
    video: "https://youtube.com/shorts/wIX0fSTY11g",
  },
  {
    id: 2,
    title: "Tech Startup Launch",
    category: "Branding",
    description: "Strategic ad campaigns that generated 2000+ qualified leads.",
    video: "https://youtu.be/Ql6lU5_eDZw",
  },
  {
    id: 3,
    title: "Personal Brand - CEO",
    category: "Paid Ads",
    description:
      "Built thought leadership presence reaching 500K+ monthly impressions.",
    video: "https://youtube.com/shorts/FB961hOxKDU",
  },
  {
    id: 4,
    title: "E-commerce Growth",
    category: "Social Media",
    description: "ROAS-focused campaigns driving strong return.",
    video: "https://youtube.com/shorts/wAhhiOVxhDw",
  },
  {
    id: 5,
    title: "Fitness Influencer",
    category: "Paid Ads",
    description: "Viral reels strategy generating millions of views monthly.",
    video: "https://www.youtube.com/shorts/QwmpyAvLdSE",
  },

  {
    id: 6,
    title: "Growth Marketing Reel",
    category: "Social Media",
    description: "High-performing short-form content driving engagement.",
    video: "https://youtube.com/shorts/dYCSIX65z-A",
  },
  {
    id: 7,
    title: "Brand Awareness Campaign",
    category: "Social Media",
    description: "Creative storytelling boosting brand visibility.",
    video: "https://youtube.com/shorts/tBl7yBf_ozA",
  },
  {
    id: 8,
    title: "Short Form Strategy",
    category: "Social Media",
    description: "Content strategy focused on reels and shorts performance.",
    video: "https://youtube.com/shorts/uryBlv9eDm8",
  },
  {
    id: 9,
    title: "Ad Performance Breakdown",
    category: "Paid Ads",
    description: "Performance-driven ads generating strong ROI.",
    video: "https://youtu.be/i3yfAmRXnrI",
  },
  {
    id: 10,
    title: "Conversion Focused Content",
    category: "Social Media",
    description: "Short video content designed to increase conversions.",
    video: "https://youtube.com/shorts/-JPw6hI_szI",
  },
  {
    id: 11,
    title: "Marketing Insight Reel",
    category: "Branding",
    description: "Quick insights and tips for marketing growth.",
    video: "https://youtu.be/hQhJlpVH-OE",
  },
  {
    id: 12,
    title: "Audience Growth Strategy",
    category: "Branding",
    description: "Strategic video boosting audience retention and reach.",
    video: "https://youtube.com/shorts/gFhr-AEjUuc",
  },
  {
    id: 13,
    title: "Performance Marketing Reel",
    category: "Branding",
    description: "High-impact short video driving reach and engagement.",
    video: "https://youtube.com/shorts/EEFh7WgtM7E",
  },
];

const ProjectCard = ({ project, openModal }: any) => {
  const [hovered, setHovered] = useState(false);
  const videoId = getYouTubeId(project.video);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className="group cursor-pointer w-full max-w-[240px] mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => openModal(videoId)}
    >
      <div className="relative rounded-2xl overflow-hidden mb-3 shadow-md">
        <div className="relative w-full aspect-[9/16] bg-black">
          {!hovered && (
            <img
              src={thumbnail}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          {hovered && (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3">
          <span className="text-white text-xs flex items-center gap-2">
            Click to Play <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>

      <span className="text-[10px] text-accent uppercase">
        {project.category}
      </span>
      <h3 className="text-sm font-semibold mt-1">{project.title}</h3>
      <p className="text-xs text-muted-foreground">{project.description}</p>
    </div>
  );
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* HERO */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="container mx-auto text-center">
            <span className="text-accent text-sm uppercase">OUR WORK</span>
            <h1 className="text-display mt-4 mb-6 leading-tight">
              Results That Speak <br />
              <span className="gradient-text">For Themselves</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of successful campaigns and brand
              transformations.
            </p>
          </div>
        </section>

        {/* FILTER */}
        <div className="flex justify-center gap-3 flex-wrap pb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm ${
                activeCategory === cat
                  ? "gradient-accent text-white"
                  : "bg-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <section className="pb-24">
          <div className="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} openModal={setPlayingVideo} />
            ))}
          </div>
        </section>

        {/* CTA — WHATSAPP BUTTON RESTORED */}
        <section className="section-padding section-muted text-center">
          <h2 className="text-headline font-heading mb-6">
            Want Results Like These?
          </h2>

          <p className="text-muted-foreground mb-8">
            Your brand could be our next success story. Let's talk.
          </p>

          <Button
            variant="hero"
            size="lg"
            onClick={() =>
              window.open(
                "https://wa.me/918141085418?text=Hello%20Corelink%20I%20want%20to%20start%20a%20project",
                "_blank",
              )
            }
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </section>
      </main>

      <Footer />

      {/* MODAL REEL PLAYER */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setPlayingVideo(null)}
          />

          <div className="relative w-[92%] max-w-[380px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl z-10">
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute top-3 right-3 bg-black/60 p-2 rounded-full text-white z-20"
            >
              ✕
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&mute=0&controls=1&vq=hd1080`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
