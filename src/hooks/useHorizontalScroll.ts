import { useEffect, useState, RefObject } from "react";
import Lenis from "lenis";

export const useHorizontalScroll = (ref: RefObject<HTMLDivElement>, centerOnMount: boolean = false) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initialize Lenis for buttery-smooth kinetic tracking
    const lenis = new Lenis({
      wrapper: el,
      content: el.firstElementChild as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'horizontal',
      gestureOrientation: 'both',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      lerp: 0.1,
      infinite: true,
    });
    
    setLenisInstance(lenis);

    if (centerOnMount) {
      setTimeout(() => {
        const centerPos = (el.scrollWidth - window.innerWidth) / 2;
        lenis.scrollTo(centerPos, { immediate: true });
      }, 50);
    }

    let snapTimeout: NodeJS.Timeout;

    lenis.on('scroll', (e: any) => {
      // Always reset the timer dynamically while kinetic interaction is alive
      clearTimeout(snapTimeout);

      // Trigger soft organic gravity only after momentum falls dormant
      if (Math.abs(e.velocity) < 0.1) {
        snapTimeout = setTimeout(() => {
          const wrapperHtml = el.firstElementChild as HTMLElement;
          if (!wrapperHtml) return;
          
          const children = Array.from(wrapperHtml.children) as HTMLElement[];
          let closestChild: HTMLElement | null = null;
          let minDistance = Infinity;

          const screenCenter = window.innerWidth / 2;
          let closestChildCenter = 0;

          children.forEach(child => {
            const rect = child.getBoundingClientRect();
            const childCenter = rect.left + rect.width / 2;
            const dist = Math.abs(childCenter - screenCenter);

            if (dist < minDistance) {
              minDistance = dist;
              closestChild = child;
              closestChildCenter = childCenter;
            }
          });

          // Soft snap glide — absolutely no 'force: true' locks.
          // This allows user interaction to gracefully bypass or interrupt the snap.
          if (closestChild && minDistance > 2) {
             const offsetDelta = closestChildCenter - screenCenter;
             const exactTargetScroll = lenis.scroll + offsetDelta;
             
             lenis.scrollTo(exactTargetScroll, { 
               duration: 0.8, // Elegant, smooth settling speed
               easing: (t) => 1 - Math.pow(1 - t, 4) // Quartic organic curve
             });
          }
        }, 150); // Patience window ensures we don't accidentally intercept the user's trailing momentum
      }
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
  }, [ref, centerOnMount]);

  return {
    scrollToOffset: (delta: number) => {
      if (lenisInstance) {
        lenisInstance.scrollTo(lenisInstance.scroll + delta, { 
          duration: 1.2, 
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
        });
      }
    }
  };
};
