import React from "react";
import { Link } from "react-router-dom";

const deals = [
  {
   
    image: "./Digiimage/21.avif",
  },
  {
    
    image: "./Digiimage/22.avif",
  },
  {
   
    image: "./Digiimage/23.avif",
  },
  {
  
    image: "./Digiimage/24.avif",
  },
];

const LimitedTimeDeals = () => {
  return (
    <div className="bg-gray-100 py-10 px-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Limited Time Deals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {deals.map((deal, index) => (
          <div
            key={index}
            className=" relative"
          >
            <Link to={"/product"}>
              <img
                src={deal.image}
                className="mx-auto object-contain drop-shadow-md"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimitedTimeDeals;
