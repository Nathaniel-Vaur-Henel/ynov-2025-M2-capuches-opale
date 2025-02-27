import { useEffect, useState } from "react";
import AdventurerCard from "../ui/AdventurerCard";

interface Adventurer {
  id: number;
  name: string;
  experience: number;
  archetype: string;
  dailyRate: number;
  image?: string;
}

const fetchAdventurers = async (): Promise<Adventurer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Eldon", experience: 120, archetype: "Guerrier", dailyRate: 50 },
        { id: 2, name: "Lysara", experience: 450, archetype: "Mage", dailyRate: 75 },
        { id: 3, name: "Dorian", experience: 900, archetype: "Assassin", dailyRate: 100 },
        { id: 4, name: "Seraphine", experience: 1800, archetype: "Paladin", dailyRate: 125 },
        { id: 5, name: "Kael", experience: 2500, archetype: "Archer", dailyRate: 150 },
      ]);
    }, 1000);
  });
};

export default function Adventurers() {
  const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdventurers().then((data) => {
      setAdventurers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Aventuriers</h1>
      {loading ? (
        <p className="text-gray-600">Chargement des aventuriers...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adventurers.map((adventurer) => (
            <AdventurerCard key={adventurer.id} {...adventurer} />
          ))}
        </div>
      )}
    </div>
  );
}
