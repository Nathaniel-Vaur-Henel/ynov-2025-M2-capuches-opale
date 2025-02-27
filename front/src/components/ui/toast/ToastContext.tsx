import { createContext, useContext } from "react";

export type ToastType = "success" | "info" | "warning" | "error";

export interface ToastContextType {
	showToast: (message: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}
