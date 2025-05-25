"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../lib/utils.js";

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
			className
		)}
		{...props}
	/>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => {
	// Add default onError handler if not provided
	const handleProps = {
		...props,
		onError:
			props.onError ||
			((e) => {
				// If the image is a Google profile image, try to reload it with a timestamp
				if (
					props.src &&
					typeof props.src === "string" &&
					(props.src.includes("googleusercontent.com") ||
						props.src.includes("google.com")) &&
					!props.src.includes("?t=")
				) {
					const timestamp = new Date().getTime();
					e.target.src = `${props.src}?t=${timestamp}`;
				}
			}),
	};

	return (
		<AvatarPrimitive.Image
			ref={ref}
			className={cn("aspect-square h-full w-full", className)}
			{...handleProps}
		/>
	);
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			"flex h-full w-full items-center justify-center rounded-full bg-muted",
			className
		)}
		{...props}
	/>
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
