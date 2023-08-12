import { Button, Container, Typography } from "@mui/material";
import React from "react";

export function AnswerResult({ country }: { country: string }) {
	return (
		<Container sx={{ display: "flex", flexDirection: "column" }}>
			<Typography>Correct!</Typography>
			<Typography>{country}'s capital is: X</Typography>
			<Button>Proceed to the next Question</Button>
		</Container>
	);
}
