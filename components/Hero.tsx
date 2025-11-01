
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gray-50">
      <div className="container mx-auto px-6 py-24 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Transform Your Business with <span className="text-indigo-600">Innovate Solutions</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600">
            We provide cutting-edge technology and expert guidance to help you navigate the complexities of the digital landscape and achieve sustainable growth.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#contact"
              className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-transform transform hover:scale-105"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto bg-white text-indigo-600 border border-indigo-200 px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-50 transition-transform transform hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
