import * as React from "react";

export type CarouselApi = {
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
  selectedScrollSnap: () => number;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  on: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
};

interface CarouselProps {
  setApi?: (api: CarouselApi) => void;
  children: React.ReactNode;
  opts?: any;
}

const CarouselContext = React.createContext<{
  containerRef: React.RefObject<HTMLDivElement>;
  api: CarouselApi | null;
} | null>(null);

export const Carousel: React.FC<CarouselProps> = ({ setApi, children }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listenersRef = React.useRef<Set<() => void>>(new Set());

  const getScrollState = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return { prev: false, next: false, index: 0 };
    
    const items = Array.from(el.children[0]?.children || []) as HTMLElement[];
    if (items.length === 0) return { prev: false, next: false, index: 0 };

    const scrollLeft = el.scrollLeft;
    const scrollWidth = el.scrollWidth;
    const clientWidth = el.clientWidth;

    let closestIndex = 0;
    let minDiff = Infinity;
    items.forEach((item, index) => {
      const diff = Math.abs(item.offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    const prev = scrollLeft > 10;
    const next = scrollLeft < scrollWidth - clientWidth - 10;

    return { prev, next, index: closestIndex };
  }, []);

  const triggerListeners = React.useCallback(() => {
    listenersRef.current.forEach((cb) => cb());
  }, []);

  const api: CarouselApi = React.useMemo(() => {
    return {
      canScrollPrev: () => {
        const { prev } = getScrollState();
        return prev;
      },
      canScrollNext: () => {
        const { next } = getScrollState();
        return next;
      },
      selectedScrollSnap: () => {
        const { index } = getScrollState();
        return index;
      },
      scrollPrev: () => {
        const el = containerRef.current;
        if (!el) return;
        const items = Array.from(el.children[0]?.children || []) as HTMLElement[];
        const { index } = getScrollState();
        const prevIndex = Math.max(0, index - 1);
        const target = items[prevIndex];
        if (target) {
          el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
        }
      },
      scrollNext: () => {
        const el = containerRef.current;
        if (!el) return;
        const items = Array.from(el.children[0]?.children || []) as HTMLElement[];
        const { index } = getScrollState();
        const nextIndex = Math.min(items.length - 1, index + 1);
        const target = items[nextIndex];
        if (target) {
          el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
        }
      },
      scrollTo: (index: number) => {
        const el = containerRef.current;
        if (!el) return;
        const items = Array.from(el.children[0]?.children || []) as HTMLElement[];
        const target = items[index];
        if (target) {
          el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
        }
      },
      on: (event: string, callback: () => void) => {
        if (event === "select") {
          listenersRef.current.add(callback);
        }
      },
      off: (event: string, callback: () => void) => {
        if (event === "select") {
          listenersRef.current.delete(callback);
        }
      },
    };
  }, [getScrollState]);

  React.useEffect(() => {
    if (setApi) {
      setApi(api);
    }
  }, [setApi, api]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      triggerListeners();
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    
    // Trigger initial state call
    setTimeout(triggerListeners, 100);

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [triggerListeners]);

  return (
    <CarouselContext.Provider value={{ containerRef, api }}>
      <div className="relative w-full overflow-hidden">{children}</div>
    </CarouselContext.Provider>
  );
};

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("CarouselContent must be used within Carousel");

  return (
    <div
      ref={context.containerRef}
      className={`flex overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth ${className}`}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      {...props}
    >
      <div className="flex flex-row">{children}</div>
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={`shrink-0 snap-start snap-always ${className}`}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";
