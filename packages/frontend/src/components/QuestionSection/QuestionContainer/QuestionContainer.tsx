import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useIsDesktop } from "../../../hooks";
import { useFetchQuestion } from "../../../hooks/useFetchQuestion/useFetchQuestion";
import { useQuizContext } from "../../context/context";
import { FlagHolder } from "../FlagHolder/FlagHolder";
import { OptionButton } from "../OptionButton/OptionButton";

export function QuestionContainer() {
	const isDesktop = useIsDesktop();
	const quizContext = useQuizContext();

	if (!quizContext) return;

	useEffect(() => {
		const fetchAndSetQuestion = async () => {
			const nextQuestion = await useFetchQuestion();
			if (nextQuestion) {
				await quizContext.updateCurrentQuestion(nextQuestion);
				await quizContext.setLoading(false);
			}
		};

		fetchAndSetQuestion();
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
						<Typography variant="h5">Can you guess the capital of:</Typography>
					</Grid>
					<Grid
						item
						xs={3}
						sx={{ display: "flex", width: isDesktop ? "35%" : "65%" }}
					>
						<FlagHolder flagUrl="test" />
					</Grid>
					<Grid item xs={1} />
					<Grid item xs={2}>
						<Typography variant="h6">
							{quizContext.currentQuestion.selected}
						</Typography>
					</Grid>
					<Grid item xs={2}></Grid>
					<Grid
						item
						xs={2}
						sx={{ display: "flex", width: "100%", justifyContent: "center" }}
					>
						{quizContext.currentQuestion.options.map((item) => (
							<OptionButton title={item.capital} key={item.capital} />
						))}
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
