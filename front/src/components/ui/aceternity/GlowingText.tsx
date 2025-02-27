import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowingTextProps {
	children: ReactNode;
	className?: string;
	delay?: number;
}

const GlowingText = ({
	children,
	className = "",
	delay = 0,
}: GlowingTextProps) => {
	return (
		<motion.span
			className={`bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 ${className}`}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.6,
				delay: delay,
				ease: "easeOut",
			}}
		>
			{children}
		</motion.span>
	);
};

export default GlowingText;
