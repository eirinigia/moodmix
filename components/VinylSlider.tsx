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
    
    // Stack positions: front album fully visible, others peek out from behind like real vinyl stack
    if (normalizedDiff === 0) {
      // Front card - currently active, fully visible
      return {
        zIndex: 40,
        transform: isFlipping 
          ? 'translateX(-150%) rotateY(-15deg)' 
          : 'translateX(0) translateY(0)',
        opacity: isFlipping ? 0 : 1,
      };
    } else if (normalizedDiff === 1) {
      // Second card - peeks out from bottom-right
      return {
        zIndex: 30,
        transform: isFlipping
          ? 'translateX(0) translateY(0)'
          : 'translateX(12px) translateY(12px)',
        opacity: 1,
      };
    } else if (normalizedDiff === 2) {
      // Third card - peeks out further
      return {
        zIndex: 20,
        transform: isFlipping
          ? 'translateX(12px) translateY(12px)'
          : 'translateX(24px) translateY(24px)',
        opacity: 1,
      };
    } else if (normalizedDiff === 3) {
      // Fourth card - peeks out even further
      return {
        zIndex: 10,
        transform: isFlipping
          ? 'translateX(24px) translateY(24px)'
          : 'translateX(36px) translateY(36px)',
        opacity: 1,
      };
    } else {
      // Hidden cards
      return {
        zIndex: 5,
        transform: 'translateX(-150%) rotateY(-15deg)',
        opacity: 0,
      };
    }
  };

  return (
    <div className="relative w-full flex justify-center items-center h-48 md:h-56 mb-8 perspective-1000">
      {/* Album stack - render in reverse order so first is on top */}
      <div className="relative w-36 h-36 md:w-44 md:h-44">
        {[...albums].reverse().map((album) => {
          const originalIndex = albums.findIndex(a => a.id === album.id);
          const style = getCardStyle(originalIndex);
          return (
            <div
              key={album.id}
              className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl transition-all duration-500 ease-out bg-black"
              style={{
                zIndex: style.zIndex,
                transform: style.transform,
                opacity: style.opacity,
              }}
            >
              <Image
                src={album.src}
                alt={album.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 144px, 176px"
                priority
              />
              {/* Edge shadow for depth */}
              <div className="absolute inset-0 pointer-events-none" 
                style={{ boxShadow: 'inset 0 0 15px rgba(0,0,0,0.4)' }} 
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
