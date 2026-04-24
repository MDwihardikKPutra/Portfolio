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
  "/wasnevermeant.png",
];

// Project thumbnail images for instant grid rendering
export const projectImages = [
  "/Gallery/Archi-Studio/preview-1.png",
  "/Gallery/Archi-Studio/preview-2.png",
  "/Gallery/SmartFinance/1-smartfinance.png",
  "/Gallery/SmartFinance/2-smartfinance.png",
  "/Gallery/Oceanus.png",
  "/Gallery/HRIS/1-hris.png",
  "/Gallery/HRIS/2-hris.png",
  "/pge-hero.png",
  "/pge-project.png",
  "/pge-aboutus.png",
  "/Web-PGE-System.png",
  "/Gallery/Scaleup.png",
  "/Gallery/brewhouse.png",
];

// Internal optimization: Single-pass execution for all preloading types
const executePreload = (srcArray: string[]): Promise<void[]> => {
  const promises = srcArray.map((src) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve anyway on error to not block
      img.src = src;

      // Link-level hint (Low priority)
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  });

  return Promise.all(promises);
};

export const preloadGalleryImages = () => {
  return executePreload(galleryPhotos);
};

export const preloadHomeImages = () => {
  return executePreload(homeImages);
};

/**
 * Preloads all critical assets and returns a promise that resolves when complete.
 */
export const preloadAll = async () => {
  await Promise.all([
    preloadGalleryImages(),
    preloadHomeImages(),
    executePreload(projectImages),
  ]);
};

