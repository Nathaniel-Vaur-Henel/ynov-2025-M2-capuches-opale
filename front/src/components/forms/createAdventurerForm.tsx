import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Container, Box, TextField, Button } from "@mui/material";
import { AdventurerFormSchema } from "../../utils/validation";

type FormData = z.infer<typeof AdventurerFormSchema>;

export function AdventurerForm() {
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
      daily_rate: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Données du formulaire :", data);
  };

  return (
    <div>
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
          <Controller
            name="archetype"
            control={control}
            render={({ field }) => (
              <TextField
                label="Spécialité"
                variant="outlined"
                fullWidth
                error={Boolean(errors.archetype)}
                helperText={errors.archetype?.message}
                {...field}
              />
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
            name="daily_rate"
            control={control}
            render={({ field }) => (
              <TextField
                label="Taux journalier"
                type="number"
                fullWidth
                error={Boolean(errors.daily_rate)}
                helperText={errors.daily_rate?.message}
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
      </Container>
    </div>
  );
}
