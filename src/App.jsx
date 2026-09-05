import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { profile, workExperience, projects } from './data';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef(null);
  const counterRef = useRef(null);

  // Initialize theme: localStorage > dark default
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const dark = stored ? stored === 'dark' : true;
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  useGSAP(() => {
    // Entrance animations
    const tl = gsap.timeline();
    
    tl.from(".masthead", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(".hero-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .from(".hero-desc", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.6");

    // Counter animation for 7+
    const counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 7,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(counterObj.val) + "+";
        }
      }
    }, "-=0.4");

    // Scroll animations for sections
    gsap.utils.toArray('.section-anim').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground transition-colors duration-300 px-4 md:px-8 lg:px-16 pb-20">
      {/* Masthead */}
      <header className="masthead max-w-5xl mx-auto border-b border-border py-6 mb-12 lg:mb-20 flex justify-between items-end">
        <div>
          <h1 className="text-xl md:text-2xl font-serif font-bold uppercase tracking-widest">{profile.name}</h1>
          <p className="text-sm text-muted mt-1 uppercase tracking-wider">{profile.role}</p>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-4 text-sm text-muted">
            {profile.socials.map((social) => (
              <a key={social.name} href={social.url} className="hover:text-foreground transition-colors uppercase tracking-widest">
                {social.name}
              </a>
            ))}
          </nav>
          <button 
            onClick={toggleTheme} 
            className="p-2 border border-border hover:border-foreground transition-colors rounded-none"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        {/* Hero */}
        <section className="mb-24 lg:mb-32">
          <h2 className="hero-title text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-8">
            Building scalable, beautiful, and performant web applications.
          </h2>
          <div className="hero-desc grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border pt-8">
            <div>
              <p className="text-lg md:text-xl text-muted leading-relaxed">
                {profile.experienceSummary}
              </p>
            </div>
            <div className="flex flex-col justify-end md:items-end">
              <span ref={counterRef} className="text-4xl font-serif font-bold">0+</span>
              <span className="text-sm text-muted uppercase tracking-widest mt-2">Years of Experience</span>
            </div>
          </div>
        </section>

        {/* Two Column Layout for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Work Experience */}
          <section className="section-anim lg:col-span-7">
            <div className="border-b-2 border-foreground pb-4 mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest">Experience</h3>
            </div>
            
            <div className="flex flex-col gap-12">
              {workExperience.map((job) => (
                <article key={job.id} className="group">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                    <h4 className="text-2xl font-serif font-semibold">{job.company}</h4>
                    <span className="text-sm text-muted font-mono mt-1 md:mt-0">{job.duration}</span>
                  </div>
                  <p className="text-base font-medium mb-4">{job.role}</p>
                  <p className="text-muted leading-relaxed">{job.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="section-anim lg:col-span-5">
            <div className="border-b-2 border-foreground pb-4 mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest">Selected Projects</h3>
            </div>
            
            <div className="flex flex-col gap-10">
              {projects.map((project) => (
                <article key={project.id} className="border-t border-border pt-6 first:border-0 first:pt-0">
                  <span className="text-xs text-muted uppercase tracking-widest mb-2 block">{project.category}</span>
                  <h4 className="text-xl font-serif font-semibold mb-3 group cursor-pointer inline-flex items-center gap-2 hover:text-muted transition-colors">
                    {project.title} <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h4>
                  <p className="text-sm text-muted leading-relaxed">{project.description}</p>
                </article>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="section-anim max-w-5xl mx-auto mt-32 border-t border-border pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-muted uppercase tracking-widest">&copy; {new Date().getFullYear()} {profile.name}</p>
        <div className="flex gap-6 md:hidden">
            {profile.socials.map((social) => (
              <a key={social.name} href={social.url} className="text-sm text-muted hover:text-foreground transition-colors uppercase tracking-widest">
                {social.name}
              </a>
            ))}
        </div>
      </footer>
    </div>
  );
}

export default App;
