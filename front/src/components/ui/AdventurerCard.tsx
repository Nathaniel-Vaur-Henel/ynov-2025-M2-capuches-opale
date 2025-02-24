import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaUser, FaEuroSign } from "react-icons/fa";

interface AdventurerCardProps {
  name: string;
  experience: number;
  archetype: string;
  dailyRate: number;
  image?: string;
}

const AdventurerCard: React.FC<AdventurerCardProps> = ({ name, experience, archetype, dailyRate, image }) => {
  return (
    <div className="w-80 bg-white shadow-lg rounded-xl border border-gray-300 p-4 flex flex-col items-center">
      {/* Name Section */}
      <div className="text-lg font-semibold text-gray-800 mb-2">{name}</div>
      
      {/* Character Portrait */}
      <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 shadow-md mb-3">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <FaUser className="w-full h-full text-gray-400" />
        )}
      </div>
      
      {/* Info Section */}
      <div className="w-full text-sm text-gray-600 space-y-2">

        <div className="flex items-center justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Expérience :</span>
          <span className="flex items-center text-gray-800">
            <FaStar className="w-5 h-5 text-yellow-500 mr-1" /> {experience}pts
          </span>
        </div>

        <div className="flex items-center justify-between border-b pb-2">
          <span className="font-semibold text-gray-700">Spécialité :</span>
          <span className="flex items-center text-gray-800">
            {archetype}
          </span>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-gray-700">Taux journalier :</span>
          <span className="flex items-center text-gray-800">
            <FaEuroSign className="w-5 h-5 text-green-500 mr-1" /> {dailyRate} PO
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdventurerCard;