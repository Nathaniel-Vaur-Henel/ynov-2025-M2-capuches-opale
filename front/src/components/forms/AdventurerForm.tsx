import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import ShieldIcon from "@mui/icons-material/Shield";
import {
	Alert,
	alpha,
	Box,
	Button,
	Container,
	Divider,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Snackbar,
	Stack,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import Adventurer from "../../types/Adventurer";
import { Archetype } from "../../utils/enum";
import { AdventurerFormSchema } from "../../utils/validation";

const archetypes = Object.entries(Archetype).map(([key, value]) => ({
	key,
	value,
}));

type FormData = z.infer<typeof AdventurerFormSchema>;

interface AdventurerFormProps {
	adventurer?: Adventurer;
}

export default function AdventurerForm({ adventurer }: AdventurerFormProps) {
	const theme = useTheme();
	const navigate = useNavigate();
	const isEditMode = !!adventurer;

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(AdventurerFormSchema),
		defaultValues: {
			name: adventurer?.name || "",
			archetype: adventurer?.archetype || "",
			experience: adventurer?.experience || 0,
			dailyRate: adventurer?.dailyRate || 0,
		},
	});

	// Met à jour le formulaire si l'aventurier change
	useEffect(() => {
		if (adventurer) {
			reset({
				name: adventurer.name || "",
				archetype: adventurer.archetype || "",
				experience: adventurer.experience || 0,
				dailyRate: adventurer.dailyRate || 0,
			});
		}
	}, [adventurer, reset]);

	const [toast, setToast] = React.useState<{
		open: boolean;
		severity: "success" | "error";
		message: string;
	}>({ open: false, severity: "success", message: "" });

	const createMutation = useMutation({
		mutationFn: async (data: FormData) => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/adventurer`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);
			if (!response.ok) {
				throw new Error("Erreur lors de la création de l'aventurier");
			}
			return response.json();
		},
		onSuccess: () => {
			setToast({
				open: true,
				severity: "success",
				message: "Aventurier créé avec succès !",
			});
			reset();
		},
		onError: (error) => {
			console.error("Erreur:", error);
			setToast({
				open: true,
				severity: "error",
				message: "Erreur lors de la création de l'aventurier",
			});
		},
	});

	const updateMutation = useMutation({
		mutationFn: async (data: FormData) => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/adventurer/${adventurer?.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);
			if (!response.ok) {
				throw new Error("Erreur lors de la mise à jour de l'aventurier");
			}
			return response.json();
		},
		onSuccess: () => {
			setToast({
				open: true,
				severity: "success",
				message: "Aventurier mis à jour avec succès !",
			});
			setTimeout(() => navigate("/aventuriers"), 1500);
		},
		onError: (error) => {
			console.error("Erreur:", error);
			setToast({
				open: true,
				severity: "error",
				message: "Erreur lors de la mise à jour de l'aventurier",
			});
		},
	});

	const onSubmit = (data: FormData) => {
		if (isEditMode) {
			updateMutation.mutate(data);
		} else {
			createMutation.mutate(data);
		}
	};

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Paper
				elevation={0}
				sx={{
					borderRadius: 3,
					background: "rgba(15, 23, 42, 0.7)",
					backdropFilter: "blur(12px)",
					border: "1px solid rgba(71, 85, 105, 0.2)",
					boxShadow:
						"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
					overflow: "hidden",
					position: "relative",
				}}
			>
				{/* En-tête stylisé */}
				<Box
					sx={{
						p: 3,
						background: `linear-gradient(135deg, ${alpha(
							theme.palette.primary.dark,
							0.8
						)} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
						display: "flex",
						alignItems: "center",
						gap: 2,
					}}
				>
					<ShieldIcon
						fontSize="large"
						sx={{ color: alpha(theme.palette.common.white, 0.9) }}
					/>
					<Typography
						variant="h5"
						component="h1"
						fontWeight="bold"
						color="white"
					>
						{isEditMode
							? "Modifier l'aventurier"
							: "Créer un nouvel aventurier"}
					</Typography>
				</Box>

				<Box sx={{ p: 4 }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={3}>
							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<TextField
										label="Nom de l'aventurier"
										placeholder="Ex: Aragorn, Geralt de Riv..."
										variant="outlined"
										fullWidth
										error={Boolean(errors.name)}
										helperText={errors.name?.message}
										InputProps={{
											sx: {
												backgroundColor: alpha(
													theme.palette.background.paper,
													0.4
												),
											},
										}}
										{...field}
									/>
								)}
							/>

							<Controller
								name="archetype"
								control={control}
								render={({ field }) => (
									<FormControl
										fullWidth
										variant="outlined"
										error={Boolean(errors.archetype)}
									>
										<InputLabel id="archetype-label">Spécialité</InputLabel>
										<Select
											labelId="archetype-label"
											label="Spécialité"
											sx={{
												backgroundColor: alpha(
													theme.palette.background.paper,
													0.4
												),
											}}
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
							{isEditMode && (
								<Grid container spacing={3}>
									<Grid item xs={12} sm={6}>
										<Controller
											name="experience"
											control={control}
											render={({ field }) => (
												<TextField
													label="Points d'expérience"
													variant="outlined"
													type="number"
													fullWidth
													error={Boolean(errors.experience)}
													helperText={errors.experience?.message}
													InputProps={{
														sx: {
															backgroundColor: alpha(
																theme.palette.background.paper,
																0.4
															),
														},
													}}
													onChange={(e) => {
														const value = e.target.value;
														field.onChange(value === "" ? "" : Number(value));
													}}
													value={field.value}
												/>
											)}
										/>
									</Grid>
								</Grid>
							)}

							<Grid item xs={12} sm={6}>
								<Controller
									name="dailyRate"
									control={control}
									render={({ field }) => (
										<TextField
											label="Taux journalier initial (PO)"
											type="number"
											fullWidth
											error={Boolean(errors.dailyRate)}
											helperText={errors.dailyRate?.message}
											InputProps={{
												sx: {
													backgroundColor: alpha(
														theme.palette.background.paper,
														0.4
													),
												},
											}}
											onChange={(e) => {
												const value = e.target.value;
												field.onChange(value === "" ? "" : Number(value));
											}}
											value={field.value}
										/>
									)}
								/>
							</Grid>

							<Divider
								sx={{ my: 1, borderColor: alpha(theme.palette.divider, 0.5) }}
							/>

							<Box
								sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}
							>
								<Button
									variant="outlined"
									component={Link}
									to="/aventuriers"
									startIcon={<ArrowBackIcon />}
									sx={{
										borderRadius: "10px",
										borderColor: alpha(theme.palette.primary.main, 0.5),
										"&:hover": {
											borderColor: theme.palette.primary.main,
											backgroundColor: alpha(theme.palette.primary.main, 0.1),
										},
									}}
								>
									Retour
								</Button>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									disabled={isSubmitting}
									startIcon={<SaveIcon />}
									sx={{
										borderRadius: "10px",
										background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
										padding: "10px 24px",
										fontWeight: "bold",
										boxShadow: `0 4px 14px ${alpha(
											theme.palette.primary.main,
											0.4
										)}`,
										transition: "all 0.2s ease",
										"&:hover": {
											boxShadow: `0 6px 20px ${alpha(
												theme.palette.primary.main,
												0.6
											)}`,
											transform: "translateY(-2px)",
										},
									}}
								>
									{isEditMode ? "Mettre à jour" : "Créer l'aventurier"}
								</Button>
							</Box>
						</Stack>
					</form>
				</Box>
			</Paper>

			<Snackbar
				open={toast.open}
				autoHideDuration={6000}
				onClose={() => setToast({ ...toast, open: false })}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					elevation={6}
					variant="filled"
					severity={toast.severity}
					onClose={() => setToast({ ...toast, open: false })}
					sx={{ width: "100%" }}
				>
					{toast.message}
				</Alert>
			</Snackbar>
		</Container>
	);
}
