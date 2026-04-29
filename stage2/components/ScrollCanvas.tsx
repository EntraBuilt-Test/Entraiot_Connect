"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DashboardOverlay from "@/components/DashboardOverlay";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const FRAME_COUNT = 120;

export default function ScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [imagesLoading, setImagesLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Element Refs for Text Animation
  const beatARef = useRef<HTMLDivElement>(null);
  const beatBRef = useRef<HTMLDivElement>(null);
  const beatDRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const loadImages = useCallback(async () => {
    let loaded = 0;
    const loadPromises = Array.from({ length: FRAME_COUNT }).map((_, i) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = `/way/sequence/ezgif-frame-${String(i + 1).padStart(3, '0')}.png`;
        img.onload = () => {
          loaded++;
          setLoadProgress(Math.floor((loaded / FRAME_COUNT) * 100));
          imagesRef.current[i] = img;
          resolve(img);
        };
        img.onerror = () => {
          console.error(`Failed to load frame ${i}`);
          loaded++;
          setLoadProgress(Math.floor((loaded / FRAME_COUNT) * 100));
          resolve(img); // Resolve anyway so it doesn't hang
        };
      });
    });

    await Promise.all(loadPromises);
    setImagesLoading(false);
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];

    if (!canvas || !ctx || !img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Cover logic
    const ctxRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight;
    let offsetX = 0, offsetY = 0;

    if (imgRatio > ctxRatio) {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  useEffect(() => {
    imagesRef.current = new Array(FRAME_COUNT);
    loadImages().then(() => drawFrame(0));
    return () => { imagesRef.current = []; };
  }, [loadImages, drawFrame]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use GSAP to synchronize timeline accurately over scroll
  useGSAP(() => {
    if (imagesLoading) return;

    // Headless proxy object to bind 0-119 value
    const playhead = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth dampening matching our previous 100 stiffness
      }
    });

    // Animate Frames
    tl.to(playhead, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      duration: 1, // The entire timeline acts as 1 full unit of "progress"
      onUpdate: () => drawFrame(playhead.frame)
    }, 0);

    // Scroll Indicator Hide (0 -> 10%)
    tl.to(indicatorRef.current, { opacity: 0, duration: 0.1, ease: "none" }, 0);

    // Beat A (0-20%) -> Fade in 0-5%, Holds 5-15%, Fades out 15-20%
    tl.fromTo(beatARef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05, ease: "power1.out" }, 0);
    tl.to(beatARef.current, { opacity: 0, y: -20, duration: 0.05, ease: "power1.inOut" }, 0.15);

    // Beat B (Dashboard on Left Side, visible initially, fades out on scroll)
    tl.to(beatBRef.current, { opacity: 0, x: -20, duration: 0.05, ease: "power1.inOut" }, 0);

    // Beat D Button (75-95%)
    tl.fromTo(beatDRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05, ease: "power1.out" }, 0.75);
    tl.to(beatDRef.current, { opacity: 0, y: -20, duration: 0.05, ease: "power1.inOut" }, 0.90);

  }, { dependencies: [imagesLoading, drawFrame], scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[1600vh] bg-[#050505]">
      {imagesLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <div className="text-white/60 text-sm uppercase tracking-widest mb-4 font-medium">Loading Experience</div>
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out" 
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
        
        {/* Scroll Indicator */}
        <div 
          ref={indicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-3 font-medium">Scroll to Explore</div>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="sticky top-0 h-screen w-full">
          {/* Beat A */}
          <div 
            ref={beatARef}
            className="absolute inset-0 flex items-center justify-center text-center px-4 opacity-0"
          >
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white/90 drop-shadow-lg mb-6">
                ENTRAIOT SOLUTION
              </h1>
              <p className="text-xl md:text-2xl text-white/60 font-light tracking-tight">
                Empowering innovation through AI, IoT, and intelligent solutions — that’s EntraIoT.
              </p>
            </div>
          </div>

          {/* Beat B (Dashboard on left side) */}
          <div 
            ref={beatBRef}
            className="absolute left-[5vw] top-1/2 -translate-y-1/2 opacity-100 pointer-events-auto z-[60]"
          >
            <DashboardOverlay />
          </div>

          {/* Beat D (Button only) */}
          <div 
            ref={beatDRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0"
          >
            <div className="max-w-3xl flex flex-col items-center">
              <button 
                onClick={() => window.location.href = '/buildings'}
                className="pointer-events-auto bg-white text-[#050505] px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Continue to 3D Buildings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
