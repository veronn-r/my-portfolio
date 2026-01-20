'use client'; 

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X, Maximize2 } from "lucide-react";
import dynamic from 'next/dynamic';

// 1. DYNAMIC IMPORTS
const CocoaScene = dynamic(() => import('./components/CocoaScene'), { 
  ssr: false,
  loading: () => <div className="h-[400px] bg-stone-100 flex items-center justify-center text-xs tracking-widest text-stone-400">LOADING 3D...</div>
});

const ArticleFlipbook = dynamic(() => import('./components/ArticleFlipbook'), {
  ssr: false,
  loading: () => <div className="h-[550px] bg-stone-50 flex items-center justify-center text-xs tracking-widest text-stone-400">LOADING FLIPBOOK...</div>
});

/* --- DATA & CONFIGURATION --- */
const DATA = {
  name: "Veron Vincent Rebello",
  role: "Designer",
  location: "Mumbai, India",
  email: "veron.rebello@gmail.com",
  
  contact: {
    linkedin: "https://www.linkedin.com/in/veron-rebello-b376a7233/",
    whatsapp: "https://wa.me/9322024447",
  },

  tools: [
    { name: "Photoshop", url: "/icons/ps.svg" },
    { name: "Illustrator", url: "/icons/ai.svg" },
    { name: "InDesign", url: "/icons/id.svg" },
    { name: "Affinity by Canva", url: "/icons/af.svg" },
    { name: "After Effects", url: "/icons/ae.svg" },
    { name: "Premiere Pro", url: "/icons/pr.svg" },
    { name: "DaVinci Resolve", url: "/icons/dr.svg" },
  ],

  svar: {
    title: "SVAR Events & Media Network",
    role: "Designer - Magazine Design & Production",
    desc: "Instrumental in the pre-press and publishing of 5+ monthly issues (and counting). I manage the end-to-end design lifecycle, from conceptualizing core article layouts to overseeing final colour proofing and coordinating strictly with print vendors."
  },
  
  // NEW: BEST ARTICLES SHOWCASE DATA
  // Replace these with your actual article image paths
  showcase: {
    title: "Editorial Design Showcase",
    desc: "A curated selection of my most effective article layouts and typographic systems designed during my tenure at SVAR.",
    pages: [
      "/work/articles/page1.webp", // Front Cover or Intro
      "/work/articles/page2.webp", // Spread Left
      "/work/articles/page3.webp", // Spread Right
      "/work/articles/page4.webp", 
      "/work/articles/page5.webp",
      "/work/articles/page6.webp", // Back Cover or End
    ]
  },

  professional: [
    { title: "SVAR - The Voice of Jewellers (August)", image: "/work/aug-mag.webp", link: "https://svarmedia.com/magazine/#aug-2025-mgazine/1/" },
    { title: "SVAR - The Voice of Jewellers (September)", image: "/work/sep-mag.webp", link: "https://svarmedia.com/magazine/#vol-5-issue-9/1/" },
    { title: "SVAR - The Voice of Jewellers (October)", image: "/work/oct-mag.webp", link: "https://svarmedia.com/magazine/#vol-5-issue-10/1/" },
    { title: "SVAR - The Voice of Jewellers (November)", image: "/work/nov-mag.webp", link: "https://svarmedia.com/magazine/#vol-5-issue-11/1/" },
    { title: "SVAR - The Voice of Jewellers (December)", image: "/work/dec-mag.webp", link: "https://svarmedia.com/magazine/#vol-5-issue-12/1/" },
  ],

  xza: {
    title: "Xavier’s Zoology Association",
    year: "2020-2023",
    role: [ "IMPRINT Magazine:", "Volunteer -> Design Editor -> Student Editor-in-Chief" ],
    desc: "I successfully brought 3 consecutive annual editions of 'IMPRINT' to fruition during my degree. Evolving from a volunteer to Editor-in-Chief, I steered the creative direction and production management for three years running.",
    slides: [
      { title: "IMPRINT Cover 2021", image: "/work/IMPRINT-21.webp", link: "https://heyzine.com/flip-book/0a3c983ebc.html#page/1" }, 
      { title: "IMPRINT Cover 2022", image: "/work/IMPRINT-22.webp", link: "https://heyzine.com/flip-book/b9012c8d61.html#page/1" }, 
      { title: "IMPRINT Cover 2023", image: "/work/IMPRINT-23.webp", link: "https://heyzine.com/flip-book/b24f59b965.html#page/1" }, 
    ],
    logo: { title: "XZA Logo Design", desc: "During the Second Year of my Degree, I redesigned the logo for the Xavier's Zoology Departments student association XZA, incorporating a collage of different organisms forming the silhouette of a human hand.", image: "/icons/xza.svg" },
    video: { id: "g5DKiuWa-1M", desc: "For IMPRINT 2022, I created an animated short trailer to announce the magazine’s call for articles." }
  },

  packaging: {
    title: "Midnight Cocoa - Premium Chocolate",
    role: "Packaging Design & Print Production",
    desc: "A premium packaging concept for a fictional brand's 70% Dark Chocolate Sea Salt bar. I engineered the custom dieline, modeled the packaging in Blender, and handled the full UV mapping and texture baking process.",
    image: "/work/midnight-cocoa.webp" 
  },

  sections: {
    personal: [
      { image: "/work/Chrysilla-volupe.webp" },
      { image: "/work/maow-ellise.webp" }, 
      { image: "/work/lotf.webp" },
      { image: "/work/fish-out-of-water.webp" }, 
      { image: "/work/humour.webp" }, 
      { image: "/work/headsup.webp" }, 
    ]
  }
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);       
  const [currentXzaSlide, setCurrentXzaSlide] = useState(0); 
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); 
  const [isContactOpen, setIsContactOpen] = useState(false);    
  const [isPaused, setIsPaused] = useState(false);
  const [isXzaPaused, setIsXzaPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  /* --- HANDLERS --- */
  const minSwipeDistance = 50;
  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = (nextFunc, prevFunc) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextFunc();
    if (distance < -minSwipeDistance) prevFunc();
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % DATA.professional.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? DATA.professional.length - 1 : prev - 1));
  const nextXzaSlide = () => setCurrentXzaSlide((prev) => (prev + 1) % DATA.xza.slides.length);
  const prevXzaSlide = () => setCurrentXzaSlide((prev) => (prev === 0 ? DATA.xza.slides.length - 1 : prev - 1));

  useEffect(() => { if (isPaused) return; const timer = setInterval(() => nextSlide(), 3000); return () => clearInterval(timer); }, [currentSlide, isPaused]);
  useEffect(() => { if (isXzaPaused) return; const timer = setInterval(() => nextXzaSlide(), 3000); return () => clearInterval(timer); }, [currentXzaSlide, isXzaPaused]);
  useEffect(() => { const handleScroll = () => setIsScrolled(window.scrollY > 50); window.addEventListener("scroll", handleScroll); return () => window.removeEventListener("scroll", handleScroll); }, []);

  const getPositionClass = (index, current, length) => {
    if (index === current) return "opacity-100 scale-100 z-30 translate-x-0 shadow-2xl pointer-events-auto";
    if (index === (current - 1 + length) % length) return "opacity-40 scale-75 z-20 -translate-x-[160px] md:-translate-x-[280px] blur-[1px] pointer-events-none";
    if (index === (current + 1) % length) return "opacity-40 scale-75 z-20 translate-x-[160px] md:translate-x-[280px] blur-[1px] pointer-events-none";
    return "opacity-0 scale-50 z-10 translate-x-0 pointer-events-none";
  };

  const styles = {
    sectionTitle: "font-serif text-4xl mb-10 text-center text-stone-900",
    projectTitle: "font-sans font-bold text-xl uppercase text-stone-900 mb-2",
    metaText: "text-stone-500 text-xs md:text-sm tracking-widest uppercase mb-3",
    bodyText: "text-stone-600 leading-relaxed max-w-xl mx-auto",
    button: "text-xs font-bold tracking-widest uppercase bg-stone-900 text-stone-50 border border-stone-900 px-4 py-3 inline-block hover:bg-stone-700 hover:border-stone-700 transition-colors"
  };

  return (
    <div className="min-h-screen font-sans selection:bg-stone-200 overflow-x-hidden pb-32 text-stone-900">
      
      <header className={`fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b-4 border-stone-900 transition-all duration-500 ease-in-out ${isScrolled ? 'h-20 shadow-md' : 'h-[320px] md:h-[300px]'}`}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-full flex items-center justify-between relative">
            <div className="hidden md:block pointer-events-none"></div>
            <div className={`absolute top-1/2 -translate-y-1/2 flex flex-col transition-all duration-500 ${isScrolled ? 'left-6 md:left-1/2 md:-translate-x-1/2 md:items-center items-start pt-3' : 'left-1/2 -translate-x-1/2 items-center text-center w-full' }`}>
               <h1 className={`font-serif font-bold tracking-tight text-stone-900 leading-[0.9] transition-all duration-500 whitespace-nowrap ${isScrolled ? 'text-2xl md:text-3xl' : 'text-4xl md:text-8xl'}`}>
                 {isScrolled ? (<><span className="md:hidden">Veron Rebello</span><span className="hidden md:inline">{DATA.name}</span></>) : (DATA.name)}
               </h1>
               <div className={`text-stone-500 font-medium tracking-widest uppercase mt-4 text-sm flex gap-2 md:gap-4 transition-all duration-300 ${isScrolled ? 'opacity-0 h-0 overflow-hidden mt-0' : 'opacity-100'}`}>
                 <span>{DATA.role}</span><span>•</span><span>{DATA.location}</span>
               </div>
               <div className={`flex gap-4 mt-6 transition-all duration-300 ${isScrolled ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'}`}>
                   <button onClick={() => setIsContactOpen(true)} className={styles.button}>Contact Me</button>
               </div>
            </div>
            <div className={`transition-all duration-700 absolute right-6 md:right-12 top-1/2 -translate-y-1/2 ${isScrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
               <button onClick={() => setIsContactOpen(true)} className={`${styles.button} px-3 py-2`}>Contact Me</button>
            </div>
        </div>
      </header>

      <div className="h-[320px] md:h-[300px]"></div>

      <main className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* --- COMPETENCIES --- */}
        <section className="py-12 md:py-16 border-b border-stone-300">
            <h3 className={styles.sectionTitle}>Competencies</h3>
            <div className="flex flex-wrap justify-center gap-y-6 gap-x-4 md:gap-16 w-full px-2 md:px-0">
              {DATA.tools.map((tool, index) => (
                <div key={index} className="flex flex-col items-center justify-center group w-[21%] md:w-auto">
                   <img src={tool.url} alt={tool.name} className="w-10 h-10 md:w-14 md:h-14 object-contain mb-3 md:mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300"/>
                   <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-stone-400 group-hover:text-stone-900 text-center transition-colors duration-300">{tool.name}</span>
                </div>
              ))}
            </div>
        </section>

        {/* --- PROFESSIONAL WORK --- */}
        <section className="py-16 border-b border-stone-300">
          <h3 className={styles.sectionTitle}>Professional Work</h3>
          <div className="w-24 h-px bg-stone-300 mx-auto my-8"></div>
          
          <div className="max-w-3xl mx-auto text-center mb-12">
              <h4 className={styles.projectTitle}>{DATA.svar.title}</h4>
              <p className={styles.metaText}>June 2025 - Present</p>
              <div className={styles.bodyText}>{DATA.svar.desc}</div>
          </div>

          <div className="relative max-w-4xl mx-auto h-[400px] md:h-[500px] flex items-center justify-center perspective-1000 mb-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={() => onTouchEnd(nextSlide, prevSlide)}>
             {DATA.professional.map((project, index) => {
               const positionClass = getPositionClass(index, currentSlide, DATA.professional.length);
               return (
                 <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${positionClass}`}>
                    <div className="relative group">
                      <img src={project.image} alt={project.title} draggable="false" className="h-[350px] md:h-[500px] aspect-[4/5] object-cover border border-stone-100 bg-stone-200 select-none"/>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center"><span className="opacity-0 group-hover:opacity-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest flex gap-2 items-center shadow-sm">Visit Project <ExternalLink size={12}/></span></div>
                    </div>
                 </a>
               );
             })}
             <button onClick={prevSlide} className="absolute left-4 md:left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-stone-900 hover:text-white transition-colors z-40 shadow-md"><ChevronLeft size={24} /></button>
             <button onClick={nextSlide} className="absolute right-4 md:right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-stone-900 hover:text-white transition-colors z-40 shadow-md"><ChevronRight size={24} /></button>
          </div>

          {/* NEW: FLIPBOOK SECTION
          <div className="max-w-5xl mx-auto mt-24">
             <div className="text-center mb-8">
                <h4 className={styles.projectTitle}>{DATA.showcase.title}</h4>
                <p className={styles.bodyText}>{DATA.showcase.desc}</p>
             </div>
             <ArticleFlipbook pages={DATA.showcase.pages} />
             <p className="text-center text-xs text-stone-400 mt-4 tracking-widest uppercase">Click or Drag corners to flip</p>
          </div> */}
        </section>

        {/* --- EXTRA-CURRICULAR --- */}
        <section className="py-16 border-b border-stone-300">
          <h3 className={styles.sectionTitle}>Extra-Curricular</h3>
          <div className="w-24 h-px bg-stone-300 mx-auto my-8"></div>
          
          <div className="max-w-3xl mx-auto text-center mb-12">
              <h4 className={styles.projectTitle}>{DATA.xza.title}</h4>
              <p className={styles.metaText}>{DATA.xza.year}</p>
              <div className={`${styles.metaText} normal-case tracking-normal max-w-lg mx-auto text-stone-500`}>
                {DATA.xza.role.map((line, i) => (<span key={i} className="block">{line}</span>))}
              </div>
              <p className={`${styles.bodyText} mt-4`}>{DATA.xza.desc}</p>
          </div>

          <div className="relative max-w-4xl mx-auto h-[400px] md:h-[500px] flex items-center justify-center perspective-1000 mb-20"
            onMouseEnter={() => setIsXzaPaused(true)}
            onMouseLeave={() => setIsXzaPaused(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={() => onTouchEnd(nextXzaSlide, prevXzaSlide)}>
             {DATA.xza.slides.map((slide, index) => {
               const positionClass = getPositionClass(index, currentXzaSlide, DATA.xza.slides.length);
               return (
                 <a key={index} href={slide.link} target="_blank" rel="noopener noreferrer" className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${positionClass}`}>
                    <div className="relative group">
                      <img src={slide.image} alt={slide.title} draggable="false" className="h-[350px] md:h-[500px] aspect-[13/18] object-cover border border-stone-100 bg-stone-200 select-none"/>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center"><span className="opacity-0 group-hover:opacity-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest flex gap-2 items-center shadow-sm">Visit Project <ExternalLink size={12}/></span></div>
                    </div>
                 </a>
               );
             })}
             <button onClick={prevXzaSlide} className="absolute left-4 md:left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-stone-900 hover:text-white transition-colors z-40 shadow-md"><ChevronLeft size={24} /></button>
             <button onClick={nextXzaSlide} className="absolute right-4 md:right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-stone-900 hover:text-white transition-colors z-40 shadow-md"><ChevronRight size={24} /></button>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 px-6">
             <div className="flex justify-center md:justify-end">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-stone-100 border border-stone-200 p-8 flex items-center justify-center">
                   <img src={DATA.xza.logo.image} alt="XZA Logo" className="w-full h-full object-contain" />
                </div>
             </div>
             <div className="text-center md:text-left">
                <h4 className={styles.projectTitle}>{DATA.xza.logo.title}</h4>
                <p className={`${styles.bodyText} md:mx-0`}>{DATA.xza.logo.desc}</p>
             </div>
          </div>
          <div className="max-w-4xl mx-auto px-6 text-center">
             <div className="aspect-video w-full bg-stone-900 mb-6 shadow-xl">
               <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${DATA.xza.video.id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
             </div>
             <p className={`${styles.bodyText} text-sm`}>{DATA.xza.video.desc}</p>
          </div>
        </section>

        {/* --- PERSONAL PROJECTS --- */}
        <section className="py-16">
          <h3 className={styles.sectionTitle}>Personal Projects</h3>
          <div className="w-24 h-px bg-stone-300 mx-auto my-12"></div>
          <div className="max-w-5xl mx-auto px-6">
             <div className="text-center mb-8">
                <h4 className={styles.projectTitle}>{DATA.packaging.title}</h4>
                <p className={styles.metaText}>{DATA.packaging.role}</p>
                <p className={styles.bodyText}>{DATA.packaging.desc}</p>
             </div>
             <div className="w-full mb-8"><CocoaScene /></div>
             <div className="w-full bg-stone-100 border border-stone-200"><img src={DATA.packaging.image} alt={DATA.packaging.title} className="w-full h-auto object-cover"/></div>
          </div>
          <div className="w-24 h-px bg-stone-300 mx-auto my-12"></div>
          <div className="max-w-6xl mx-auto px-6">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {DATA.sections.personal.map((project, i) => (
                <div key={i} className="break-inside-avoid relative group cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <div className="bg-stone-100 overflow-hidden border border-stone-200"><img src={project.image} alt="Personal Project" draggable="false" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 select-none"/></div>
                  <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"><div className="bg-white/90 p-3 rounded-full shadow-lg"><Maximize2 size={20} className="text-stone-900"/></div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {selectedProject && (<div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}><button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors" onClick={() => setSelectedProject(null)}><X size={32} /></button><div className="max-w-5xl max-h-screen w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}><img src={selectedProject.image} alt="Full Preview" className="max-h-[90vh] w-auto object-contain shadow-2xl"/></div></div>)}
      
      {isContactOpen && (<div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsContactOpen(false)}><div className="bg-white p-8 md:p-12 max-w-lg w-full relative shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}><button className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors" onClick={() => setIsContactOpen(false)}><X size={24} /></button><h3 className="font-serif text-3xl text-stone-900 mb-10">Get in Touch</h3><div className="grid grid-cols-3 gap-6 w-full"><a href={`mailto:${DATA.email}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group"><img src="/icons/mail.svg" alt="Email" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"/><span className="text-xs font-bold uppercase tracking-widest text-stone-500 group-hover:text-stone-900 transition-colors">Email</span></a><a href={DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group"><img src="/icons/lin.png" alt="LinkedIn" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"/><span className="text-xs font-bold uppercase tracking-widest text-stone-500 group-hover:text-stone-900 transition-colors">LinkedIn</span></a><a href={DATA.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group"><img src="/icons/wa.svg" alt="WhatsApp" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"/><span className="text-xs font-bold uppercase tracking-widest text-stone-500 group-hover:text-stone-900 transition-colors">WhatsApp</span></a></div></div></div>)}

    </div>
  );
}