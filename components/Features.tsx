
import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section id="features" className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Innovate?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our platform is built to empower your team and streamline your operations from day one.
          </p>
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 p-4 rounded-full">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
