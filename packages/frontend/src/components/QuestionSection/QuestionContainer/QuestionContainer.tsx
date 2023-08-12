import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useIsDesktop } from "../../../hooks";
import { fetchQuestion } from "../../../utils";
import { useQuizContext } from "../../context/context";
import { AnswerResultContainer } from "../AnswerResultContainer";
import { FlagHolder } from "../FlagHolder/FlagHolder";
import { OptionsButtonsContainer } from "../OptionButton";

export function QuestionContainer() {
	const isDesktop = useIsDesktop();
	const quizContext = useQuizContext();

	if (!quizContext) return;

	useEffect(() => {
		const fetchAndSetQuestion = async () => {
			const nextQuestion = await fetchQuestion();
			if (nextQuestion) {
				await quizContext.updateCurrentQuestion(nextQuestion);
				await quizContext.setLoading(false);
				// Stops loading and shows the Country
			}
		};

		fetchAndSetQuestion();
		// This gets called on load so that the user will get a question.
	}, []);

	return (
		<Container
			sx={{
				display: "flex",
				width: "100%",
				height: "100%",
			}}
		>
			{!quizContext.loading &&
			quizContext.currentQuestion &&
			quizContext.currentQuestion.options ? (
				<Grid
					container
					direction="column"
					sx={{
						display: "flex",
						width: "100%",
						height: "100%",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Grid item xs={1}>
						<Typography variant="h5" sx={{ color: "whitesmoke" }}>
							Can you guess the capital of:
						</Typography>
					</Grid>
					<Grid
						item
						xs={3}
						sx={{ display: "flex", width: isDesktop ? "35%" : "65%" }}
					>
						<FlagHolder flagUrl="test" />
					</Grid>
					<Grid item xs={2} sx={{ paddingTop: "1em" }}>
						<Typography variant="h5">
							{quizContext.currentQuestion.selected}
						</Typography>
					</Grid>
					<Grid
						item
						xs={3}
						sx={{ display: "flex", width: isDesktop ? "45%" : "65%" }}
					>
						<AnswerResultContainer />
					</Grid>
					<Grid item xs={1} />
					<Grid
						item
						xs={2}
						sx={{ display: "flex", width: "100%", justifyContent: "center" }}
					>
						<OptionsButtonsContainer />
					</Grid>
				</Grid>
			) : (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
					}}
				>
					<CircularProgress color="secondary" />
				</div>
			)}
		</Container>
	);
}
