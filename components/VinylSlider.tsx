'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const albums = [
  {
    id: 1,
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%281%29.jfif-Gi0rLeG38d5JEQ3krRgJ1roBWPeFU9.jpeg',
    alt: 'Tyler, the Creator - Flower Boy',
  },
  {
    id: 2,
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cffe5708-e788-43f4-9cc4-ccd02700de90_600x636-Kk9B00rv9Q839Yb59CqOikae1fTpPR.jpg',
    alt: 'Guitarist jumping',
  },
  {
    id: 3,
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c6b5558e-ec35-4b18-a607-eec785169ee3_604x604-X2DnjBnBDcZBreyJPfYLWY3DWXPBJe.jpg',
    alt: 'Vampire Weekend - Contra',
  },
  {
    id: 4,
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8dfe7dde-3da2-4122-a53d-d6d2d9372d05_604x604-ct6DEOcojJmhOnYkGDMrjitl1qISK5.jpg',
    alt: 'Foals - Life Is Yours',
  },
];

export function VinylSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % albums.length);
        setIsFlipping(false);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff % albums.length) + albums.length) % albums.length;
    
    // Stack positions: 0 = front, 1 = behind right, 2 = behind further, 3 = hidden left
    if (normalizedDiff === 0) {
      // Front card - currently active
      return {
        zIndex: 40,
        transform: isFlipping 
          ? 'translateX(-120%) rotateY(-25deg) scale(0.85)' 
          : 'translateX(0) rotateY(0deg) scale(1)',
        opacity: isFlipping ? 0.6 : 1,
      };
    } else if (normalizedDiff === 1) {
      // Next card - moves to front when flipping
      return {
        zIndex: 30,
        transform: isFlipping
          ? 'translateX(0) rotateY(0deg) scale(1)'
          : 'translateX(15%) rotateY(8deg) scale(0.9)',
        opacity: isFlipping ? 1 : 0.7,
      };
    } else if (normalizedDiff === 2) {
      // Third card
      return {
        zIndex: 20,
        transform: isFlipping
          ? 'translateX(15%) rotateY(8deg) scale(0.9)'
          : 'translateX(28%) rotateY(12deg) scale(0.8)',
        opacity: isFlipping ? 0.7 : 0.5,
      };
    } else {
      // Hidden cards waiting on the left
      return {
        zIndex: 10,
        transform: 'translateX(-100%) rotateY(-20deg) scale(0.7)',
        opacity: 0,
      };
    }
  };

  return (
    <div className="relative w-full flex justify-center items-center h-48 md:h-56 mb-8 perspective-1000">
      {/* Vinyl record behind the albums */}
      <div className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl"
        style={{
          transform: 'translateX(20px)',
          zIndex: 5,
        }}
      >
        {/* Vinyl grooves */}
        <div className="absolute inset-2 rounded-full border border-gray-700/50" />
        <div className="absolute inset-4 rounded-full border border-gray-700/30" />
        <div className="absolute inset-6 rounded-full border border-gray-700/30" />
        <div className="absolute inset-8 rounded-full border border-gray-700/30" />
        {/* Center label */}
        <div className="absolute inset-0 m-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gray-900" />
        </div>
      </div>

      {/* Album stack */}
      <div className="relative w-36 h-36 md:w-44 md:h-44" style={{ transformStyle: 'preserve-3d' }}>
        {albums.map((album, index) => {
          const style = getCardStyle(index);
          return (
            <div
              key={album.id}
              className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl transition-all duration-500 ease-out"
              style={{
                ...style,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <Image
                src={album.src}
                alt={album.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 144px, 176px"
              />
              {/* Glossy reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
              {/* Edge shadow for depth */}
              <div className="absolute inset-0 shadow-inner pointer-events-none" 
                style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)' }} 
              />
            </div>
          );
        })}
      </div>

      {/* Subtle glow under the stack */}
      <div className="absolute bottom-4 w-48 h-8 bg-purple-500/20 rounded-full blur-xl" />
    </div>
  );
}
