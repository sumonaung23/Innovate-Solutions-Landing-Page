
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-gray-50 py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
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
          <div className="order-1 md:order-2">
            <img 
              src="https://picsum.photos/id/20/600/400" 
              alt="Team collaborating" 
              className="rounded-lg shadow-xl w-full h-auto object-cover" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
