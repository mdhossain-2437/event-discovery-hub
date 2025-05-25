import React, { useEffect, useState } from "react";

const LoadingAnimation = ({ message = "Authentication in progress..." }) => {
	const [showEnhancedEffects, setShowEnhancedEffects] = useState(false);

	// Only enable enhanced effects after a brief delay to create a progressive reveal
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowEnhancedEffects(true);
		}, 700);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center animate-[floatUp_0.4s_ease-out]">
			<div
				className="glass p-8 rounded-lg max-w-sm w-full"
				style={{
					animation: showEnhancedEffects ? "pulse-glow 2s infinite" : "none",
					transform: "translateZ(0)",
				}}
			>
				<div className="flex flex-col items-center text-center">
					{/* Main animated element */}
					<div className="relative h-24 w-24 mb-4">
						{/* Outer circle with glow */}
						<div className="absolute inset-0 rounded-full border-4 border-primary/60 animate-pulse"></div>

						{/* Spinning inner circle */}
						<div className="absolute inset-3 rounded-full border-t-4 border-primary animate-spin"></div>

						{/* Central dot with pulse */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div
								className={`h-4 w-4 rounded-full bg-primary animate-ping ${
									showEnhancedEffects ? "shadow-lg shadow-primary/50" : ""
								}`}
							></div>
						</div>

						{/* Outer particles */}
						<div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-2 w-2 rounded-full bg-secondary animate-[bounce_1s_infinite_0.1s]"></div>
						<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 w-2 rounded-full bg-secondary animate-[bounce_1s_infinite_0.3s]"></div>
						<div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-2 w-2 rounded-full bg-secondary animate-[bounce_1s_infinite_0.5s]"></div>
						<div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-2 w-2 rounded-full bg-secondary animate-[bounce_1s_infinite_0.7s]"></div>

						{/* Extra particles that show up after delay */}
						{showEnhancedEffects && (
							<>
								<div className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-accent animate-[bounce_1.2s_infinite_0.2s]"></div>
								<div className="absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-accent animate-[bounce_1.2s_infinite_0.4s]"></div>
								<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-white/20 animate-[rotate-3d_3s_linear_infinite]"></div>
							</>
						)}
					</div>

					{/* Message text with animation */}
					<h3 className="mt-4 text-xl font-medium text-white animate-[floatDown_0.5s_ease-out]">
						{message}
					</h3>

					{/* Typing animation dots */}
					<div className="flex mt-2 space-x-1">
						<div className="h-2 w-2 bg-primary rounded-full animate-[bounce_0.6s_infinite_0.1s]"></div>
						<div className="h-2 w-2 bg-primary rounded-full animate-[bounce_0.6s_infinite_0.2s]"></div>
						<div className="h-2 w-2 bg-primary rounded-full animate-[bounce_0.6s_infinite_0.3s]"></div>
					</div>

					{/* Subtle hint text */}
					<p className="mt-4 text-sm text-gray-400 animate-[floatUp_0.6s_ease-out]">
						Your digital adventure awaits...
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoadingAnimation;

