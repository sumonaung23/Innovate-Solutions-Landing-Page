import React, { useRef, useState, useEffect } from 'react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger the animation only once when the element comes into view
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15, // Animate when 15% of the section is visible
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="bg-gray-50 py-20 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`order-2 md:order-1 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Your Partner in Digital Innovation
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Founded in 2015, Innovate Solutions was born from a desire to bridge the gap between business needs and technological possibilities. Our mission is to empower organizations of all sizes with the tools and strategies they need to thrive in an ever-evolving digital world.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              We believe in building lasting relationships with our clients, working collaboratively to understand their unique challenges and deliver tailored solutions that drive real results.
            </p>
          </div>
          <div
             className={`order-1 md:order-2 transition-all duration-1000 ease-out delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <img
              src="https://picsum.photos/id/20/600/400"
              alt="Team collaborating"
              loading="lazy"
              decoding="async"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;