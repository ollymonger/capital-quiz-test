import { Button, Container, Typography } from "@mui/material";
import React from "react";

export function Result({
	country,
	capital,
	onClick,
	result,
}: {
	country: string;
	capital: string;
	onClick: () => void;
	result: boolean;
}) {
	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Typography variant="h3" sx={{ color: result ? "green" : "red" }}>
				{result ? "Correct" : "Incorrect"}
			</Typography>
			<br />
			<Typography variant="body1" sx={{ alignItems: "center" }}>
				{country}'s capital is: {capital}
			</Typography>
			<Button onClick={onClick} variant="outlined">
				<Typography variant="body2">NEXT QUESTION</Typography>
			</Button>
		</Container>
	);
}
