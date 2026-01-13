import Link from "next/link";
import { Mail, Download } from "lucide-react";

// --- CONTENT DATA ---
const DATA = {
  name: "Veron Vincent Rebello",
  role: "Designer",
  location: "Mumbai, India",
  email: "veron.rebello@gmail.com",
  headline: "Visual Systems & Narrative Design.", 
  bio: "I am a multidisciplinary designer, editor, and illustrator bridging the gap between analytical precision and creative expression. Leveraging a unique foundation in STEM, I apply a scientific rigor to visual problem solving—producing work that is not just aesthetically engaging, but systematically sound.",
  skills: [
    "Adobe Creative Suite",
    "Affinity Suite",
    "DaVinci Resolve (Motion)",
    "Print Production",
    "Systems-Based Workflow"
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
      <header className="border-b-4 border-stone-900 pt-12 pb-4 px-6 md:px-12 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-stone-900 leading-[0.9]">
            {DATA.name}
          </h1>
          <p className="mt-2 text-stone-500 font-medium tracking-widest uppercase text-sm">
            {DATA.role}
          </p>
        </div>
        <div className="text-right flex flex-col items-end">
           <span className="text-xs font-bold tracking-widest uppercase border border-stone-900 px-2 py-1 mb-2 inline-block">
              Open to Work
           </span>
           <p className="text-sm text-stone-500">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • {DATA.location}</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* 2. HERO */}
        <section className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-stone-300">
          <div className="md:col-span-8">
            <h2 className="font-serif text-4xl md:text-6xl italic leading-tight mb-8 text-stone-800">
              {DATA.headline}
            </h2>
            <div className="prose prose-stone text-lg md:text-xl leading-relaxed text-stone-700 max-w-2xl">
              <p>{DATA.bio}</p>
            </div>
            
            <div className="mt-10 flex gap-4">
              <a 
                href={`mailto:${DATA.email}`}
                className="group flex items-center gap-2 px-5 py-3 bg-stone-900 text-stone-50 rounded-sm hover:bg-stone-700 transition-colors"
              >
                <Mail size={18} />
                <span>Contact Me</span>
              </a>
              <button className="flex items-center gap-2 px-5 py-3 border border-stone-300 hover:border-stone-900 transition-colors">
                <Download size={18} />
                <span>Resume</span>
              </button>
            </div>
          </div>

          <aside className="md:col-span-4 md:border-l md:border-stone-200 md:pl-12 pt-2">
            <h3 className="font-serif text-2xl mb-6 border-b border-stone-300 pb-2">Competencies</h3>
            <ul className="space-y-3">
              {DATA.skills.map((skill, index) => (
                <li key={index} className="flex items-start gap-2 text-stone-600">
                  <span className="text-stone-400 mt-1">●</span>
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </aside>
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