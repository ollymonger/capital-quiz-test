import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useQuizContext } from "../context/context";

export function Header() {
	const quizContext = useQuizContext();

	if (!quizContext) return;

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
					flex: "75%",
				}}
			>
				<Typography variant="h5">Capital Quiz</Typography>
			</div>

			<div
				style={{
					flex: "25%",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Button variant="contained" onClick={() => quizContext?.nextQuestion()}>
					Restart
				</Button>
			</div>
		</Container>
	);
}
