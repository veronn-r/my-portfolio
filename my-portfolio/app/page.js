'use client'; 

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X, Maximize2 } from "lucide-react";

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

  // 1. PROFESSIONAL WORK DATA
  svar: {
    title: "SVAR Events & Media Network",
    role: "Designer - Magazine Layout and Editorial Design, Pre-Press Production",
    desc: "Designed core article layouts and systems; oversaw final colour proofing and print production."
  },
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

  // 2. EXTRA-CURRICULAR DATA (XZA)
  xza: {
    title: "Xavier’s Zoology Association",
    year: "2020-2023",
    role: [
      "IMPRINT Magazine:",
      "Volunteer -> Design Editor -> Student Editor-in-Chief"
    ],
    desc: "I was responsible for the timely production, management and release of the Annual Departmental Magazine IMPRINT.",
    
    // Slides for the XZA Carousel
    slides: [
      { title: "IMPRINT Cover 2021", image: "/work/IMPRINT-21.jpg", link: "https://heyzine.com/flip-book/0a3c983ebc.html#page/1" }, 
      { title: "IMPRINT Cover 2022", image: "/work/IMPRINT-22.jpg", link: "https://heyzine.com/flip-book/b9012c8d61.html#page/1" }, 
      { title: "IMPRINT Cover 2023", image: "/work/IMPRINT-23.jpg", link: "https://heyzine.com/flip-book/b24f59b965.html#page/1" }, 
    ],
    
    // Logo Redesign Section
    logo: {
      title: "Xavier's Zoology Association Logo Redesign",
      desc: "During the Second Year of my Degree, I redesigned the logo for the Xavier's Zoology Departments student association XZA, incorporating a collage of different organisms forming the silhouette of a human hand.",
      image: "/icons/xza.svg" 
    },
    // YouTube Section
    video: {
      id: "g5DKiuWa-1M", 
      desc: "For the 2022 edition of IMPRINT, I animated this short trailer for the magazines call for articles announcement"
    }
  },

  sections: {
    // 3. PERSONAL PROJECTS (Cleaned Data - Images Only)
    personal: [
      { image: "/work/Chrysilla-volupe.jpg" },
      { image: "/work/maow-ellise.jpg" }, 
      { image: "/work/lotf.png" },
      { image: "/work/fish-out-of-water.png" }, 
      { image: "/work/humour.png" }, 
      { image: "/work/headsup.jpg" }, 
    ]
  }
};

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [currentSlide, setCurrentSlide] = useState(0);       // Professional Carousel
  const [currentXzaSlide, setCurrentXzaSlide] = useState(0); // Extra-Curricular Carousel
  const [isScrolled, setIsScrolled] = useState(false);
  
  // LIGHTBOX STATE
  const [selectedProject, setSelectedProject] = useState(null);

  // 1. PROFESSIONAL CAROUSEL TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % DATA.professional.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, [currentSlide]);

  // 2. XZA CAROUSEL TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentXzaSlide((prev) => (prev + 1) % DATA.xza.slides.length);
    }, 3000); 
    return () => clearInterval(timer);
  }, [currentXzaSlide]);

  // 3. SCROLL DETECTION
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- NAVIGATION HANDLERS ---
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % DATA.professional.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? DATA.professional.length - 1 : prev - 1));

  const nextXzaSlide = () => setCurrentXzaSlide((prev) => (prev + 1) % DATA.xza.slides.length);
  const prevXzaSlide = () => setCurrentXzaSlide((prev) => (prev === 0 ? DATA.xza.slides.length - 1 : prev - 1));

  return (
    <div className="min-h-screen font-sans selection:bg-stone-200 overflow-x-hidden pb-32">
      
      {/* 1. FIXED HEADER */}
      <header 
        className={`fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b-4 border-stone-900 transition-all duration-500 ease-in-out
          ${isScrolled ? 'h-20 shadow-md' : 'h-[320px] md:h-[300px]'}`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-full flex items-center justify-between relative">
            
            {/* LEFT SIDE: "Open to Work" */}
            <div className={`transition-all duration-700 hidden md:block ${isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
               <span className="text-xs font-bold tracking-widest uppercase border border-stone-900 px-3 py-2 inline-block cursor-default bg-white">
                  Open to Work
               </span>
            </div>

            {/* CENTER/LEFT: THE NAME CONTAINER */}
            <div className={`absolute top-1/2 -translate-y-1/2 flex flex-col transition-all duration-500
               ${isScrolled 
                  ? 'left-6 md:left-1/2 md:-translate-x-1/2 md:items-center items-start pt-3' 
                  : 'left-1/2 -translate-x-1/2 items-center text-center w-full' 
               }`}>
               
               <h1 className={`font-serif font-bold tracking-tight text-stone-900 leading-[0.9] transition-all duration-500 whitespace-nowrap
                  ${isScrolled ? 'text-2xl md:text-3xl' : 'text-4xl md:text-8xl'}`}>
                 {isScrolled ? (
                    <>
                      <span className="md:hidden">Veron Vincent Rebello</span>
                      <span className="hidden md:inline">{DATA.name}</span>
                    </>
                 ) : (
                    DATA.name
                 )}
               </h1>

               <div className={`text-stone-500 font-medium tracking-widest uppercase mt-4 text-sm flex gap-2 md:gap-4 transition-all duration-300
                  ${isScrolled ? 'opacity-0 h-0 overflow-hidden mt-0' : 'opacity-100'}`}>
                 <span>{DATA.role}</span>
                 <span className="hidden md:inline">•</span>
                 <span>{DATA.location}</span>
               </div>
               
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

            {/* RIGHT SIDE: Contact Button */}
            <div className={`transition-all duration-700 absolute right-6 md:right-12 top-1/2 -translate-y-1/2
                ${isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
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
            <div className="grid grid-cols-4 gap-y-6 gap-x-4 md:flex md:flex-nowrap md:justify-center md:items-end md:gap-16 w-full">
              {DATA.tools.map((tool, index) => (
                <div key={index} className="flex flex-col items-center justify-center group">
                   <img src={tool.url} alt={tool.name} className="w-10 h-10 md:w-14 md:h-14 object-contain mb-3 md:mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300"/>
                   <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-stone-400 group-hover:text-stone-900 text-center transition-colors duration-300">
                      {tool.name}
                   </span>
                </div>
              ))}
            </div>
        </section>

        {/* 3. PROFESSIONAL WORK */}
        <section className="py-16 border-b border-stone-300">
          <h3 className="font-serif text-4xl text-center text-stone-900">
            Professional Work
          </h3>

          <div className="w-24 h-px bg-stone-300 mx-auto my-8"></div>

          <div className="max-w-3xl mx-auto text-center mb-12">
              <h4 className="font-sans font-bold text-1xl md:text-1xl uppercase text-stone-900 mb-1">
                {DATA.svar.title}
              </h4>
              <p className="text-stone-400 text-xs md:text-sm tracking-widest mb-2 leading-relaxed px-4">
                June 2025 - Present
              </p>
              <p className="text-stone-500 text-xs md:text-sm tracking-widest mb-2 leading-relaxed px-4">
                {DATA.svar.role}
              </p>
          </div>

          <div className="relative max-w-4xl mx-auto h-[400px] md:h-[500px] flex items-center justify-center perspective-1000">
             {DATA.professional.map((project, index) => {
               const length = DATA.professional.length;
               const isCenter = index === currentSlide;
               const isPrev = index === (currentSlide - 1 + length) % length;
               const isNext = index === (currentSlide + 1) % length;
               let positionClass = "";

               if (isCenter) positionClass = "opacity-100 scale-100 z-30 translate-x-0 shadow-2xl pointer-events-auto";
               else if (isPrev) positionClass = "opacity-40 scale-75 z-20 -translate-x-[160px] md:-translate-x-[280px] blur-[1px] pointer-events-none";
               else if (isNext) positionClass = "opacity-40 scale-75 z-20 translate-x-[160px] md:translate-x-[280px] blur-[1px] pointer-events-none";
               else positionClass = "opacity-0 scale-50 z-10 translate-x-0 pointer-events-none";

               return (
                 <a key={index} href={project.link} target="_blank" rel="noopener noreferrer"
                    className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${positionClass}`}>
                    <div className="relative group">
                      <img src={project.image} alt={project.title} className="h-[350px] md:h-[500px] aspect-[4/5] object-cover border border-stone-100 bg-stone-200" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                         <span className="opacity-0 group-hover:opacity-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest flex gap-2 items-center shadow-sm">
                            Visit Project <ExternalLink size={12}/>
                         </span>
                      </div>
                    </div>
                 </a>
               );
             })}
             <button onClick={prevSlide} className="absolute left-4 md:left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-stone-900 hover:text-white transition-colors z-40 shadow-md"><ChevronLeft size={24} /></button>
             <button onClick={nextSlide} className="absolute right-4 md:right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-stone-900 hover:text-white transition-colors z-40 shadow-md"><ChevronRight size={24} /></button>
          </div>
        </section>

        {/* 4. EXTRA-CURRICULAR (XZA SECTION) */}
        <section className="py-16 border-b border-stone-300">
          <h3 className="font-serif text-4xl text-center text-stone-900">
            Extra-Curricular
          </h3>

          <div className="w-24 h-px bg-stone-300 mx-auto my-8"></div>

          <div className="max-w-3xl mx-auto text-center mb-12">
              <h4 className="font-sans font-bold text-1xl md:text-1xl uppercase text-stone-900 mb-1">
                {DATA.xza.title}
              </h4>
              <p className="text-stone-400 text-xs md:text-sm tracking-widest mb-2 leading-relaxed px-4">
                {DATA.xza.year}
              </p>
              <div className="text-stone-500 text-xs md:text-sm tracking-widest mb-2 leading-relaxed px-4 max-w-lg mx-auto">
                {DATA.xza.role.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </div>
              <p className="text-stone-600 text-sm md:text-base leading-relaxed mt-4 px-4 max-w-xl mx-auto">
                {DATA.xza.desc}
              </p>
          </div>

          {/* XZA CAROUSEL */}
          <div className="relative max-w-4xl mx-auto h-[400px] md:h-[500px] flex items-center justify-center perspective-1000 mb-20">
             {DATA.xza.slides.map((slide, index) => {
               const length = DATA.xza.slides.length;
               const isCenter = index === currentXzaSlide;
               const isPrev = index === (currentXzaSlide - 1 + length) % length;
               const isNext = index === (currentXzaSlide + 1) % length;
               let positionClass = "";

               if (isCenter) positionClass = "opacity-100 scale-100 z-30 translate-x-0 shadow-2xl pointer-events-auto";
               else if (isPrev) positionClass = "opacity-40 scale-75 z-20 -translate-x-[160px] md:-translate-x-[280px] blur-[1px] pointer-events-none";
               else if (isNext) positionClass = "opacity-40 scale-75 z-20 translate-x-[160px] md:translate-x-[280px] blur-[1px] pointer-events-none";
               else positionClass = "opacity-0 scale-50 z-10 translate-x-0 pointer-events-none";

               return (
                 <a key={index} href={slide.link} target="_blank" rel="noopener noreferrer"
                 className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${positionClass}`}>
                    <div className="relative group">
                      <img src={slide.image} alt={slide.title} className="h-[350px] md:h-[500px] aspect-[13/18] object-cover border border-stone-100 bg-stone-200" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                         <span className="opacity-0 group-hover:opacity-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest flex gap-2 items-center shadow-sm">
                            Visit Project <ExternalLink size={12}/>
                         </span>
                      </div>
                    </div>
                 </a>
               );
             })}
             <button onClick={prevXzaSlide} className="absolute left-4 md:left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-stone-900 hover:text-white transition-colors z-40 shadow-md"><ChevronLeft size={24} /></button>
             <button onClick={nextXzaSlide} className="absolute right-4 md:right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-stone-900 hover:text-white transition-colors z-40 shadow-md"><ChevronRight size={24} /></button>
          </div>

          {/* LOGO REDESIGN & YOUTUBE */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 px-6">
             <div className="flex justify-center md:justify-end">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-stone-100 border border-stone-200 p-8 flex items-center justify-center">
                   <img src={DATA.xza.logo.image} alt="XZA Logo" className="w-full h-full object-contain" />
                </div>
             </div>
             <div className="text-center md:text-left">
                <h4 className="font-sans font-medium text-2xl md:text-3xl text-stone-900 mb-4">
                  {DATA.xza.logo.title}
                </h4>
                <p className="text-stone-600 leading-relaxed max-w-md mx-auto md:mx-0">
                  {DATA.xza.logo.desc}
                </p>
             </div>
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center">
             <div className="aspect-video w-full bg-stone-900 mb-6 shadow-xl">
               <iframe 
                 width="100%" 
                 height="100%" 
                 src={`https://www.youtube.com/embed/${DATA.xza.video.id}`} 
                 title="YouTube video player" 
                 frameBorder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                 allowFullScreen
               ></iframe>
             </div>
             <p className="text-stone-500 font-medium text-sm">
               {DATA.xza.video.desc}
             </p>
          </div>
        </section>

        {/* 5. PERSONAL PROJECTS - IMAGES ONLY */}
        <section className="py-16">
          <h3 className="font-serif text-4xl text-stone-900 text-center mb-12">
            Personal Projects
          </h3>
          
          <div className="max-w-6xl mx-auto px-6">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {DATA.sections.personal.map((project, i) => (
                <div 
                  key={i} 
                  className="break-inside-avoid relative group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Image Card */}
                  <div className="bg-stone-100 overflow-hidden border border-stone-200">
                     <img 
                       src={project.image} 
                       alt="Personal Project" 
                       className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                  </div>
                  
                  {/* Simple Hover Overlay (No Text) */}
                  <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 p-3 rounded-full shadow-lg">
                         <Maximize2 size={20} className="text-stone-900"/>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* LIGHTBOX MODAL (Image Only) */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
           <button 
             className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
             onClick={() => setSelectedProject(null)}
           >
             <X size={32} />
           </button>

           <div 
             className="max-w-5xl max-h-screen w-full flex flex-col items-center"
             onClick={(e) => e.stopPropagation()} 
           >
              <img 
                src={selectedProject.image} 
                alt="Full Preview" 
                className="max-h-[90vh] w-auto object-contain shadow-2xl"
              />
           </div>
        </div>
      )}

    </div>
  );
}