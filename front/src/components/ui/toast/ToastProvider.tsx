import { Alert, Snackbar } from "@mui/material";
import { ReactNode, useState } from "react";
import { ToastContext, ToastType } from "./ToastContext";

export function ToastProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [type, setType] = useState<ToastType>("info");

	const showToast = (message: string, type: ToastType = "info") => {
		setMessage(message);
		setType(type);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<Snackbar
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleClose}
					severity={type}
					elevation={6}
					variant="filled"
					className="w-full rounded-md backdrop-blur-md shadow-lg"
				>
					{message}
				</Alert>
			</Snackbar>
		</ToastContext.Provider>
	);
}
