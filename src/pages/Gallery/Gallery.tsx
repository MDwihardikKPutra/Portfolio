
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
    <div className="w-full bg-white text-black flex flex-col">
      {/* Header - Simplified */}
      <div className="px-4 md:px-20 lg:px-32 pt-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="text-4xl font-black tracking-tighter leading-none text-black">Visual Archive</h2>
          </div>
        </div>
      </div>

      {/* Article Content - Responsive Grid */}
      <div className="w-full px-4 md:px-20 lg:px-32 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 items-start">
          
          {/* Main Editorial Columns */}
          {[0, 1, 2, 3].map((colIndex) => (
            <div key={colIndex} className="flex flex-col gap-10 md:gap-8 border-b md:border-b-0 md:border-r border-black/5 pb-10 md:pb-0 md:pr-8 last:border-0 last:pb-0">
              <div className="space-y-10 md:space-y-8">
                
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
