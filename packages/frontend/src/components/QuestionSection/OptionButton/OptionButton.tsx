import { Button } from "@mui/material";
import React from "react";
import { useQuizContext } from "../../context/context";

export function OptionButton({
	title,
	disabled,
}: {
	title: string;
	disabled: boolean;
}) {
	const quizContext = useQuizContext();

	if (!quizContext) return;

	return (
		<Button
			fullWidth
			onClick={() => quizContext.answerQuestion(title)}
			disabled={disabled}
			variant="outlined"
			color="secondary"
			sx={{ color: "whitesmoke" }}
		>
			{title}
		</Button>
	);
}
