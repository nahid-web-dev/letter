'use client'
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift, Flower, MousePointerClick, } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

const images = [
  "/image_1.png",
  "/image_2.png",
  "/image_3.png",
  "/image_4.png",
  "/image_5.png",
  // "/image_1.png",
];

const qualities = [
  { icon: Heart, text: "Your kindness touches everyone around you" },
  { icon: Sparkles, text: "Your smile brightens up any room" },
  { icon: Gift, text: "Your presence is a gift to those who know you" },
  { icon: Flower, text: "Your beauty blooms like a rare flower" },
];


export default function Index() {
  // ... keep existing code (state and refs)

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isLetterOpen) {
      const timer = setTimeout(() => {
        setIsRevealed(true);
        if (audioRef.current) {
          audioRef.current.play().catch(() => {
            console.log("Audio playback failed");
          });
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLetterOpen]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleLetterClick = () => {
    setIsLetterOpen(true);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-sky-300 via-purple-400 to-sky-600 flex items-center justify-center p-4">
      <audio ref={audioRef} loop>
        <source src="/path-to-your-audio-file.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {!isLetterOpen ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={handleLetterClick}
          >
            <EnvelopeSVG />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {isLetterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 py-8 max-w-7xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-700 mb-12 drop-shadow-lg"
          >
            For Dearest Sabnam
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isRevealed ? 1 : 0 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="text-center mt-12 max-w-3xl mx-auto bg-white/20 backdrop-blur-md p-2 py-5 sm:p-8 rounded-2xl shadow-xl"
          >
            {isRevealed && (
              <>
                <TypeAnimation
                  sequence={[
                    "Dear Sabnam, I was free and thought that I can make this as a project. Don't get me wrong! We are just friends. And I wanted your pictures for this reason. I didn't have any bad mindset. Hope you like it.",
                  ]}
                  wrapper="p"
                  speed={50}
                  className="text-sm md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-8 font-medium drop-shadow-md"
                />
              </>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-6 sm:my-12">
            {images.map((imageUrl, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: isRevealed ? 1 : 0,
                  rotate: isRevealed ? 0 : -180,
                  y: isRevealed ? 0 : 100
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.05,
                  // boxShadow: "0 20px 30px rgba(0,0,0,0.2)"
                }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm "
              >
                <img
                  src={imageUrl}
                  alt={`Sabnam ${index + 1}`}
                  className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${index === currentImageIndex ? "opacity-100 scale-100" : "opacity-100 scale-100"
                    }`}
                />
                <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12"
            >
              {qualities.map((quality, index) => {
                const Icon = quality.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 2 + index * 0.2 }}
                    className="bg-white/20 backdrop-blur-md p-2 sm:p-6 rounded-xl shadow-lg flex items-center gap-4 group hover:bg-white/30 transition-all duration-300"
                  >
                    <div className="p-3 bg-white/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <p className="text-gray-700 text-lg font-medium">{quality.text}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          <div className=" w-full flex justify-center">

            <button
              onClick={nextImage}
              className="px-8 py-3 mx-auto bg-white/80 backdrop-blur-lg text-gray-900 rounded-full
                    hover:bg-white/40 transition-all duration-300 transform hover:scale-105
                    focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                    shadow-lg hover:shadow-xl font-medium flex justify-center items-center gap-2"
            >
              Click <MousePointerClick /> me!
            </button>
          </div>

        </motion.div>
      )}
      {isLetterOpen && <FloatingHearts />}
    </div>
  );
}

function FloatingHearts() {
  return (
    <div className=" h-dvh w-screen fixed top-0 left-0">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: Math.random() * 200 + 400 }}
          animate={{
            y: -100,
            x: Math.sin(i) * 100,
            rotate: Math.random() * 360
          }}
          transition={{
            duration: Math.random() * 20 + 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
          className="absolute pointer-events-none "
          style={{
            right: `${Math.random() * 100}%`,
            scale: `${Math.random() * 0.5 + 0.5}`
          }}
        >
          <Heart className="text-pink-500/80 w-6 h-6 fill-current" />
        </motion.div>
      ))}
    </div>
  );
}


function HeartSVGs() {
  return (
    <>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: Math.random() * 100 + 100 }}
          animate={{ y: -100 }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 30 + 10}px`,
          }}
        >
          <Heart className="text-red-500 fill-current" />
        </motion.div>
      ))}
    </>
  )
}

function EnvelopeSVG() {
  return (
    <div className="relative group">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
      >
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
            fill="white"
          />
        </svg>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="absolute -bottom-8 transform w-full text-center text-gray-700 text-sm whitespace-nowrap opacity-80"
      >
        Click To Open
      </motion.div>
    </div>
  )
}

// function EnvelopeSVG() {
//   return (
//     <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path
//         d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
//         fill="white"
//       />
//     </svg>
//   )
// }

