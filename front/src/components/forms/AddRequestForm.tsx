import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SaveIcon from "@mui/icons-material/Save";
import {
	Alert,
	Box,
	Button,
	Container,
	Divider,
	Paper,
	Snackbar,
	Stack,
	TextField,
	Typography,
	alpha,
	useTheme,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import { RequestFormSchema } from "../../utils/validation.ts";

type FormData = z.infer<typeof RequestFormSchema>;

export default function RequestForm() {
	const theme = useTheme();
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
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
			const requestData = {
				title: data.title,
				description: data.description,
				bounty: data.bounty,
				dueDate: data.due_date,
				backer: data.backer,
				status: "PENDING",
			};

			const response = await fetch(`${import.meta.env.VITE_API_URL}/request`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(requestData),
			});
			if (!response.ok) {
				throw new Error("Erreur lors de la création de la requête");
			}
			return response.json();
		},
		onSuccess: (data) => {
			console.log("Requête créée avec succès :", data);
			setToast({
				open: true,
				severity: "success",
				message: "Requête créée avec succès !",
			});
			reset();
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
					<AssignmentIcon
						fontSize="large"
						sx={{ color: alpha(theme.palette.common.white, 0.9) }}
					/>
					<Typography
						variant="h5"
						component="h1"
						fontWeight="bold"
						color="white"
					>
						Créer une nouvelle requête
					</Typography>
				</Box>

				<Box sx={{ p: 4 }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={3}>
							<Controller
								name="title"
								control={control}
								render={({ field }) => (
									<TextField
										label="Titre de la requête"
										placeholder="Ex: Recherche d'un trésor perdu..."
										variant="outlined"
										fullWidth
										error={Boolean(errors.title)}
										helperText={errors.title?.message}
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
								name="description"
								control={control}
								render={({ field }) => (
									<TextField
										label="Description"
										placeholder="Décrivez votre requête en détail..."
										variant="outlined"
										fullWidth
										multiline
										rows={4}
										error={Boolean(errors.description)}
										helperText={errors.description?.message}
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
								name="bounty"
								control={control}
								render={({ field }) => (
									<TextField
										label="Prime (PO)"
										variant="outlined"
										type="number"
										fullWidth
										error={Boolean(errors.bounty)}
										helperText={errors.bounty?.message}
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
											field.onChange(value === "" ? "" : String(value));
										}}
										value={field.value}
									/>
								)}
							/>

							<Controller
								name="backer"
								control={control}
								render={({ field }) => (
									<TextField
										label="Commanditaire"
										placeholder="Nom du commanditaire..."
										variant="outlined"
										fullWidth
										error={Boolean(errors.backer)}
										helperText={errors.backer?.message}
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

							<Divider
								sx={{ my: 1, borderColor: alpha(theme.palette.divider, 0.5) }}
							/>

							<Box
								sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}
							>
								<Button
									variant="outlined"
									component={Link}
									to="/requetes"
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
									Créer la requête
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
