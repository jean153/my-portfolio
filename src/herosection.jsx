import React from 'react';

const HeroSection = () => {
  return (
<section className=" min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-30"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Hi, I'm <span className="text-yellow-300">Jean</span>
          <br />
          I build with creativity + AI
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
          Crafting beautiful digital experiences with modern technology and creative thinking
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="px-8 py-6 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:scale-105 transition"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="px-8 py-6 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition"
          >
            Contact Me
          </a>
        </div>

        <a href='#about' className="inline-block  mt-16 animate-bounce">
          <svg className="w-8 h-8 text-white/70 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default HeroSection;