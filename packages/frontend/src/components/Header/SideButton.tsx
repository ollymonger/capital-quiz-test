import { Button, Typography } from "@mui/material";
import React from "react";
import { useQuizContext } from "../context/context";

export function SideButton() {
	const quizContext = useQuizContext();

	if (!quizContext) return;
	return (
		<div
			style={{
				flex: "30%",
				display: "flex",
				justifyContent: "center",
				flexDirection: "row",
			}}
		>
			<Typography
				variant="caption"
				sx={{ direction: "row", paddingRight: ".5em" }}
			>
				Score: {quizContext.score}
			</Typography>
			<Button variant="contained" onClick={() => quizContext.nextQuestion()}>
				Restart
			</Button>
		</div>
	);
}
