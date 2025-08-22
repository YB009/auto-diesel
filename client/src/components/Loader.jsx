// client/src/components/Loader.jsx
import React, {
    useEffect,
    useMemo,
    useState,
    useCallback,
    useRef,
  } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  
  export default function Loader({ onDone = () => {} }) {
    const [show, setShow] = useState(true);
    const [exitNow, setExitNow] = useState(false);
  
    // touch tracking for swipe-to-dismiss
    const touchStartY = useRef(null);
    const dismissedByScroll = useRef(false);
  
    // Must match your Navbar height (h-16 => 64px)
    const NAV_HEIGHT = 64;
  
    // How far the center block moves up to “dock” into the navbar
    const targetY = useMemo(() => {
      if (typeof window === "undefined") return -240;
      return -Math.max(0, window.innerHeight / 2 - NAV_HEIGHT / 2 - 8);
    }, []);
  
    // Lock page scroll while overlay is active
    useEffect(() => {
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prev || "auto";
      };
    }, []);
  
    const beginExit = useCallback(() => {
      if (exitNow) return;
      setExitNow(true);
    }, [exitNow]);
  
    // Click / tap / key press continue
    const handlePointer = useCallback(() => beginExit(), [beginExit]);
    useEffect(() => {
      const onKey = (e) => {
        if (["Shift", "Control", "Alt", "Meta"].includes(e.key)) return;
        beginExit();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [beginExit]);
  
    // --- Scroll to dismiss (wheel/trackpad) ---
    useEffect(() => {
      const onWheel = (e) => {
        // Prevent the page from scrolling underneath while loader is active
        e.preventDefault();
        if (!dismissedByScroll.current) {
          dismissedByScroll.current = true;
          beginExit();
        }
      };
      // passive:false so we can preventDefault()
      window.addEventListener("wheel", onWheel, { passive: false });
      return () => window.removeEventListener("wheel", onWheel);
    }, [beginExit]);
  
    // --- Touch swipe to dismiss ---
    const onTouchStart = (e) => {
      touchStartY.current = e.touches?.[0]?.clientY ?? null;
    };
    const onTouchMove = (e) => {
      // Stop page scroll while overlay is active
      e.preventDefault();
      if (touchStartY.current == null) return;
      const dy = (e.touches?.[0]?.clientY ?? 0) - touchStartY.current;
      // any meaningful swipe up/down
      if (Math.abs(dy) > 18) {
        beginExit();
        touchStartY.current = null;
      }
    };
  
    // After the fly-up completes, fade out and notify parent
    const handleFlyComplete = () => {
      setShow(false);
      const t = setTimeout(() => onDone(), 350);
      return () => clearTimeout(t);
    };
  
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-50 bg-white flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onMouseDown={handlePointer}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
          >
            {/* soft gradient backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_0%,#E6F5FF,transparent_60%)] pointer-events-none" />
  
            {/* Centered stack that will fly upward into the navbar */}
            <motion.div
              className="text-center select-none"
              initial={{ y: 0, scale: 1 }}
              animate={exitNow ? { y: targetY, scale: 0.8 } : { y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() => exitNow && handleFlyComplete()}
            >
              {/* BIG title */}
              <motion.h1
                className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-black tracking-tight text-slate-900"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Auto Diesel
              </motion.h1>
  
              {/* Hint text */}
              {!exitNow && (
                <motion.div
                  className="mt-8 text-slate-500 text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  Click / Tap / Press any key / scroll to continue
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
  