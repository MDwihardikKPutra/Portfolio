import { useEffect, RefObject } from "react";
import Lenis from "lenis";

export const useHorizontalScroll = (ref: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initialize Lenis for horizontal scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium ease-out
      orientation: 'horizontal',
      gestureOrientation: 'both', // Maps vertical swipe to horizontal
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    function onScroll() {
      // Synchronize Lenis position with element scroll
      el.scrollLeft = lenis.scroll;
    }

    lenis.on('scroll', onScroll);

    function onWheel(e: WheelEvent) {
      // Map vertical wheel to horizontal scroll
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      lenis.scrollTo(lenis.scroll + delta, { immediate: false });
      
      // Stop native scroll behavior to let Lenis handle it
      e.preventDefault();
    }

    function animate(time: number) {
      lenis.raf(time);
      requestAnimationFrame(animate);
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    const rafId = requestAnimationFrame(animate);

    return () => {
      lenis.destroy();
      el.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(rafId);
    };
  }, [ref]);
};
