import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useIsDesktop } from "../../hooks";
import { useFetchQuestion } from "../../hooks/useFetchQuestion/useFetchQuestion";
import { FetchQuestionResult } from "../../types/FetchQuestionResult";
import { Header } from "../Header/Header";
import { QuizContext } from "../context/context";
import { LayoutContainer, LayoutGrid } from "./styles";

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const isDesktop = useIsDesktop();

	const [loading, setLoading] = useState<boolean>(true);

	const [currentQuestion, setCurrentQuestion] =
		useState<FetchQuestionResult | null>({
			selected: null,
			options: null,
		});

	const nextQuestionAsync = async () => {
		try {
			setLoading(true);
			const question = await useFetchQuestion(); // Call the new function
			if (question) {
				setLoading(false);
				setCurrentQuestion(question);
			}
			return question;
		} catch (error) {
			console.error("Error fetching next question:", error);
			return null;
		}
	};

	return (
		<LayoutContainer
			disableGutters={!isDesktop}
			sx={{
				paddingLeft: { xs: 0, sm: 0, md: 2, lg: 6 },
				paddingRight: { xs: 0, sm: 0, md: 2, lg: 6 },
			}}
		>
			<QuizContext.Provider
				value={{
					loading: loading,
					setLoading: (loading) => setLoading(loading),
					nextQuestion: nextQuestionAsync,
					answerQuestion: (answer) => console.log(answer),
					currentQuestion: currentQuestion,
					updateCurrentQuestion: setCurrentQuestion,
				}}
			>
				<LayoutGrid container direction="column" spacing={!isDesktop ? 0 : 1}>
					<Grid item xs={1} sx={{ background: "limegreen" }}>
						<Header />
					</Grid>
					<Grid item xs={11}>
						{children}
					</Grid>
				</LayoutGrid>
			</QuizContext.Provider>
		</LayoutContainer>
	);
};
