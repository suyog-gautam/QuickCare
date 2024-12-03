import React from "react";
import { Link } from "react-router-dom"; // Ensure this is imported
import { specialityData } from "../assets/assets/"; // Adjust the path if necessary

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl font-semibold text-gray-900">
            Find by Speciality
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
        </div>

        <div className="flex justify-center gap-8 flex-wrap">
          {specialityData.map((item, index) => (
            <Link
              to={`/doctors/${item.speciality.toLowerCase()}`}
              key={index}
              className="flex flex-col items-center group hover:translate-y-[-10px] transition-all duration-400 ease-in-out"
            >
              <div className="w-20 h-20 rounded-full  flex items-center justify-center mb-3 ">
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="w-16 sm:w-24 mb-2 object-contain"
                />
              </div>
              <span className="text-sm text-gray-600 text-center">
                {item.speciality}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;
