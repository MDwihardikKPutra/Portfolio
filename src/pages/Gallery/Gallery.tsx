
import { motion } from "framer-motion";
import { BackToConstellation } from "../../components/Navigation/BackToConstellation";
import { galleryPhotos } from "../../utils/preloadImages";


export const Gallery = ({ }: { t: any; isDarkMode: boolean }) => {
  return (

    <div id="gallery" className="w-full bg-white text-black font-['Plus_Jakarta_Sans'] selection:bg-black selection:text-white overflow-y-auto overflow-x-hidden no-scrollbar snap-y snap-mandatory h-[1080px]">

      {/* Absolute Back Button (UX) */}
      <div className="fixed top-6 left-6 z-[200] scale-90 origin-top-left opacity-30 hover:opacity-100 transition-opacity">
         <BackToConstellation isDark={false} />
      </div>

      {/* SECTION 1: VISUAL ARCHIVE INTRO */}
      <section id="exhibitions" className="w-full h-[1080px] flex flex-col px-10 md:px-24 pt-12 md:py-20 flex-shrink-0 snap-start overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col h-full w-full"
        >
          <div className="flex justify-between items-end w-full mb-6 md:mb-8 mt-auto">
              <nav className="hidden lg:flex gap-10 text-[18px] font-medium tracking-tight text-black items-center">
                <span onClick={() => document.getElementById('exhibitions')?.scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer hover:text-black transition-colors">Exhibitions</span>
                <span onClick={() => document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer hover:text-black transition-colors">Archive</span>
                <span onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer hover:text-black transition-colors">Collection</span>
                <span onClick={() => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer hover:text-black transition-colors">Connect</span>
              </nav>

              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10vw] md:text-[8.5rem] leading-[0.8] font-medium tracking-[-0.05em] text-black text-right"
              >
                Visual Archive
              </motion.h1>
          </div>

          <motion.hr 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="border-black border-t-[1.5px] w-full mb-8 md:mb-10 flex-shrink-0 origin-left" 
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 md:mb-16 flex-shrink-0 items-start">
              <div className="md:col-span-12 flex flex-col items-end gap-8 text-right">
                  <motion.p 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-[18px] leading-[1.4] font-normal text-black max-w-xl text-right"
                  >
                    We champion emerging and mid-career artists working in diverse media, curating exhibitions that challenge, engage, and shape contemporary perspectives.
                  </motion.p>
              </div>
          </div>

          <div className="w-full overflow-hidden pb-20 mt-auto flex-shrink-0">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="flex items-end w-fit"
            >
              {[...galleryPhotos.slice(0, 6), ...galleryPhotos.slice(0, 6)].map((photo, i) => {
                const ratios = [
                  { w: "315px", h: "210px" },
                  { w: "224px", h: "385px" },
                  { w: "385px", h: "245px" },
                  { w: "280px", h: "196px" },
                  { w: "280px", h: "196px" },
                  { w: "364px", h: "280px" }
                ];
                const size = ratios[i % ratios.length];
                return (
                  <div key={i} className="flex-shrink-0 pr-16">
                    <div className="overflow-hidden" style={{ width: size.w, height: `min(${size.h}, 30vh)` }}>
                      <img src={photo} className="w-full h-full object-cover select-none" />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: PHOTOGRAPHER PROFILE (NEWSPAPER LAYOUT) */}
      <section id="archive" className="w-full h-fit min-h-[1080px] bg-white flex flex-col px-10 md:px-24 py-24 pb-32 flex-shrink-0 snap-start overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col h-full w-full"
          >
            <div className="flex gap-12 items-start border-b-2 border-black pb-6 mb-10">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="w-36 h-36 flex-shrink-0 grayscale">
                    <img src="/wasnevermeant.png" className="w-full h-full object-cover" />
                </motion.div>
                <div className="flex-1 flex flex-col justify-between h-36">
                    <div className="flex flex-col gap-1">
                        <span className="text-[13px] uppercase tracking-[0.5em] font-bold">Special Edition Archive — Vol. 04</span>
                        <h2 className="text-[4rem] md:text-[6rem] leading-[0.75] font-medium tracking-[-0.06em] uppercase">Dyko Putra.</h2>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                        <span className="text-[11px] uppercase font-bold tracking-widest text-black">Visual Artist & Architect</span>
                        <span className="text-[11px] uppercase font-bold tracking-widest text-black">Based in Indonesia — 2026 Edition</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pt-2 items-stretch h-full overflow-hidden">
                {/* Column 1 */}
                <div className="flex flex-col h-full pb-2">
                    <div className="flex flex-col gap-2 h-full">
                        <p className="text-[14px] leading-[1.8] text-black font-normal text-justify">
                          <span className="text-[3rem] float-left leading-[0.8] pr-4 font-medium">I</span>n the pursuit of visual truth, the archivist must shed the burden of the spectacular. We find ourselves at the intersection of geometry and memory, where the silent dialogue of structures speaks louder than the noise of the contemporary world. This archive is not merely a collection of frames, but a rigorous study in the ethics of observation.
                        </p>
                        <p className="text-[14px] leading-[1.8] text-black font-normal text-justify">
                          The physics of luminosity plays a critical role in our perception of volume. When we observe a concrete surface at dawn, the grazing light reveals a topography of imperfections that tell the story of its casting. These are the details that the archive seeks to immortalize, capturing the raw essence of materials before they are consumed by the visual clutter of the modern age. Every shadow is a calculation, every highlight a revelation of structural integrity.
                        </p>

                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 1.2 }}
                          className="mt-auto w-full h-[160px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000"
                        >
                          <img src={galleryPhotos[3 % galleryPhotos.length]} className="w-full h-full object-cover" />
                        </motion.div>
                    </div>
                </div>
                
                {/* Column 2 */}
                <div className="flex flex-col h-full pb-2">
                    <div className="flex flex-col gap-2 h-full">
                        <p className="text-[14px] leading-[1.8] text-black font-normal text-justify">
                          The architect’s vision is often lost in the utility of the build. Here, we reclaim the purpose of form. By stripping away the superfluous, we reveal the inherent beauty of the structural skeleton. Each photograph is a study in honesty—where materials speak for themselves without the need for adornment. This is a manifesto for the silent.
                        </p>
                        <p className="text-[14px] leading-[1.8] text-black font-normal text-justify">
                          Anthropogenic structures are the most honest reflections of our collective ambition. A highway overpass, a brutalist facade, or a simple steel beam—each is a testament to the human desire to impose order on a chaotic world. Through this lens, we find poetry in the utilitarian realities of the built environment. We observe the way concrete absorbs the memories of the city, becoming a canvas for the passage of time and the shifting patterns of urban life across every decade of our development.
                        </p>
                        <p className="text-[14px] leading-[1.8] text-black font-normal text-justify italic pt-2">
                          "The eye sees only what the mind is prepared to comprehend." This fundamental truth governs our selection process and the way we interpret the landscapes of the modern era. It is a rigorous practice of looking closer at the structures that we often take for granted in our daily transit through the metropolis.
                        </p>
                    </div>
                </div>

                {/* Column 3 */}
                <div className="flex flex-col h-full border-l border-black pl-12 pb-2">
                    <div className="flex flex-col gap-2 h-full">
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 1.2 }}
                          className="w-full h-[160px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 mb-4"
                        >
                          <img src={galleryPhotos[10 % galleryPhotos.length]} className="w-full h-full object-cover" />
                        </motion.div>
                        <p className="text-[14px] leading-[1.8] text-black font-normal text-justify">
                          Geometric permanence is not a static state, but a dynamic relationship with light. As the sun moves, the structure changes. A building that is silent at noon may cry out in the long shadows of the afternoon. 
                        </p>
                        <p className="text-[14px] leading-[1.8] text-black font-normal text-justify pt-2">
                          The intersection of the organic and the inorganic creates a unique narrative tension, a battle between two different timelines—one biological and rapid, the other structural and slow. This is where we find the soul of the place, in the quiet collision of the natural world and the rigid lines of human design. We capture the moments where the shadow of a tree dances across a glass facade, a brief and beautiful reconciliation of two opposite forces that define our modern reality.
                        </p>
                    </div>
                </div>

                {/* Column 4 */}
                <div className="flex flex-col h-full pb-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-[14px] leading-[1.7] text-black font-normal text-justify">
                          The archive is a living document. It evolves with the observer. As we move through these chapters, notice the recurring motif of silence. Silicon, concrete, and glass—materials of our age—become characters in a play of light and shadow, telling stories of a future written in the very foundations of our cities.
                        </p>
                        <p className="text-[14px] leading-[1.7] text-black font-normal text-justify">
                           We are witnessing the birth of a new visual era, one where the digital and the physical are in constant dialogue. The archive acts as the bridge, capturing the tangible soul of the intangible image. It is a commitment to the permanence of the image in an increasingly ephemeral world, ensuring that the structural beauty of our era is preserved for those who see beyond the surface and into the intent of the builder.
                        </p>
                    </div>
                    <div className="mt-auto flex flex-col gap-4">
                        <span className="text-[12px] uppercase font-black tracking-tighter text-[2rem] leading-none">THE<br />ARCHIVE.</span>
                        <p className="text-[11px] leading-[1.4] opacity-100">
                          Copyright 2026 © Dyko Putra Visuals. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
          </motion.div>
      </section>

      {/* SECTION 3: EDITORIAL ARTICLE */}
      <section id="collection" className="w-full h-[1080px] bg-white flex flex-col justify-center px-10 md:px-24 py-24 flex-shrink-0 snap-start border-t-[1px] border-black overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-24 items-center"
          >
              <div className="md:col-span-4 flex flex-col justify-center">
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.2 }} className="w-full h-[65vh] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                    <img src={galleryPhotos[8 % galleryPhotos.length]} className="w-full h-full object-cover" />
                  </motion.div>
              </div>
              <div className="md:col-span-8 flex flex-col gap-20 items-start">
                  <div className="max-w-[1050px] w-full flex flex-col gap-16">
                      <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-[3rem] md:text-[5.4rem] leading-[0.9] font-medium tracking-[-0.04em] w-full"
                      >
                        Defining the Architectural Language of Tomorrow.
                      </motion.h2>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full pt-4 border-t border-black/10"
                      >
                          <div className="flex flex-col gap-6">
                            <p className="text-[17px] leading-[1.6] font-normal text-black text-justify">
                              Within the silence of these structures lies a deep narrative of permanence and transition. We observe how light interacts with raw concrete, creating a dance of shadows.
                            </p>
                          </div>
                          <div className="flex flex-col gap-6">
                            <p className="text-[17px] leading-[1.6] font-normal text-black text-justify">
                              The archive seeks not just to document, but to interpret. Every angle is a choice, every texture a revelation of the craftsman's intent. In these corridors, the past and future converge.
                            </p>
                          </div>
                          <div className="flex flex-col gap-6">
                            <p className="text-[17px] leading-[1.6] font-normal text-black text-justify border-l border-black pl-10">
                              "Architecture is a visual archive of human thought—a testament to our desire to transcend the limitations of the physical world."
                              <span className="block mt-6 text-[15px] font-medium opacity-100 italic">— Curatorial Note</span>
                            </p>
                          </div>
                      </motion.div>
                  </div>
              </div>
          </motion.div>
      </section>

      {/* SECTION 4: COLLAGE EDITORIAL */}
      <section id="connect" className="w-full h-[1080px] bg-white flex flex-col justify-center px-10 md:px-24 py-24 flex-shrink-0 snap-start border-t-[1px] border-black overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-stretch h-[60vh] w-full"
          >
              <div className="md:col-span-6 grid grid-cols-2 gap-8 h-full">
                  <div className="col-span-1 h-full">
                      <motion.div initial={{ opacity: 0, scale: 1.05 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} className="w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                        <img src={galleryPhotos[0]} className="w-full h-full object-cover" />
                      </motion.div>
                  </div>
                  <div className="col-span-1 flex flex-col gap-8 h-full">
                      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }} className="flex-1 w-full overflow-hidden">
                        <img src={galleryPhotos[2]} className="w-full h-full object-cover" />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4 }} className="flex-1 w-full overflow-hidden">
                        <img src={galleryPhotos[4]} className="w-full h-full object-cover" />
                      </motion.div>
                  </div>
              </div>
              <div className="md:col-span-6 flex flex-col justify-between h-full">
                  <div className="w-full flex flex-col items-start">
                      <motion.h2 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[2.5rem] md:text-[4.7rem] leading-[1.1] font-medium tracking-[-0.04em] w-full text-left"
                      >
                        I'm In Love Not Because I Want To, She's Become Something That I Got To See.
                      </motion.h2>
                  </div>
                  <div className="flex-1" />
                  <div className="w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <motion.p initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-[17px] leading-[1.6] font-normal text-black text-justify">
                            In this collection, we explore the tactile reality of modernism. By stripping away the superfluous, we reveal the inherent beauty of the structural skeleton. Each photograph is a study in honesty—where materials speak for themselves without the need for adornment.
                          </motion.p>
                          <motion.p initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6 }} className="text-[17px] leading-[1.6] font-normal text-black text-justify">
                            This is the archive's core mission: to preserve the moments where design transcends its utility and becomes art. Through these three frames, we witness the silent dialogue between the architect's vision and the relentless passage of time.
                          </motion.p>
                      </div>
                  </div>
              </div>
          </motion.div>
      </section>
    </div>
  );
};
