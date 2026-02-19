import { useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

// ── Brand data ────────────────────────────────────────────────────────
const brands = [
  {
    name: "Healthcare",
    src: "/brands/Artham.png",
    color: "#FF6B00",
    shadow: "rgba(255,107,0,0.3)",
  },
  {
    name: "Recruitment",
    src: "/brands/Logo-2.png",
    color: "#C68B00",
    shadow: "rgba(198,139,0,0.3)",
  },
  {
    name: "Fashion brand",
    src: "/brands/r.png",
    color: "#C9A84C",
    shadow: "rgba(201,168,76,0.3)",
  },
  {
    name: "Chemical Industry",
    src: "/brands/s.png",
    color: "#1A9BD7",
    shadow: "rgba(26,155,215,0.3)",
  },
  {
    name: "Education",
    src: "/brands/school.png",
    color: "#d6911a",
    shadow: "rgba(214,145,26,0.3)",
  },
  {
    name: "Influencer",
    src: "/brands/su.png",
    color: "#C9A84C",
    shadow: "rgba(201,168,76,0.3)",
  },
];

const track = [...brands, ...brands, ...brands];

// ── Marquee ───────────────────────────────────────────────────────────
function useMarquee(speed = 40) {
  const x = useMotionValue(0);
  const third = useRef(0);

  useAnimationFrame((_, delta) => {
    let next = x.get() - (speed * delta) / 1000;
    if (third.current && next <= -third.current) {
      next += third.current;
    }
    x.set(next);
  });

  return { x, third };
}

// ── Section ───────────────────────────────────────────────────────────
export default function BrandsSection() {
  const { x, third } = useMarquee(40);

  return (
    <section className="relative pt-24 pb-20 sm:pt-28 sm:pb-24 md:pt-32 md:pb-28 overflow-x-hidden overflow-y-visible">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

      {/* Header */}
      <div className="text-center mb-14 px-4">
        <span className="text-accent text-sm uppercase tracking-wider">
          Trusted By
        </span>

        <h2 className="text-3xl md:text-4xl font-heading mt-3 mb-3">
          Brands We've <span className="gradient-text">Grown Together</span>
        </h2>

        <p className="text-muted-foreground text-sm md:text-base max-w-sm mx-auto">
          Real businesses. Real results. Real growth.
        </p>
      </div>

      {/* Track */}
      <div
        className="overflow-x-hidden overflow-y-visible"
        style={{ paddingBottom: 40, paddingTop: 14, marginTop: 50 }}
      >
        <motion.div
          ref={(node) => {
            if (node) third.current = node.scrollWidth / 3;
          }}
          style={{ x, gap: "2.5rem" }}
          className="flex items-center will-change-transform"
        >
          {track.map((brand, i) => (
            <BrandCard key={`${brand.name}-${i}`} brand={brand} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── Brand Card ────────────────────────────────────────────────────────
function BrandCard({
  brand,
}: {
  brand: {
    name: string;
    src: string;
    color: string;
    shadow: string;
  };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 flex flex-col items-center"
      style={{ width: 200, paddingBottom: 36, paddingTop: 6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
    >
      {/* Glow — appears on hover */}
      <motion.div
        className="absolute rounded-2xl border"
        style={{ inset: 0, bottom: 30, borderRadius: 16 }}
        animate={{
          backgroundColor: hovered ? `${brand.color}10` : "transparent",
          borderColor: hovered ? `${brand.color}30` : "transparent",
          boxShadow: hovered
            ? `0 10px 50px ${brand.shadow}`
            : "0 0 0 transparent",
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Logo Container */}
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{ width: 180 }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 180,
            height: 100,
            overflow: "hidden",
            borderRadius: 12,
          }}
        >
          <motion.img
            src={brand.src}
            alt={brand.name}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              mixBlendMode: "multiply", // removes black backgrounds
              userSelect: "none",
            }}
            animate={{
              // Always full color, just slight brightness boost on hover
              filter: hovered
                ? "brightness(1.05) saturate(1.15)"
                : "brightness(1) saturate(1)",
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Label — slides up on hover */}
        <motion.span
          className="text-[10px] tracking-[0.2em] uppercase font-semibold whitespace-nowrap mt-2"
          style={{ color: brand.color }}
          animate={{
            opacity: hovered ? 1 : 0,
            y: hovered ? 0 : 5,
          }}
          transition={{ duration: 0.2 }}
        >
          {brand.name}
        </motion.span>
      </div>
    </motion.div>
  );
}
