import { Container, Typography } from "@mui/material";
import React from "react";
import { SideButton } from "./SideButton";

export function Header() {
	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "row",
				width: "100%",
				height: "100%",
				alignItems: "center",
			}}
		>
			<div
				style={{
					flex: "70%",
				}}
			>
				<Typography variant="h5">Capital Quiz</Typography>
			</div>

			<SideButton />
		</Container>
	);
}
