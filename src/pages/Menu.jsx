import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu as MenuIcon } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Uj, Wj } from '../shared';

export default function Menu() {
  const bookRef = useRef(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    Uj.forEach((imageUrl) => {
      const image = new Image();
      image.src = imageUrl;
    });

    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  if (viewport.width === 0) return null;

  const isMobile = viewport.width < 768;
  const isPortrait = viewport.width < 1024;
  const portraitWidth = Math.min(500, viewport.width * 0.7);
  const bookWidth = isPortrait ? (isMobile ? viewport.width : portraitWidth) : (viewport.height * 0.85) / Wj;
  const bookHeight = isPortrait
    ? (isMobile ? viewport.width : portraitWidth) * Wj
    : viewport.height * 0.85;
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Menu', href: '/menu' },
    { name: "Let's Party", href: '/events' },
    { name: 'Order Now', href: '/order-now' },
  ];

  const flipNext = () => bookRef.current?.pageFlip().flipNext();
  const flipPrevious = () => bookRef.current?.pageFlip().flipPrev();

  return (
    <main className="bg-black text-[hsl(35,90%,90%)] min-h-screen overflow-x-hidden relative z-0">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-[-2]"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dgdobqlq0/image/upload/v1781877038/download_2__upscayl_4x_upscayl-standard-4x_i1wv36.jpg')`,
        }}
      />
      <div className="fixed inset-0 bg-black/50 pointer-events-none z-[-1]" />
      <div className="fixed top-6 left-6 z-[100]">
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="group text-white transition-all duration-500 hover:scale-110 active:scale-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              aria-label="Open Menu"
            >
              <MenuIcon size={32} strokeWidth={1} className="transition-transform duration-500 group-hover:rotate-180" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-none w-full sm:max-w-md overflow-hidden">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <img
              src="https://res.cloudinary.com/dgtcnyvfo/image/upload/f_auto,q_auto,w_1200//ChatGPT_Image_Jul_3_2026_12_56_00_AM_ezfmji.jpg"
              alt="Sidebar"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-start pt-14 gap-8">
              {navigation.map((link) => (
                <a
                  href={link.href}
                  className="font-instrument-serif text-3xl text-black hover:text-[hsl(35,90%,70%)] transition-all duration-300 tracking-[0.2em] hover:scale-110 drop-shadow-lg"
                  key={link.name}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-white/5">
        <div
          className="hidden lg:block absolute inset-0 bg-cover bg-[center_20%]"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dgdobqlq0/image/upload/v1781301254/download_3__upscayl_4x_upscayl-standard-4x_qg64cb_1_yzzii5.jpg')`,
            filter: 'brightness(0.35)',
          }}
        />
        <div
          className="hidden md:block lg:hidden absolute inset-0 bg-cover bg-[center_20%]"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dgdobqlq0/image/upload/v1781301254/download_3__upscayl_4x_upscayl-standard-4x_qg64cb_1_yzzii5.jpg')`,
            filter: 'brightness(0.35)',
          }}
        />
        <div
          className="block md:hidden absolute inset-0 bg-cover bg-[center_20%]"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dgdobqlq0/image/upload/v1781301254/download_3__upscayl_4x_upscayl-standard-4x_qg64cb_1_yzzii5.jpg')`,
            filter: 'brightness(0.35)',
          }}
        />
        <div className="relative z-10 text-center mt-12">
          <h1 className="font-lavishly text-white leading-none drop-shadow-2xl flex justify-center" style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)' }}>
            {'Our Menu'.split('').map((character, index) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: index * 0.15 }}
                key={index}
              >
                {character === ' ' ? '\u00a0' : character}
              </motion.span>
            ))}
          </h1>
          <motion.div
            className="mx-auto mt-4 h-px bg-[hsl(35,90%,70%)]"
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 1, delay: 1.5 }}
          />
        </div>
      </section>

      <section className="py-12 md:py-24 flex flex-col items-center justify-center relative w-full">
        <div className={`w-full flex items-center justify-center relative z-10 ${isPortrait ? '' : 'px-3'}`}>
          <HTMLFlipBook
            width={bookWidth}
            height={bookHeight}
            size="fixed"
            minWidth={315}
            maxWidth={isPortrait ? 2000 : 1000}
            minHeight={400}
            maxHeight={isPortrait ? 3000 : 1200}
            maxShadowOpacity={0.8}
            showCover={false}
            mobileScrollSupport
            usePortrait={isPortrait}
            className={isPortrait
              ? 'menu-flipbook shadow-[0_10px_40px_rgba(0,0,0,0.8)]'
              : 'menu-flipbook shadow-[0_20px_50px_rgba(0,0,0,0.8)]'}
            ref={bookRef}
            key={isPortrait ? 'single-page' : 'double-page'}
          >
            {Uj.map((imageUrl, index) => (
              <div
                className={isPortrait
                  ? 'demoPage overflow-hidden relative w-full h-full bg-transparent'
                  : 'demoPage bg-[#100e0c] overflow-hidden relative border border-[#25201c]'}
                key={index}
              >
                <img
                  src={imageUrl}
                  alt={`Menu Page ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-contain pointer-events-none"
                />
                {index === 0 && (
                  <>
                    <div className="menu-cover-brand menu-cover-brand--plaque" aria-hidden="true">
                      MY JUNGLEE CAFE
                    </div>
                    <div className="menu-cover-brand menu-cover-brand--photo" aria-hidden="true">
                      My Junglee Cafe
                    </div>
                  </>
                )}
              </div>
            ))}
          </HTMLFlipBook>
        </div>
        <div className="mt-12 flex justify-center gap-8 items-center z-10">
          <button
            onClick={flipPrevious}
            className="p-4 rounded-full bg-[hsl(25,25%,15%)] hover:bg-[hsl(35,90%,70%)] hover:text-black transition-colors shadow-[0_4px_15px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-auto group"
            aria-label="Previous Page"
          >
            <ChevronLeft className="text-white/70 group-hover:text-black transition-colors" size={28} />
          </button>
          <button
            onClick={flipNext}
            className="p-4 rounded-full bg-[hsl(25,25%,15%)] hover:bg-[hsl(35,90%,70%)] hover:text-black transition-colors shadow-[0_4px_15px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-auto group"
            aria-label="Next Page"
          >
            <ChevronRight className="text-white/70 group-hover:text-black transition-colors" size={28} />
          </button>
        </div>
      </section>

      <footer className="w-full bg-[#0a0a0a] py-8 text-center border-t border-white/10 relative z-20">
        <p className="font-cinzel text-[#D4AF37]/80 text-[10px] tracking-[0.3em] font-bold uppercase">
          © 2026 My Junglee Cafe. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
