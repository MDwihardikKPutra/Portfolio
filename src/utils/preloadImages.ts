// Preload gallery images
export const galleryPhotos = [
  "/Gallery/imgi_440_2f7c22177718225.658c4f9026390.jpg",
  "/Gallery/imgi_489_f2245c177718225.666eade4ca4bf.png",
  "/Gallery/imgi_498_b94f29177718225.666eade4c8cca.png",
  "/Gallery/imgi_516_e1f17b177718225.666eade4c87cd.png",
  "/Gallery/imgi_588_313050177718225.666eade7d4dd0.png",
  "/Gallery/imgi_624_c56c26177718225.666eadea3d400.png",
  "/Gallery/imgi_651_5c8cc4177718225.67e0fca615e09.jpg",
  "/Gallery/imgi_691_b98968177718225.67e0fca617465.jpg",
  "/Gallery/imgi_983_ff56d9177718225.658c4f8f3f7ae.jpg",
];

export const preloadGalleryImages = () => {
  // Preload using link tags for browser optimization
  galleryPhotos.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });

  // Also preload using Image objects to ensure images are actually loaded
  galleryPhotos.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

