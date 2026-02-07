import { motion } from "framer-motion";

const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 0.15,
          scale: 1,
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-20 right-[10%] w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-accent to-accent-warm blur-3xl"
      />

      {/* Small floating diamond */}
      <motion.div
        initial={{ opacity: 0, rotate: 45 }}
        animate={{
          opacity: 0.2,
          rotate: [45, 90, 45],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-1/3 left-[5%] w-16 h-16 md:w-24 md:h-24 bg-accent/30 blur-xl"
      />

      {/* Medium floating ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 0.1,
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 right-[15%] w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-accent/20"
      />

      {/* Floating dots pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute top-1/2 left-[15%] grid grid-cols-3 gap-3"
      >
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
        ))}
      </motion.div>

      {/* Gradient line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{
          opacity: 0.2,
          scaleX: 1,
        }}
        transition={{
          duration: 1.5,
          delay: 0.5,
        }}
        className="absolute bottom-[20%] left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
      />

      {/* Floating plus signs */}
      <motion.div
        animate={{
          rotate: [0, 180, 360],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[30%] left-[25%] text-accent/20 text-4xl font-light"
      >
        +
      </motion.div>

      <motion.div
        animate={{
          rotate: [360, 180, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          delay: 3,
        }}
        className="absolute top-[25%] right-[25%] text-accent/15 text-5xl font-light"
      >
        +
      </motion.div>
    </div>
  );
};

export default FloatingShapes;
