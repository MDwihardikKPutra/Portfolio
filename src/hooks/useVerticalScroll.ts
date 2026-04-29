import { useEffect, RefObject } from "react";
import Lenis from "lenis";

export const useVerticalScroll = (ref: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initialize Lenis for vertical scrolling
    const lenis = new Lenis({
      wrapper: el,
      content: el.firstElementChild as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    function animate(time: number) {
      lenis.raf(time);
      requestAnimationFrame(animate);
    }

    const rafId = requestAnimationFrame(animate);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [ref]);
};
