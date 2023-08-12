import { Box } from "@mui/material";
import React from "react";

export function FlagHolder({ flagUrl }: { flagUrl: string }) {
	return (
		<Box
			style={{
				display: "flex",
				height: "100%",
				width: "100%",
				border: "1px solid limegreen",
			}}
		>
			Flag would go here.
		</Box>
	);
}
