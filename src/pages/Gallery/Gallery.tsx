import { memo } from "react";
import { galleryPhotos } from "../../utils/preloadImages";

export const Gallery = memo(() => {
  const displayPhotos = galleryPhotos;

  return (
    <div className="w-full flex flex-col gap-0">
      
      {/* Section 1: 2 Columns - Full Padat */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="aspect-[4/3] overflow-hidden">
          <img src={displayPhotos[0]} alt="G1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms]" />
        </div>
        <div className="aspect-[4/3] overflow-hidden">
          <img src={displayPhotos[1]} alt="G2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms]" />
        </div>
      </div>

      {/* Section 2: 3 Columns - Full Padat */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0">
        <div className="aspect-square overflow-hidden">
          <img src={displayPhotos[2]} alt="G3" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[3000ms]" />
        </div>
        <div className="aspect-square overflow-hidden">
          <img src={displayPhotos[3]} alt="G4" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[3000ms]" />
        </div>
        <div className="aspect-square overflow-hidden">
          <img src={displayPhotos[4]} alt="G5" className="w-full h-full object-cover hover:scale-110 transition-transform duration-[3000ms]" />
        </div>
      </div>

      {/* Section 3: 4 Columns - Full Padat */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-0">
        <div className="aspect-[3/4] overflow-hidden">
          <img src={displayPhotos[5]} alt="G6" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-[3/4] overflow-hidden">
          <img src={displayPhotos[6]} alt="G7" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-[3/4] overflow-hidden">
          <img src={displayPhotos[7]} alt="G8" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-[3/4] overflow-hidden">
          <img src={displayPhotos[8]} alt="G9" className="w-full h-full object-cover" />
        </div>
      </div>

    </div>
  );
});
