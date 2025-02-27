import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaEuroSign } from "react-icons/fa";

interface AdventurerCardProps {
  name: string;
  experience: number;
  archetype: string;
  dailyRate: number;
  image?: string;
}

const getExperienceAvatar = (experience: number): string => {
  if (experience < 150) return "/images/capgreen.png";
  if (experience < 500) return "/images/capblue.png";
  if (experience < 1000) return "/images/capgold.png";
  if (experience < 2000) return "/images/capelite.png";
  return "/images/capblood.png";
};

const getExperienceStyles = (experience: number): string => {
  if (experience < 150) return "border-green-500 shadow-green-300 hover:shadow-green-400";
  if (experience < 500) return "border-blue-500 shadow-blue-300 hover:shadow-blue-400";
  if (experience < 1000) return "border-yellow-500 shadow-yellow-300 hover:shadow-yellow-400";
  if (experience < 2000) return "border-purple-500 shadow-purple-300 hover:shadow-purple-400";
  return "border-red-500 shadow-red-300 hover:shadow-red-400";
};

const AdventurerCard: React.FC<AdventurerCardProps> = ({ name, experience, archetype, dailyRate, image }) => {
  const avatarSrc = image || getExperienceAvatar(experience);
  const cardStyles = getExperienceStyles(experience);
  
  return (
    <div className={`w-80 bg-white shadow-lg rounded-xl border-4 p-4 flex flex-col items-center transition duration-300 ease-in-out hover:scale-105 ${cardStyles}`}>
      {/* Name Section */}
      <div className="text-lg font-semibold text-gray-800 mb-2">{name}</div>
      
      {/* Character Portrait */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-3 flex items-center justify-center">
        <img src={avatarSrc} alt={name} className="w-20 h-20 object-contain" />
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
