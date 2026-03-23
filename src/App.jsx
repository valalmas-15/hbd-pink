import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Volume2, VolumeX, Mail, Sparkles } from "lucide-react";

// --- Komponen Matrix Rain (Latar Belakang) ---
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const text = "HAPPYBIRTHDAYACAA";
    const letters = text.split("");
    const fontSize = 14;
    const columns = width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#FF1493";
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-40 pointer-events-none"
    />
  );
};

// --- Sampul Depan ---
const NotebookCover = ({ onClick, photoUrl, name }) => (
  <div
    onClick={onClick}
    className="w-full h-full relative rounded-r-xl border-l-4 border-pink-800 shadow-2xl cursor-pointer overflow-hidden group bg-white"
    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
  >
    <img
      src={photoUrl}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      alt="Sampul Depan"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-4 z-10"
      >
        <Heart className="text-white fill-current w-12 h-12 md:w-16 md:h-16 drop-shadow-lg" />
      </motion.div>
      <p className="text-pink-600 font-serif font-bold text-xs md:text-sm tracking-widest uppercase text-center">
        {name}'s Memory
      </p>
      <p className="absolute bottom-10 text-white/70 font-mono text-[8px] uppercase tracking-[0.4em] z-10 font-bold animate-pulse">
        Swipe to Turn Pages
      </p>
    </div>
  </div>
);

// --- Komponen Lembaran (Leaf) ---
const Leaf = ({ index, isFlipped, children, totalLeaves }) => {
  return (
    <motion.div
      className="absolute top-0 right-0 h-full w-1/2 origin-left preserve-3d"
      initial={false}
      animate={{
        rotateY: isFlipped ? -180 : 0,
        zIndex: isFlipped ? index + 10 : totalLeaves - index + 10,
      }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="absolute inset-0 w-full h-full bg-white rounded-r-lg border-l border-gray-100 shadow-inner p-1 overflow-hidden pointer-events-none"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translateZ(1px)",
        }}
      >
        {children[0]}
      </div>
      <div
        className="absolute inset-0 w-full h-full bg-white rounded-l-lg border-r border-gray-100 shadow-inner p-1 overflow-hidden pointer-events-none"
        style={{
          transform: "rotateY(180deg) translateZ(1px)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {children[1]}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [phase, setPhase] = useState("intro");
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [flippedLeaves, setFlippedLeaves] = useState(0);
  const audioRef = useRef(null);

  const name = "ACAA";
  const surpriseSequence = [
    "3",
    "2",
    "1",
    "HAPPY",
    "BIRTHDAY",
    "TO",
    "YOU",
    name,
  ];

  const bookMessages = [
    "AYO SWIPE DULU... ✨",
    "HAPPY LVL UP DAY ACAA! ❤️",
    "I wish u a lot of happines, may all ur wish come true, and BE PROUD OF UR SELF CANTIKK!!",
    "Kini dan selamanya, kamu adalah akhir yang bahagia... 🌹",
  ];

  // Daftar foto utama dari assets untuk kolase akhir
  const finalPhotos = [
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted]);

  // Global trigger for audio on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && isMuted === false) {
        audioRef.current.play().catch(() => {});
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("touchstart", handleFirstInteraction);
      }
    };
    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);
    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isMuted]);

  useEffect(() => {
    if (phase === "sequence" && audioRef.current) {
      setIsMuted(false);
      audioRef.current.play().catch((e) => console.log("Audio trigger failed:", e));
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "sequence") {
      if (sequenceIndex < surpriseSequence.length) {
        const timer = setTimeout(
          () => setSequenceIndex(sequenceIndex + 1),
          850,
        );
        return () => clearTimeout(timer);
      } else {
        setPhase("heartPulse");
      }
    }
    if (phase === "heartPulse") {
      const timer = setTimeout(() => setPhase("character"), 1200);
      return () => clearTimeout(timer);
    }
    if (phase === "character") {
      const timer = setTimeout(() => setPhase("reveal"), 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, sequenceIndex]);

  const handlePanEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      if (flippedLeaves < 3) {
        setFlippedLeaves((prev) => prev + 1);
      } else if (flippedLeaves === 3) {
        setPhase("collage");
      }
    } else if (info.offset.x > swipeThreshold) {
      if (flippedLeaves > 0) {
        setFlippedLeaves((prev) => prev - 1);
      }
    }
  };

  // Ukuran hati diperbesar dengan pengali yang lebih tinggi (X: 280, Y: 220)
  const collagePhotos = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const x = 280 * Math.pow(Math.sin(angle), 3);
    const y = -(
      220 * Math.cos(angle) -
      80 * Math.cos(2 * angle) -
      35 * Math.cos(3 * angle) -
      15 * Math.cos(4 * angle)
    );
    return { x, y, id: i };
  });

  const getContainerX = () => {
    if (flippedLeaves === 0) return "-25%";
    if (flippedLeaves === 3) return "25%";
    return "0%";
  };

  return (
    <div className="min-h-screen text-white font-sans overflow-hidden bg-black select-none flex flex-col items-center justify-center w-full">
      <div className="portrait-lock">
        <div className="rotate-icon" />
        <h2 className="text-pink-500 font-black text-2xl uppercase tracking-widest mb-2 font-inter">Rotate Your Device</h2>
        <p className="text-white/60 text-sm font-mono uppercase tracking-[0.2em]">Please Use Landscape Mode</p>
      </div>

      <MatrixRain />

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-10 text-center px-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-8 p-1 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-3xl shadow-[0_0_40px_rgba(236,72,153,0.3)]"
            >
              <div className="bg-black/80 backdrop-blur-md rounded-[22px] p-8 flex flex-col items-center border border-white/10">
                <Sparkles
                  size={44}
                  className="text-yellow-400 mb-4 animate-pulse"
                />
                <h1 className="text-2xl font-black tracking-[0.2em] uppercase mb-2">
                  HBD ACAA
                </h1>
                <p className="text-pink-400 text-xs font-mono uppercase tracking-widest">
                  Let's Open Your BDay Present
                </p>
              </div>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase("sequence");
                setIsMuted(false);
                if (audioRef.current) {
                  audioRef.current.play().catch(() => {});
                }
              }}
              className="bg-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all uppercase tracking-widest cursor-pointer"
            >
              Open 🎁
            </motion.button>
          </motion.div>
        )}

        {phase === "sequence" && (
          <motion.div
            key="sequence"
            exit={{ opacity: 0 }}
            className="z-20 text-center"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={sequenceIndex}
                initial={{ scale: 0.2, opacity: 0, rotate: -10 }}
                animate={{ scale: 1.2, opacity: 1, rotate: 0 }}
                exit={{ scale: 2.5, opacity: 0, rotate: 10 }}
                className={`font-black text-7xl md:text-[10rem] drop-shadow-[0_0_30px_rgba(255,20,147,0.4)] text-pink-500`}
              >
                {surpriseSequence[sequenceIndex]}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {phase === "heartPulse" && (
          <motion.div key="pulse" exit={{ opacity: 0 }} className="z-10">
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <Heart
                size={140}
                className="text-pink-500 fill-current drop-shadow-[0_0_50px_rgba(236,72,153,0.7)]"
              />
            </motion.div>
          </motion.div>
        )}

        {phase === "character" && (
          <motion.div
            key="char"
            exit={{ opacity: 0 }}
            className="z-10 text-center"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring" }}
              className="text-[10rem] md:text-[12rem] mb-4 filter drop-shadow-2xl"
            >
              🐱
            </motion.div>
            <div className="bg-white text-pink-600 px-8 py-3 rounded-2xl font-black text-3xl shadow-2xl">
              SURPRISE!!
            </div>
          </motion.div>
        )}

        {phase === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-full flex flex-col items-center justify-center p-0 flex-1 min-h-0"
          >
            <div className="z-30 mb-2 max-w-sm w-full min-h-[60px] flex items-center justify-center text-center px-2">
              <AnimatePresence mode="wait">
                {flippedLeaves < 3 && (
                  <motion.div
                    key={flippedLeaves}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-2xl border-t-4 border-pink-500 relative w-full"
                  >
                    <Mail
                      className="absolute -top-3 -right-3 text-pink-500 bg-white rounded-full p-1 shadow-md"
                      size={20}
                    />
                    <p className="text-gray-800 font-serif italic text-xs md:text-sm leading-snug">
                      "{bookMessages[flippedLeaves]}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative z-10 w-[min(90vw,75vh)] max-w-[650px] aspect-[4/3] perspective-2000 flex items-center justify-center touch-none transition-all origin-center">
              <motion.div
                className="relative w-full h-full flex preserve-3d"
                animate={{ x: getContainerX() }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onPanEnd={handlePanEnd}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={`relative w-full h-full flex preserve-3d transition-shadow duration-300 ${flippedLeaves === 0 || flippedLeaves === 3 ? "shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : "shadow-[0_30px_60px_rgba(0,0,0,0.5)]"}`}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: flippedLeaves > 0 ? 1 : 0,
                      visibility: flippedLeaves > 0 ? "visible" : "hidden",
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-1/2 h-full bg-black rounded-l-lg border-r border-gray-800 flex items-center justify-center p-2 overflow-hidden z-0"
                  >
                    <div className="text-pink-500 font-mono text-[10px] opacity-20">
                      MEMORIES
                    </div>
                  </motion.div>

                  <motion.div
                    initial={false}
                    animate={{
                      opacity: flippedLeaves === 3 ? 1 : 0,
                      visibility: flippedLeaves === 3 ? "visible" : "hidden",
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-1/2 h-full bg-black rounded-r-lg p-2 flex items-center justify-center border-l border-gray-800 overflow-hidden relative z-0"
                  >
                    <div className="text-pink-500 font-mono text-[10px] opacity-20">
                      LOVE U FOREVER
                    </div>
                  </motion.div>

                  <Leaf index={3} isFlipped={flippedLeaves > 2} totalLeaves={3}>
                    <img
                      src="/5.jpg"
                      className="w-full h-full object-cover rounded"
                      alt="Memori 5"
                    />
                    <div className="w-full h-full flex flex-col items-center justify-center bg-pink-700 rounded-l-lg shadow-inner overflow-hidden relative">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:20px_20px]" />
                      <Heart
                        size={50}
                        className="text-white fill-current mb-4 animate-pulse z-10"
                      />
                      <h3 className="text-white font-black text-xl tracking-[0.3em] uppercase z-10">
                        LOVE U FOREVER
                      </h3>
                      <p className="text-white/40 text-[10px] mt-6 italic z-10">
                        Swipe left to See Collage
                      </p>
                    </div>
                  </Leaf>

                  <Leaf index={2} isFlipped={flippedLeaves > 1} totalLeaves={3}>
                    <img
                      src="/3.jpg"
                      className="w-full h-full object-cover rounded"
                      alt="Memori 3"
                    />
                    <img
                      src="/4.jpg"
                      className="w-full h-full object-cover rounded"
                      alt="Memori 4"
                    />
                  </Leaf>

                  <Leaf index={1} isFlipped={flippedLeaves > 0} totalLeaves={3}>
                    <NotebookCover
                      onClick={() => setFlippedLeaves(1)}
                      photoUrl="/1.jpg"
                      name={name}
                    />
                    <img
                      src="/2.jpg"
                      className="w-full h-full object-cover rounded"
                      alt="Memori 2"
                    />
                  </Leaf>
                </div>
              </motion.div>
            </div>

            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${flippedLeaves === i ? "w-6 bg-pink-500" : "w-2 bg-white/20"}`}
                  />
                ))}
              </div>
              <motion.p
                animate={{ y: [0, 3, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[9px] font-mono text-pink-300 uppercase tracking-widest font-bold"
              >
                {flippedLeaves === 3
                  ? "Swipe left to see our love heart"
                  : "Swipe horizontally to flip"}
              </motion.p>
            </div>
          </motion.div>
        )}

        {phase === "collage" && (
          <motion.div
            key="collage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {collagePhotos.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: p.x,
                    y: p.y,
                    rotate: i % 2 === 0 ? 10 : -10,
                  }}
                  transition={{ delay: i * 0.05, type: "spring" }}
                  className="absolute w-28 h-28 md:w-40 md:h-40 border-4 border-white rounded-lg shadow-2xl overflow-hidden bg-white"
                >
                  <img
                    src={finalPhotos[i % finalPhotos.length]}
                    className="w-full h-full object-cover"
                    alt="Memory"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
                className="z-50 text-center bg-black/60 backdrop-blur-xl p-10 md:p-14 rounded-full border border-pink-500/40 shadow-[0_0_80px_rgba(236,72,153,0.5)]"
              >
                <h2 className="text-3xl md:text-5xl font-black text-pink-500 uppercase tracking-tighter leading-none drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]">
                  Happy Birthday
                  <br />
                  {name}
                </h2>
                <p className="text-pink-300 text-[10px] mt-4 font-mono tracking-[0.5em] font-bold uppercase">
                  CANTIKK!!
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-[100]">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-4 bg-black/40 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/10 transition-all text-white cursor-pointer"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      <audio 
        ref={audioRef} 
        src="/song.mp3" 
        loop 
        autoPlay
        muted={isMuted}
      />
    </div>
  );
}
