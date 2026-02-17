import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const LETTERS = ["C", "O", "R", "E", "L", "I", "N", "K"];
const O_INDEX = 1;

// ── Timing (ms) ───────────────────────────────────────────────────────
const LETTER_IN_STAGGER = 80;
const LETTER_IN_DUR = 380;
const HOLD = 700;
const LETTER_OUT_STAGGER = 55;
const LETTER_OUT_DUR = 260;
const O_CENTER_DUR = 520;
const O_CENTER_DELAY = 80;
const O_BREATHE = 250;
const O_ZOOM_DUR = 1100;
const FINISH_OFFSET = 60;

const allInTime = LETTERS.length * LETTER_IN_STAGGER + LETTER_IN_DUR;
const allOutStart = allInTime + HOLD;
const lastOutDone =
  allOutStart + (LETTERS.length - 1) * LETTER_OUT_STAGGER + LETTER_OUT_DUR;
const oCenterStart = lastOutDone + O_CENTER_DELAY;
const oZoomStart = oCenterStart + O_CENTER_DUR + O_BREATHE;
const finishTime = oZoomStart + O_ZOOM_DUR + FINISH_OFFSET;
// ─────────────────────────────────────────────────────────────────────

type Phase = "in" | "hold" | "out" | "center" | "zoom";

// ── Inject Google Font directly so it always loads regardless of _document.tsx ──
function useInjectFont() {
  useEffect(() => {
    const id = "bebas-neue-font";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap";
    document.head.appendChild(link);
  }, []);
}

// ── Font size: fills 88% of screen width across all devices ──
function useFontSize() {
  const [size, setSize] = useState(64);
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      // Bebas Neue: char width ≈ 0.6× fontSize, letterSpacing 0.05em ≈ 0.05×
      // 8 letters × (0.6 + 0.05) × fontSize = 0.88 × vw
      const raw = (0.88 * vw) / (8 * 0.65);
      setSize(Math.min(150, Math.max(38, raw)));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return size;
}

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<Phase>("in");
  const [fontReady, setFontReady] = useState(false);
  const oRef = useRef<HTMLSpanElement>(null);
  const [oOffset, setOOffset] = useState(0);
  const fontSize = useFontSize();

  useInjectFont();

  // Wait for Bebas Neue to actually load before starting animation
  useEffect(() => {
    if ("fonts" in document) {
      document.fonts.load(`1em 'Bebas Neue'`).then(() => setFontReady(true));
    } else {
      // Fallback: short delay for older browsers
      const t = setTimeout(() => setFontReady(true), 300);
      return () => clearTimeout(t);
    }
  }, []);

  // Measure O's real distance from screen center
  useEffect(() => {
    if (!fontReady) return;
    const measure = () => {
      if (oRef.current) {
        const rect = oRef.current.getBoundingClientRect();
        const oCenter = rect.left + rect.width / 2;
        const scrCenter = window.innerWidth / 2;
        setOOffset(scrCenter - oCenter);
      }
    };
    const id = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, [fontSize, fontReady]);

  // Only start timers once font is ready — no jank on first frame
  useEffect(() => {
    if (!fontReady) return;
    const t = [
      setTimeout(() => setPhase("hold"), allInTime),
      setTimeout(() => setPhase("out"), allOutStart),
      setTimeout(() => setPhase("center"), oCenterStart),
      setTimeout(() => setPhase("zoom"), oZoomStart),
      setTimeout(() => onFinish(), finishTime),
    ];
    return () => t.forEach(clearTimeout);
  }, [fontReady, onFinish]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* ── Glow — kept very faint so white bg stays pure white ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-[2]"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, #FACC15 0%, transparent 70%)",
          filter: "blur(140px)",
        }}
        initial={{ opacity: 0 }}
        animate={
          phase === "in" || phase === "hold"
            ? { opacity: 0.12 }
            : phase === "center"
              ? { opacity: 0.22 }
              : phase === "zoom"
                ? { opacity: 0.4 }
                : { opacity: 0 }
        }
        transition={{ duration: 0.8 }}
      />

      {/* ── Letter row ── */}
      {fontReady && (
        <div className="relative z-[20] flex items-center select-none">
          {LETTERS.map((char, i) => {
            const isO = i === O_INDEX;
            const reverseI = LETTERS.length - 1 - i;
            if (isO) {
              return (
                <OLetter
                  key={i}
                  oRef={oRef}
                  phase={phase}
                  oOffset={oOffset}
                  inDelay={i * LETTER_IN_STAGGER}
                  fontSize={fontSize}
                />
              );
            }
            return (
              <NonOLetter
                key={i}
                char={char}
                phase={phase}
                inDelay={i * LETTER_IN_STAGGER}
                outDelay={reverseI * LETTER_OUT_STAGGER}
                fontSize={fontSize}
              />
            );
          })}
        </div>
      )}

      {/* Tagline */}
      <motion.p
        className="absolute pointer-events-none z-[20]"
        style={{
          bottom: "9%",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: Math.max(10, fontSize * 0.1),
          letterSpacing: "0.45em",
          color: "#111",
          opacity: 0.4,
          textTransform: "uppercase",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={
          phase === "hold"
            ? { opacity: 0.35, y: 0, transition: { duration: 0.45 } }
            : phase === "out" || phase === "center" || phase === "zoom"
              ? { opacity: 0, y: -5, transition: { duration: 0.2 } }
              : { opacity: 0, y: 10 }
        }
      >
        PREMIUM SOCIAL MEDIA MARKETING
      </motion.p>

      {/* Yellow flood — expands from O */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-[40]"
        style={{
          width: fontSize,
          height: fontSize,
          backgroundColor: "#FACC15",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          phase === "zoom"
            ? {
                scale: 70,
                opacity: 1,
                transition: {
                  duration: (O_ZOOM_DUR / 1000) * 0.68,
                  ease: [0.6, 0, 0.2, 1],
                },
              }
            : { scale: 0, opacity: 0 }
        }
      />

      {/* White wash — seamlessly merges into main page */}
      <motion.div
        className="absolute inset-0 z-[45] pointer-events-none"
        style={{ backgroundColor: "#FFFFFF" }}
        initial={{ opacity: 0 }}
        animate={
          phase === "zoom"
            ? {
                opacity: [0, 0, 0, 1],
                transition: {
                  times: [0, 0.45, 0.65, 1],
                  duration: O_ZOOM_DUR / 1000,
                  ease: "easeInOut",
                },
              }
            : { opacity: 0 }
        }
      />
    </div>
  );
}

/* ── Shared font style ── */
const letterStyle = (fontSize: number): React.CSSProperties => ({
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: `${fontSize}px`,
  lineHeight: 1,
  fontWeight: 400,
  letterSpacing: "0.05em",
  display: "inline-block",
});

/* ── O Letter ── */
function OLetter({
  oRef,
  phase,
  oOffset,
  inDelay,
  fontSize,
}: {
  oRef: React.RefObject<HTMLSpanElement>;
  phase: Phase;
  oOffset: number;
  inDelay: number;
  fontSize: number;
}) {
  const glow: Record<Phase, string> = {
    in: "0 0 18px rgba(250,204,21,0.5), 0 0 40px rgba(250,204,21,0.2)",
    hold: "0 0 18px rgba(250,204,21,0.5), 0 0 40px rgba(250,204,21,0.2)",
    out: "0 0 18px rgba(250,204,21,0.5), 0 0 40px rgba(250,204,21,0.2)",
    center: "0 0 40px rgba(250,204,21,0.9), 0 0 90px rgba(250,204,21,0.5)",
    zoom: "0 0 60px rgba(250,204,21,1),   0 0 150px rgba(250,204,21,0.8)",
  };

  const getAnimate = (): object => {
    if (phase === "in")
      return {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          delay: inDelay / 1000,
          duration: LETTER_IN_DUR / 1000,
          ease: [0.16, 1, 0.3, 1],
        },
      };
    if (phase === "hold")
      return { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };
    if (phase === "out")
      return { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };
    if (phase === "center")
      return {
        opacity: 1,
        x: oOffset,
        y: 0,
        scale: 1.06,
        filter: "blur(0px)",
        transition: { duration: O_CENTER_DUR / 1000, ease: [0.76, 0, 0.24, 1] },
      };
    return {
      // zoom
      opacity: 1,
      x: oOffset,
      y: 0,
      scale: 32,
      filter: "blur(0px)",
      transition: { duration: O_ZOOM_DUR / 1000, ease: [0.4, 0, 0.15, 1] },
    };
  };

  return (
    <motion.span
      ref={oRef}
      initial={{ opacity: 0, x: 0, y: 70, scale: 0.4, filter: "blur(16px)" }}
      animate={getAnimate()}
      style={{
        ...letterStyle(fontSize),
        color: "#FACC15",
        textShadow: glow[phase],
        zIndex: 30,
      }}
    >
      O
    </motion.span>
  );
}

/* ── Non-O Letters ── */
function NonOLetter({
  char,
  phase,
  inDelay,
  outDelay,
  fontSize,
}: {
  char: string;
  phase: Phase;
  inDelay: number;
  outDelay: number;
  fontSize: number;
}) {
  const getAnimate = (): object => {
    if (phase === "in")
      return {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          delay: inDelay / 1000,
          duration: LETTER_IN_DUR / 1000,
          ease: [0.16, 1, 0.3, 1],
        },
      };
    if (phase === "hold")
      return { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };
    return {
      opacity: 0,
      y: -65,
      scale: 0.4,
      filter: "blur(12px)",
      transition: {
        delay: outDelay / 1000,
        duration: LETTER_OUT_DUR / 1000,
        ease: [0.76, 0, 0.24, 1],
      },
    };
  };

  return (
    <motion.span
      initial={{ opacity: 0, y: 70, scale: 0.4, filter: "blur(16px)" }}
      animate={getAnimate()}
      style={{ ...letterStyle(fontSize), color: "#000000" }}
    >
      {char}
    </motion.span>
  );
}
