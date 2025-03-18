import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import {
    Container,
    Box,
    TextField,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import { RequestFormSchema } from "../../utils/validation.ts";

type FormData = z.infer<typeof RequestFormSchema>;

export default function RequestForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(RequestFormSchema),
        defaultValues: {
            title: "",
            description: "",
            bounty: 0,
            due_date: new Date().toISOString().split("T")[0],
            backer: "",
        },
    });

    const [toast, setToast] = React.useState<{
        open: boolean;
        severity: "success" | "error";
        message: string;
    }>({ open: false, severity: "success", message: "" });

    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const response = await fetch("/api/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la création de la requête");
            }   
            return response.json();
        },
        onSuccess: (data) => {
            console.log("Requête créé avec succès :", data);
            setToast({
                open: true,
                severity: "success",
                message: "Requête créé avec succès !",
            });
        },
        onError: (error) => {
            console.error("Erreur lors de la création de la requête :", error);
            setToast({
                open: true,
                severity: "error",
                message: "Erreur lors de la création de la requête",
            });
        },
    });

    const onSubmit = (data: FormData) => {
        mutation.mutate(data);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-xl text-gray-900 font-semibold mb-2">
                Créer une requête
            </h1>
            <Container maxWidth="sm">
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Titre"
                                variant="outlined"
                                fullWidth
                                error={Boolean(errors.title)}
                                helperText={errors.title?.message}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            error={Boolean(errors.description)}
                            helperText={errors.description?.message}
                            {...field}
                        />
                        )}
                    />
                    <Controller
                        name="bounty"
                        control={control}
                        render={({ field }) => (
                        <TextField
                            label="Prime"
                            variant="outlined"
                            type="number"
                            fullWidth
                            error={Boolean(errors.bounty)}
                            helperText={errors.bounty?.message}
                            onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === "" ? "" : Number(value));
                            }}
                            value={field.value}
                        />
                        )}
                    />
                    <Controller
                        name="due_date"
                        control={control}
                        render={({ field }) => (
                        <TextField
                            label="Date d'échéance"
                            type="date"
                            fullWidth
                            error={Boolean(errors.due_date)}
                            helperText={errors.due_date?.message}
                            onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === "" ? "" : String(value));
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