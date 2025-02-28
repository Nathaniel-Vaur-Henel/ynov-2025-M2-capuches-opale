import * as z from "zod";

export const AdventurerFormSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  archetype: z.string().min(1, "La spécialité est requis"),
  experience: z.number().int().min(0, "L'expérience est requise"),
  dailyRate: z.number().int().min(0, "Le taux journalier est requis"),
});

export const RequestFormSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  bounty: z.number().int().min(0, "La prime est requise"),
  due_date: z.string().min(1, "La date d'échéance est requise"),
  backer: z.string().min(1, "Le commanditaire est requis")
});
