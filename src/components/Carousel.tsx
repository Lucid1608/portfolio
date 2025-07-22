"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselItem {
  icon: React.ReactNode;
  name: string;
}

export default function Carousel({ items }: { items: CarouselItem[] }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const visibleCount = 4;
  const total = items.length;

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  // Auto-rotation effect
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      next();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  const getVisible = () => {
    const arr = [];
    for (let i = 0; i < visibleCount; i++) {
      arr.push(items[(index + i) % total]);
    }
    return arr;
  };

  return (
    <div 
      className="relative w-full max-w-2xl mx-auto flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-0 z-10 bg-white dark:bg-gray-900 rounded-full p-2 shadow hover:scale-110 transition-transform"
      >
        &#8592;
      </button>
      <div className="flex-1 overflow-hidden px-12">
        <div className="flex gap-6 justify-center">
          <AnimatePresence mode="sync" initial={false}>
            {getVisible().map((item, i) => (
              <motion.div
                key={`${item.name}-${index + i}`}
                className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-6 min-w-[120px] shadow"
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.8 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="font-medium text-sm">{item.name}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-0 z-10 bg-white dark:bg-gray-900 rounded-full p-2 shadow hover:scale-110 transition-transform"
      >
        &#8594;
      </button>
    </div>
  );
} 