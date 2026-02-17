import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const LETTERS = ["C", "O", "R", "E", "L", "I", "N", "K"];
const O_INDEX = 1;

// ── Timing (ms) — tightened for speed ────────────────────────────────
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

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<Phase>("in");
  const oRef = useRef<HTMLSpanElement>(null);
  const [oOffset, setOOffset] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (oRef.current) {
        const rect = oRef.current.getBoundingClientRect();
        const oCenter = rect.left + rect.width / 2;
        const screenCenter = window.innerWidth / 2;
        setOOffset(screenCenter - oCenter);
      }
    };
    const id = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase("hold"), allInTime),
      setTimeout(() => setPhase("out"), allOutStart),
      setTimeout(() => setPhase("center"), oCenterStart),
      setTimeout(() => setPhase("zoom"), oZoomStart),
      setTimeout(() => onFinish(), finishTime),
    ];
    return () => t.forEach(clearTimeout);
  }, [onFinish]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Subtle grain */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px",
        }}
      />

      {/* Ambient yellow glow — softer on white */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-[2]"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #FACC15 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
        initial={{ opacity: 0, scale: 0.4 }}
        animate={
          phase === "in" || phase === "hold"
            ? { opacity: 0.18, scale: 1 }
            : phase === "center"
              ? { opacity: 0.3, scale: 0.7 }
              : phase === "zoom"
                ? { opacity: 0.5, scale: 2.5 }
                : { opacity: 0, scale: 0.4 }
        }
        transition={{ duration: 0.9 }}
      />

      {/* ── Letter row ── */}
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
            />
          );
        })}
      </div>

      {/* Tagline */}
      <motion.p
        className="absolute pointer-events-none z-[20]"
        style={{
          bottom: "11%",
          fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
          fontSize: "clamp(9px, 1vw, 11px)",
          letterSpacing: "0.5em",
          color: "#000",
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

      {/* ── White flood fill — zooms out from center with O, merges seamlessly ── */}
      {/* This white circle expands alongside the O zoom so the transition into  */}
      {/* the (white-bg) main page is completely invisible — no flash, no cut.   */}
      <motion.div
        className="absolute rounded-full pointer-events-none z-[40]"
        style={{
          width: "clamp(68px, 11vw, 128px)",
          height: "clamp(68px, 11vw, 128px)",
          backgroundColor: "#FACC15",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          phase === "zoom"
            ? {
                scale: 60,
                opacity: 1,
                transition: {
                  duration: (O_ZOOM_DUR / 1000) * 0.7,
                  ease: [0.6, 0, 0.2, 1],
                },
              }
            : { scale: 0, opacity: 0 }
        }
      />

      {/* White wash that fades in gently OVER the yellow — smooth page entry */}
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

/* ─────────────────────────────────────────────────────────────────────
   O — stays in flex row, slides to center, then zooms
───────────────────────────────────────────────────────────────────── */
function OLetter({
  oRef,
  phase,
  oOffset,
  inDelay,
}: {
  oRef: React.RefObject<HTMLSpanElement>;
  phase: Phase;
  oOffset: number;
  inDelay: number;
}) {
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
    if (phase === "zoom")
      return {
        opacity: 1,
        x: oOffset,
        y: 0,
        scale: 32,
        filter: "blur(0px)",
        transition: { duration: O_ZOOM_DUR / 1000, ease: [0.4, 0, 0.15, 1] },
      };
    return {};
  };

  const glowByPhase: Record<Phase, string> = {
    in: "0 0 20px rgba(250,204,21,0.4), 0 0 50px rgba(250,204,21,0.15)",
    hold: "0 0 20px rgba(250,204,21,0.4), 0 0 50px rgba(250,204,21,0.15)",
    out: "0 0 20px rgba(250,204,21,0.4), 0 0 50px rgba(250,204,21,0.15)",
    center: "0 0 40px rgba(250,204,21,0.8), 0 0 100px rgba(250,204,21,0.4)",
    zoom: "0 0 60px rgba(250,204,21,1),   0 0 160px rgba(250,204,21,0.7)",
  };

  return (
    <motion.span
      ref={oRef}
      initial={{ opacity: 0, x: 0, y: 75, scale: 0.4, filter: "blur(16px)" }}
      animate={getAnimate()}
      style={{
        fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
        fontSize: "clamp(68px, 11vw, 128px)",
        lineHeight: 1,
        fontWeight: 400,
        letterSpacing: "0.05em",
        display: "inline-block",
        color: "#FACC15",
        textShadow: glowByPhase[phase],
        zIndex: 30,
      }}
    >
      O
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Non-O letters — BLACK on white, exit upward in reverse stagger
───────────────────────────────────────────────────────────────────── */
function NonOLetter({
  char,
  phase,
  inDelay,
  outDelay,
}: {
  char: string;
  phase: Phase;
  inDelay: number;
  outDelay: number;
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
      initial={{ opacity: 0, y: 75, scale: 0.4, filter: "blur(16px)" }}
      animate={getAnimate()}
      style={{
        fontFamily: "'Bebas Neue', 'Impact', 'Arial Black', sans-serif",
        fontSize: "clamp(68px, 11vw, 128px)",
        lineHeight: 1,
        fontWeight: 400,
        letterSpacing: "0.05em",
        display: "inline-block",
        color: "#000000",
      }}
    >
      {char}
    </motion.span>
  );
}
