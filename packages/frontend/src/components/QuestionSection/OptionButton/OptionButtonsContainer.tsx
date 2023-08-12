import React from "react";
import { useQuizContext } from "../../context/context";
import { OptionButton } from "./OptionButton";

export function OptionsButtonsContainer() {
	const quizContext = useQuizContext();

	if (!quizContext) return;

	return (
		<>
			{quizContext.currentQuestion!.options!.map((item) => (
				<OptionButton
					title={item.capital}
					key={item.capital}
					disabled={
						quizContext.awaitingAnswer && Boolean(quizContext.answerResponse)
					}
				/>
			))}
		</>
	);
}
