// components/DealsSection.tsx

import React from "react";

const deals = [
  {
    image: "./Digiimage/2.avif", 
  },
  {
    image: "./Digiimage/3.avif", 
  },
  {
    image: "./Digiimage/4.avif", 
  },
  {
    image: "./Digiimage/5.avif", 
  },
  {
    image: "./Digiimage/6.avif", 
  },
  {
    image: "./Digiimage/7.avif", 
  },
  {
    image: "./Digiimage/8.avif", 
  },
  {
    image: "./Digiimage/3.avif", 
  },

 
];

const DealsSection = () => {
  return (
    <section className="bg-gray-50 py-10 px-4 lg:px-8">
      <h2 className="text-2xl lg:text-3xl font-bold mb-6">Great Deals on Electronics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((item, index) => (
          <div
            key={index}
            className=""
          >

            {/* Image */}
            <div className="">
              <img
                src={item.image}
                alt={item.title}
                className=""
              />
            </div>

            {/* Offer Note */}
            {item.note && (
              <p className="text-xs text-gray-700 font-medium">{item.note}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default DealsSection;
