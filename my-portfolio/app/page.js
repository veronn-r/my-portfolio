'use client'; 

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// --- CONTENT DATA ---
const DATA = {
  name: "Veron Vincent Rebello",
  role: "Designer",
  location: "Mumbai, India",
  email: "veron.rebello@gmail.com",
  
  // Tools Data
  tools: [
    { name: "Photoshop", url: "/icons/ps.svg" },
    { name: "Illustrator", url: "/icons/ai.svg" },
    { name: "InDesign", url: "/icons/id.svg" },
    { name: "After Effects", url: "/icons/ae.svg" },
    { name: "Premiere Pro", url: "/icons/pr.svg" },
    { name: "DaVinci Resolve", url: "/icons/dr.svg" },
    { name: "Affinity Suite", url: "/icons/af.svg" },
  ],

  // SVAR Section Info
  svar: {
    title: "SVAR Events & Media Network",
    role: "Designer - Magazine Layout and Editorial Design, Pre-Press Production",
    desc: "Designed core article layouts and systems; oversaw final colour proofing and print production."
  },

  // Carousel Slides (The Magazine Covers)
  professional: [
    {
      title: "SVAR - The Voice of Jewellers (August)",
      image: "/work/aug-mag.jpg", 
      link: "https://svarmedia.com/magazine/#aug-2025-mgazine/1/" 
    },
    {
      title: "SVAR - The Voice of Jewellers (September)",
      image: "/work/sep-mag.jpg", 
      link: "https://svarmedia.com/magazine/#vol-5-issue-9/1/" 
    },
    {
      title: "SVAR - The Voice of Jewellers (October)",
      image: "/work/oct-mag.jpg", 
      link: "https://svarmedia.com/magazine/#vol-5-issue-10/1/" 
    },
    {
      title: "SVAR - The Voice of Jewellers (November)",
      image: "/work/nov-mag.jpg", 
      link: "https://svarmedia.com/magazine/#vol-5-issue-11/1/" 
    },
    {
      title: "SVAR - The Voice of Jewellers (December)",
      image: "/work/dec-mag.jpg", 
      link: "https://svarmedia.com/magazine/#vol-5-issue-12/1/" 
    },
  ],

  sections: {
    extracurricular: [
      {
        title: "IMPRINT Magazine",
        role: "Editor-in-Chief",
        desc: "Directed the visual and editorial strategy for a college science publication.",
        year: "2022"
      },
      {
        title: "Infant Jesus Grotto",
        role: "Community Event Lead",
        desc: "Designed collateral and managed event logistics for local community initiatives.",
        year: "2025"
      }
    ],
    personal: [
      {
        title: "Jewellery Motif Research",
        role: "Writer & Researcher",
        desc: "An investigative series exploring historical motifs in traditional jewellery design.",
        year: "Ongoing"
      },
      {
        title: "Fiction Writing",
        role: "Author",
        desc: "Short stories exploring magical realism and fantasy themes.",
        year: "Ongoing"
      }
    ]
  }
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. CAROUSEL AUTOPLAY
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % DATA.professional.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, []);

  // 2. SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % DATA.professional.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? DATA.professional.length - 1 : prev - 1));
  };

  // Helper indices
  const getPrevIndex = () => (currentSlide === 0 ? DATA.professional.length - 1 : currentSlide - 1);
  const getNextIndex = () => (currentSlide + 1) % DATA.professional.length;

  return (
    <div className="min-h-screen font-sans selection:bg-stone-200 overflow-x-hidden">
      
      {/* 1. FIXED HEADER */}
      <header 
        className={`fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b-4 border-stone-900 transition-all duration-500 ease-in-out
          ${isScrolled ? 'h-20 shadow-md' : 'h-[320px] md:h-[300px]'}`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-full flex items-center justify-between relative">
            
            {/* LEFT: OPEN TO WORK (Hidden on Mobile Scroll to save space) */}
            <div className={`transition-all duration-700 hidden md:block ${isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
               <span className="text-xs font-bold tracking-widest uppercase border border-stone-900 px-3 py-2 inline-block cursor-default bg-white">
                  Open to Work
               </span>
            </div>

            {/* CENTER: NAME & ROLE */}
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center w-full transition-all duration-500
               ${isScrolled ? 'w-auto md:w-full' : 'w-full'}`}>
               
               {/* NAME: Smaller Mobile Text (4xl initial -> xl scrolled) */}
               <h1 className={`font-serif font-bold tracking-tight text-stone-900 leading-[0.9] transition-all duration-500 whitespace-nowrap
                  ${isScrolled ? 'text-xl md:text-3xl' : 'text-4xl md:text-8xl'}`}>
                 {DATA.name}
               </h1>

               <div className={`text-stone-500 font-medium tracking-widest uppercase mt-4 text-sm flex gap-2 md:gap-4 transition-all duration-300
                  ${isScrolled ? 'opacity-0 h-0 overflow-hidden mt-0' : 'opacity-100'}`}>
                 <span>{DATA.role}</span>
                 <span className="hidden md:inline">•</span>
                 <span>{DATA.location}</span>
               </div>
               
               {/* INITIAL BUTTONS */}
               <div className={`flex gap-4 mt-6 transition-all duration-300
                  ${isScrolled ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'}`}>
                   <span className="text-xs font-bold tracking-widest uppercase border border-stone-900 px-4 py-3 inline-block cursor-default">
                      Open to Work
                   </span>
                   <a href={`mailto:${DATA.email}`} className="text-xs font-bold tracking-widest uppercase bg-stone-900 text-stone-50 border border-stone-900 px-4 py-3 inline-block hover:bg-stone-700 hover:border-stone-700 transition-colors">
                     Contact Me
                   </a>
               </div>
            </div>

            {/* RIGHT: CONTACT ME */}
            <div className={`transition-all duration-700 ${isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
               <a href={`mailto:${DATA.email}`} className="text-xs font-bold tracking-widest uppercase bg-stone-900 text-stone-50 border border-stone-900 px-3 py-2 inline-block hover:bg-stone-700 hover:border-stone-700 transition-colors">
                 Contact Me
               </a>
            </div>
        </div>
      </header>

      <div className="h-[320px] md:h-[300px]"></div>

      <main className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* 2. COMPETENCIES */}
        <section className="py-12 md:py-16 border-b border-stone-300">
            <h3 className="font-serif text-4xl mb-10 text-center">Competencies</h3>
            <div className="flex flex-nowrap justify-start md:justify-center items-end gap-6 md:gap-16 overflow-x-auto pb-4 md:pb-0 scrollbar-hide w-full">
              {DATA.tools.map((tool, index) => (
                <div key={index} className="flex flex-col items-center justify-center shrink-0 group">
                   <img src={tool.url} alt={tool.name} className="w-10 h-10 md:w-14 md:h-14 object-contain mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300"/>
                   <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 group-hover:text-stone-900 text-center transition-colors duration-300">
                      {tool.name}
                   </span>
                </div>
              ))}
            </div>
        </section>

        {/* 3. PROFESSIONAL WORK (SVAR SECTION) */}
        <section className="py-16 border-b border-stone-300">
          <h3 className="font-serif text-4xl text-center text-stone-900">
            Professional Work
          </h3>

          {/* SHORT FAINT SEPARATOR */}
          <div className="w-24 h-px bg-stone-300 mx-auto my-8"></div>

          {/* SVAR Header Info */}
          <div className="max-w-3xl mx-auto text-center mb-12">
              
              {/* Reduced mb-3 to mb-1 */}
              <h4 className="font-sans font-bold text-1xl md:text-1xl uppercase text-stone-900 mb-1">
                {DATA.svar.title}
              </h4>
              
              {/* Reduced mb-4 to mb-2 */}
              <p className="text-stone-500 text-xs md:text-sm tracking-widest mb-2 leading-relaxed px-4">
                {DATA.svar.role}
              </p>
              
          </div>

          {/* STAGGERED CAROUSEL - ROBUST FOR 5+ ITEMS */}
          <div className="relative max-w-4xl mx-auto h-[400px] md:h-[500px] flex items-center justify-center perspective-1000">
             {DATA.professional.map((project, index) => {
               // 1. Calculate relative indices for circular logic
               const length = DATA.professional.length;
               const isCenter = index === currentSlide;
               const isPrev = index === (currentSlide - 1 + length) % length;
               const isNext = index === (currentSlide + 1) % length;

               // 2. Define Styles based on position
               let positionClass = "";

               if (isCenter) {
                 // Active Slide (Front & Center)
                 positionClass = "opacity-100 scale-100 z-30 translate-x-0 shadow-2xl pointer-events-auto";
               } else if (isPrev) {
                 // Previous Slide (Left)
                 positionClass = "opacity-40 scale-75 z-20 -translate-x-[160px] md:-translate-x-[280px] blur-[1px] pointer-events-none";
               } else if (isNext) {
                 // Next Slide (Right)
                 positionClass = "opacity-40 scale-75 z-20 translate-x-[160px] md:translate-x-[280px] blur-[1px] pointer-events-none";
               } else {
                 // HIDDEN SLIDES (The extra 2 items)
                 // We keep them centered but small and invisible so they "grow" into position
                 positionClass = "opacity-0 scale-50 z-10 translate-x-0 pointer-events-none";
               }

               return (
                 <a 
                   key={index}
                   href={project.link} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${positionClass}`}
                 >
                    <div className="relative group">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="h-[350px] md:h-[500px] aspect-[4/5] object-cover border border-stone-100 bg-stone-200"
                      />
                      
                      {/* Hover Overlay (Only shows on Center slide) */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                         <span className="opacity-0 group-hover:opacity-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest flex gap-2 items-center shadow-sm">
                            Visit Project <ExternalLink size={12}/>
                         </span>
                      </div>
                    </div>
                 </a>
               );
             })}

             {/* Navigation Arrows */}
             <button onClick={prevSlide} className="absolute left-4 md:left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-stone-900 hover:text-white transition-colors z-40 shadow-md">
                <ChevronLeft size={24} />
             </button>
             <button onClick={nextSlide} className="absolute right-4 md:right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-stone-900 hover:text-white transition-colors z-40 shadow-md">
                <ChevronRight size={24} />
             </button>

          </div>
        </section>

        {/* 4. OTHER SECTIONS */}
        <CenteredCategorySection title="Extra-Curricular" items={DATA.sections.extracurricular} />
        <CenteredCategorySection title="Personal Projects" items={DATA.sections.personal} isLast={true} />

      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 px-6 md:px-12 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© {new Date().getFullYear()} Veron Vincent Rebello.</p>
          <div className="flex gap-6">
             <a href={`mailto:${DATA.email}`} className="hover:text-white transition-colors">Email</a>
             <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- HELPER COMPONENT ---
function CenteredCategorySection({ title, items, isLast = false }) {
  return (
    <section className={`py-16 ${!isLast ? 'border-b border-stone-300' : ''}`}>
      <h3 className="font-serif text-4xl text-stone-900 text-center mb-12">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center group">
            <div className="mb-2">
              <span className="text-xs font-mono text-stone-400 border-b border-stone-200 pb-1">{item.year}</span>
            </div>
            <h4 className="text-xl font-bold text-stone-900 mt-2 mb-1 group-hover:text-stone-600 transition-colors">
              {item.title}
            </h4>
            <p className="text-stone-500 font-medium text-xs tracking-widest uppercase mb-3">{item.role}</p>
            <p className="text-stone-600 leading-relaxed max-w-xs">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}