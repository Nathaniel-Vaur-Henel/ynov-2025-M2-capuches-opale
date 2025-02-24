import * as z from "zod";

export const AdventurerFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
<<<<<<< HEAD
  archetype: z.string().min(1, "La spécialité est requis"),
=======
  archetype: z.string().min(1, "L'archétype est requis"),
>>>>>>> 42f039e (resolution de conflit)
  experience: z.number().int().min(0, "L'expérience est requise"),
  daily_rate: z.number().int().min(0, "Le taux journalier est requis"),
});
