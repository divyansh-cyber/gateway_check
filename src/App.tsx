import React, { useEffect, useState } from 'react';
import Loader from './components/Loader';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = ({ id, title, children, videoSrc }: {
  id: string;
  title: string;
  children: React.ReactNode;
  videoSrc?: string;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id={id} className="section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold text-center mb-12">{title}</h2>
          {videoSrc && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2500); // Start fade out after 2.5s
    const remove = setTimeout(() => setLoading(false), 3000); // Remove after 3s

    return () => {
      clearTimeout(timer);
      clearTimeout(remove);
    };
  }, []);

  return (
    <>
      {loading && <Loader fadeOut={fadeOut} />}
      {!loading && (
        <ThemeProvider>
          <div className="min-h-screen">
            <Navbar />
            {/* Hero Section */}
            <Section id="hero" title="Welcome" videoSrc="/assets/homepage.mp4">
              <div className="text-center space-y-6">
                <h1 className="text-6xl font-bold">Modern Web Experience</h1>
                <p className="text-xl">Discover our amazing features and services</p>
                <button className="btn-primary">Get Started</button>
              </div>
            </Section>
            {/* Features Section */}
            <Section id="features" title="Features" videoSrc="/assets/features-services.mp4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature cards here */}
              </div>
            </Section>

            {/* Brand Kits Section */}
            <section id="brand-kits" className="py-12 px-6 bg-[#0d0d0d] text-white">
              <h2 className="text-3xl font-bold mb-6 text-center">Brand Kits</h2>
              <div className="flex justify-center">
                <img
                  src="/assets/cards.png"
                  alt="Brand Kits"
                  className="rounded-2xl shadow-xl max-w-md w-full"
                />
              </div>
              <p className="mt-6 text-center text-gray-400 max-w-xl mx-auto">
                Instantly switch between your brand configurations — color palettes, components, and design systems — to match your audience, mood, or campaign.
              </p>
            </section>

            {/* Impact Metrics Section */}
            <section id="impact-metrics" className="py-12 px-6 bg-white text-black dark:bg-neutral-900 dark:text-white">
              <h2 className="text-3xl font-bold mb-6 text-center">Sustainability Impact</h2>
              <div className="flex justify-center">
                <img
                  src="/assets/stats.png"
                  alt="Impact Metrics"
                  className="rounded-xl shadow-md max-w-[90%] md:max-w-5xl"
                />
              </div>
              <p className="mt-6 text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Data-driven metrics showcasing year-on-year carbon footprint, energy intensity, and total consumption. See how our portfolio evolves toward greener outcomes.
              </p>
            </section>

            {/* Showcase Section */}
            <Section id="showcase" title="Our Work" videoSrc="/assets/showcase work.mp4">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Portfolio items here */}
              </div>
            </Section>
            {/* Testimonials Section */}
            <Section id="testimonials" title="What Clients Say" videoSrc="/assets/testimonials.mp4">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Testimonial cards here */}
              </div>
            </Section>
            {/* Contact Section */}
            <Section id="contact" title="Get in Touch">
              <div className="max-w-2xl mx-auto">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
            </Section>
          </div>
        </ThemeProvider>
      )}
    </>
  );
}

export default App; 