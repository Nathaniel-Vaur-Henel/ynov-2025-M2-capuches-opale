import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { Archetype } from "../../utils/enum";
import {
  Container,
  Box,
  TextField,
  Button,
  FormControl,
  Snackbar,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
} from "@mui/material";
import { AdventurerFormSchema } from "../../utils/validation";

const archetypes = Object.entries(Archetype).map(([key, value]) => ({
  key,
  value
}));

type FormData = z.infer<typeof AdventurerFormSchema>;

export default function AdventurerForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(AdventurerFormSchema),
    defaultValues: {
      name: "",
      archetype: "",
      experience: 0,
      dailyRate: 0,
    },
  });

  const [toast, setToast] = React.useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({ open: false, severity: "success", message: "" });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("http://localhost:8080/capuches-opale/adventurer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'aventurier");
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log("Adventurier créé avec succès :", data);
      setToast({
        open: true,
        severity: "success",
        message: "Adventurier créé avec succès !",
      });
    },
    onError: (error) => {
      console.error("Erreur lors de la création de l'aventurier :", error);
      setToast({
        open: true,
        severity: "error",
        message: "Erreur lors de la création de l'aventurier",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl text-gray-900 font-semibold mb-2">
        Créer un aventurier
      </h1>
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Nom"
                variant="outlined"
                fullWidth
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                {...field}
              />
            )}
          />

         {/* Composant Select pour le champ "archetype" */}
        <Controller
          name="archetype"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth variant="outlined" error={Boolean(errors.archetype)}>
              <InputLabel id="archetype-label">Spécialité</InputLabel>
              <Select
                labelId="archetype-label"
                label="Spécialité"
                {...field}
              >
                {archetypes.map((item) => (
                  <MenuItem key={item.key} value={item.key}>
                  {item.value}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.archetype ? errors.archetype.message : ""}
              </FormHelperText>
            </FormControl>
          )}
        />
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <TextField
                label="Niveau d'expérience"
                variant="outlined"
                type="number"
                fullWidth
                error={Boolean(errors.experience)}
                helperText={errors.experience?.message}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? "" : Number(value));
                }}
                value={field.value}
              />
            )}
          />
          <Controller
            name="dailyRate"
            control={control}
            render={({ field }) => (
              <TextField
                label="Taux journalier"
                type="number"
                fullWidth
                error={Boolean(errors.dailyRate)}
                helperText={errors.dailyRate?.message}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? "" : Number(value));
                }}
                value={field.value}
              />
            )}
          />
          <Button variant="contained" color="primary" type="submit">
            Envoyer
          </Button>
        </Box>
        <Snackbar
          open={toast.open}
          autoHideDuration={6000}
          onClose={() => setToast({ ...toast, open: false })}
        >
          <Alert
            severity={toast.severity}
            onClose={() => setToast({ ...toast, open: false })}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
