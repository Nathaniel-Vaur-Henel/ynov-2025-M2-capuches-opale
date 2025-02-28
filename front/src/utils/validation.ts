import * as z from "zod";

export const AdventurerFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  archetype: z.string().min(1, "La spécialité est requis"),
  experience: z.number().int().min(0, "L'expérience est requise"),
  dailyRate: z.number().int().min(0, "Le taux journalier est requis"),
});
