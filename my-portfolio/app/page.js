import Link from "next/link";
import { Mail, Download } from "lucide-react";

// --- CONTENT DATA ---
const DATA = {
  name: "Veron Vincent Rebello",
  role: "Designer",
  location: "Mumbai, India",
  email: "veron.rebello@gmail.com",
  // Note: Headline and Bio are removed from the display, 
  // but I'm keeping the data here just in case you need it later.
  headline: "Visual Systems & Narrative Design.", 
  bio: "I am a multidisciplinary designer, editor, and illustrator bridging the gap between analytical precision and creative expression. Leveraging a unique foundation in STEM, I apply a scientific rigor to visual problem solving—producing work that is not just aesthetically engaging, but systematically sound.",
  
  // Pointing to local static images in 'public/icons'
  tools: [
    { name: "Photoshop", url: "/icons/ps.svg" },
    { name: "Illustrator", url: "/icons/ai.svg" },
    { name: "InDesign", url: "/icons/id.svg" },
    { name: "After Effects", url: "/icons/ae.svg" },
    { name: "Premiere Pro", url: "/icons/pr.svg" },
    { name: "DaVinci Resolve", url: "/icons/dr.svg" },
    { name: "Affinity by Canva", url: "/icons/af.svg" },
  ],

  sections: {
    professional: [
      {
        title: "SVAR Events & Media Network",
        role: "Graphic Designer",
        desc: "Lead design for print-ready publications and digital assets.",
        year: "2024 - Present"
      },
      {
        title: "Freelance Client Work",
        role: "Identity & Branding",
        desc: "Developing visual systems for diverse commercial clients.",
        year: "2023 - 2024"
      }
    ],
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
  return (
    <div className="min-h-screen font-sans selection:bg-stone-200">
      
      {/* 1. MASTHEAD */}
      <header className="border-b-4 border-stone-900 pt-16 pb-12 px-6 md:px-12 max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
        <div>
          <h1 className="font-serif text-5xl md:text-8xl font-bold tracking-tight text-stone-900 leading-[0.9]">
            {DATA.name}
          </h1>
          <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-stone-500 font-medium tracking-widest uppercase text-sm">
            <span>{DATA.role}</span>
            <span className="hidden md:inline">•</span>
            <span>{DATA.location}</span>
          </div>
        </div>

        {/* UPDATED: Buttons Side-by-Side */}
        <div className="flex flex-row items-center gap-4 mt-2">
           <span className="text-xs font-bold tracking-widest uppercase border border-stone-900 px-4 py-3 inline-block cursor-default">
              Open to Work
           </span>
           <a 
             href={`mailto:${DATA.email}`}
             className="text-xs font-bold tracking-widest uppercase bg-stone-900 text-stone-50 border border-stone-900 px-4 py-3 inline-block hover:bg-stone-700 hover:border-stone-700 transition-colors"
           >
             Contact Me
           </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* 2. HERO / COMPETENCIES (Redesigned) */}
        {/* Text removed. Now just the Competencies row. */}
        <section className="py-8 md:py-8 border-b border-stone-300">
            <h3 className="font-serif text-4xl mb-10 text-center">
              Competencies
            </h3>
            
            {/* Horizontal Row of Icons */}
            <div className="flex flex-wrap justify-center items-end gap-8 md:gap-16">
              {DATA.tools.map((tool, index) => (
                <div key={index} className="flex flex-col items-center justify-center transition-transform duration-300 group hover:-translate-y-2">
                   <img 
                     src={tool.url} 
                     alt={tool.name} 
                     className="w-10 h-10 md:w-14 md:h-14 object-contain mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
                   />
                   <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 group-hover:text-stone-900 text-center">
                      {tool.name}
                   </span>
                </div>
              ))}
            </div>
        </section>

        {/* 3. WORK SECTIONS */}
        <CategorySection title="Professional Work" items={DATA.sections.professional} />
        <CategorySection title="Extra-Curricular" items={DATA.sections.extracurricular} />
        <CategorySection title="Personal Projects" items={DATA.sections.personal} isLast={true} />

      </main>

      {/* 4. FOOTER */}
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

// --- HELPER COMPONENTS ---

function CategorySection({ title, items, isLast = false }) {
  return (
    <section className={`py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 ${!isLast ? 'border-b border-stone-300' : ''}`}>
      <div className="md:col-span-4">
        <h3 className="font-serif text-3xl md:text-4xl text-stone-900 sticky top-24">
          {title}
        </h3>
      </div>
      <div className="md:col-span-8 grid gap-8">
        {items.map((item, i) => (
          <div key={i} className="group block relative pl-0 hover:pl-4 transition-all duration-300 border-l-2 border-transparent hover:border-stone-900">
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="text-xl font-bold text-stone-900 group-hover:text-stone-600 transition-colors">
                {item.title}
              </h4>
              <span className="text-sm font-mono text-stone-500">{item.year}</span>
            </div>
            <p className="text-stone-800 font-medium text-sm mb-2">{item.role}</p>
            <p className="text-stone-600 leading-relaxed max-w-xl">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}