import { createContext, useContext } from "react";
import { FetchQuestionResult } from "../../types/FetchQuestionResult";
import { PostAnswerResult } from "../../types/PostAnswerResult";

type ContextType = {
	loading: boolean;
	setLoading: (bool: boolean) => void;
	nextQuestion: () => Promise<FetchQuestionResult | null>;
	answerQuestion: (answer: string) => void;
	awaitingAnswer: boolean;
	setAwaitingAnswer: (bool: boolean) => void;
	answerResponse: PostAnswerResult | null;
	updateAnswerResponse: (answer: PostAnswerResult) => void;
	updateCurrentQuestion: (question: FetchQuestionResult) => void;
	currentQuestion: FetchQuestionResult | null;
	score: number;
	incrementScore: () => void;
};

export const QuizContext = createContext<ContextType | null>(null);

export const useQuizContext = (): ContextType | null => {
	const context = useContext(QuizContext);

	if (!context) {
		console.error(
			"Error, useQuizContext needs to be used within a QuizContextProvider."
		);
		return null;
	}

	return context;
};
