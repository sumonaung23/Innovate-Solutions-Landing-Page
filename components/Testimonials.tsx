
import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Loved by Businesses Worldwide</h2>
          <p className="mt-4 text-lg text-gray-600">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Innovate Solutions.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <figure key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm flex flex-col">
              <svg className="absolute top-6 left-6 h-8 w-8 text-indigo-100" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.33 15.333H5.33V11.333H9.33V15.333ZM21.33 15.333H17.33V11.333H21.33V15.333ZM12 21.333C12 23.155 10.588 24.667 8.665 24.667H5.33C4.045 24.667 3 23.6 3 22.333V11.333C3 10.045 4.045 9 5.33 9H12L13.333 4H20L18.667 9H26.67C27.955 9 29 10.045 29 11.333V18.667C29 22.845 26.215 25.433 22.667 25.333L21.333 21.333H24C24.368 21.333 24.667 21.022 24.667 20.667V19.333C24.667 18.978 24.368 18.667 24 18.667H21.333C19.41 18.667 18 20.155 18 22L12 21.333Z" />
              </svg>
              <blockquote className="mt-8 text-gray-600 relative z-10 flex-grow">
                <p>"{testimonial.quote}"</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center">
                <img 
                  src={testimonial.avatarUrl} 
                  alt="" 
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-12 rounded-full object-cover" 
                />
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;