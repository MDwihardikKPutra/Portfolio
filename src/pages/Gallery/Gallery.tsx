
import { motion } from "framer-motion";

export const Gallery = ({ isHome = false }: { t: any; isDarkMode: boolean; isHome?: boolean }) => {
  const displayPhotos = galleryPhotos;

  // content for the 8 photos (4 columns x 2 photos each)
  const galleryContent = [
    { title: "Reality Club", desc: "I'm in love not because I want to. She's become something that I got to see" },
    { title: "Urban Silence", desc: "Capturing the stillness between the rush of city life." },
    { title: "Industrial Fade", desc: "Where steel meets the soft light of golden hour." },
    { title: "Concrete Dreams", desc: "The geometric patterns found in brutalist structures." },
    { title: "Nocturnal", desc: "A deep dive into the neon-lit alleys of the midnight district." },
    { title: "Fading Memory", desc: "The textures of old walls and forgotten stories." },
    { title: "Horizon Shift", desc: "Exploring the boundary between the sea and the sky." },
    { title: "Eternal Echo", desc: "The resonance of sound in abandoned architectural spaces." },
  ];

  return (
    <div id="gallery" className="w-full h-full bg-white text-black flex flex-col overflow-hidden">
      {/* Header - Simplified */}
      <div className="px-8 md:px-20 lg:px-32 pt-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-4xl font-black tracking-tighter leading-none text-black">Visual Archive</h2>
          </div>
        </div>
      </div>

      {/* Article Content - Static Single Screen Spread */}
      <div className="flex-1 w-full overflow-hidden px-8 md:px-20 lg:px-32 py-6">
        <div className="flex flex-col md:flex-row gap-8 h-full items-start">
          
          {/* Main Editorial Columns - Fixed to 4 to fit the screen */}
          {[0, 1, 2, 3].map((colIndex) => (
            <div key={colIndex} className="flex-1 flex flex-col gap-5 border-r border-black/5 pr-8 last:border-0 h-full overflow-hidden">
              <div className="space-y-5">
                
                {/* Photo 1 in Column */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="w-full aspect-[16/10] bg-gray-100 overflow-hidden"
                  >
                    <img src={displayPhotos[(colIndex * 2) % displayPhotos.length]} className="w-full h-full object-cover transition-all duration-700" />
                  </motion.div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-black">
                      {galleryContent[colIndex * 2].title}
                    </p>
                    <p className="text-[10px] leading-relaxed font-medium text-black/60">
                      {galleryContent[colIndex * 2].desc}
                    </p>
                  </div>
                </div>

                {/* Photo 2 in Column */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="w-full aspect-[16/10] bg-gray-100 overflow-hidden"
                  >
                    <img src={displayPhotos[(colIndex * 2 + 1) % displayPhotos.length]} className="w-full h-full object-cover transition-all duration-700" />
                  </motion.div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-black">
                      {galleryContent[colIndex * 2 + 1].title}
                    </p>
                    <p className="text-[10px] leading-relaxed font-medium text-black/60">
                      {galleryContent[colIndex * 2 + 1].desc}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

import { galleryPhotos } from "../../utils/preloadImages";
