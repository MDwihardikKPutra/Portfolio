// Preload gallery images
export const galleryPhotos = [
  "/Gallery/Photography/imgi_440_2f7c22177718225.658c4f9026390.jpg",
  "/Gallery/Photography/imgi_489_f2245c177718225.666eade4ca4bf.png",
  "/Gallery/Photography/imgi_498_b94f29177718225.666eade4c8cca.png",
  "/Gallery/Photography/imgi_516_e1f17b177718225.666eade4c87cd.png",
  "/Gallery/Photography/imgi_588_313050177718225.666eade7d4dd0.png",
  "/Gallery/Photography/imgi_624_c56c26177718225.666eadea3d400.png",
  "/Gallery/Photography/imgi_651_5c8cc4177718225.67e0fca615e09.jpg",
  "/Gallery/Photography/imgi_691_b98968177718225.67e0fca617465.jpg",
  "/Gallery/Photography/imgi_983_ff56d9177718225.658c4f8f3f7ae.jpg",
];

// Home page images
export const homeImages = [
  "/profile.jpg",
];

// Internal optimization: Single-pass execution for all preloading types using Idle periods
const executePreload = (srcArray: string[]) => {
  const preload = () => {
    srcArray.forEach((src) => {
      // Background loading via Image object
      const img = new Image();
      img.src = src;

      // Link-level hint (Low priority)
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  };

  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(preload);
  } else {
    setTimeout(preload, 1000); // Standard fallback
  }
};

export const preloadGalleryImages = () => {
  executePreload(galleryPhotos);
};

export const preloadHomeImages = () => {
  executePreload(homeImages);
};

