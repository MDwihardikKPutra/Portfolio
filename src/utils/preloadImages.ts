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
  "/Hero/5.png",
  "/wasnevermeant.png",
];

// Project thumbnail images
export const projectImages = [
  "/Gallery/Archi-Studio/preview-1.png",
  "/Gallery/SmartFinance/1-smartfinance.png",
  "/Gallery/Oceanus.png",
  "/pge-hero.png",
];

const chunkedPreload = async (srcArray: string[], chunkSize: number = 2) => {
  for (let i = 0; i < srcArray.length; i += chunkSize) {
    const chunk = srcArray.slice(i, i + chunkSize);
    await Promise.all(
      chunk.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          if ('decode' in img) {
            img.decode().then(() => resolve()).catch(() => resolve());
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        });
      })
    );
  }
};

/**
 * Preloads all assets across all pages. 
 * Chunked processing ensures main thread stability.
 */
export const preloadAll = async () => {
  await chunkedPreload(homeImages, 2);
  await chunkedPreload(projectImages, 2);
  await chunkedPreload(galleryPhotos, 2);
};
