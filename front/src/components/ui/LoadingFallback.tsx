import { CircularProgress } from "@mui/material";

export default function LoadingFallback() {
	return (
		<div className="flex justify-center items-center h-[50vh]">
			<CircularProgress size={40} className="text-indigo-400" />
		</div>
	);
}
