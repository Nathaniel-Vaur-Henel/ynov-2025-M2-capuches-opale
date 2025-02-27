import { ReactNode, Suspense } from "react";
import LoadingFallback from "./LoadingFallback";

export default function LazyWrapper({ children }: { children: ReactNode }) {
	return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>;
}
