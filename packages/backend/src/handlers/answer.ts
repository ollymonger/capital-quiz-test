// User should be able to answer here.
import { APIGatewayProxyHandler } from "aws-lambda";
import { ERRORS } from "../constants";
import { PostAnswerEventType } from "../types";
import { checkAnswer } from "../utils/answer";
import { fetchCountriesWithCapitals } from "../utils/countries";

export const handler: APIGatewayProxyHandler = async (event, context) => {
	try {
		if (!event.body) throw new Error("No body parsed.");

		const parsed: PostAnswerEventType = JSON.parse(event.body);

		if (!parsed) throw new Error("Body was not in correct format.");

		const data = await fetchCountriesWithCapitals();

		const answerStatus = await checkAnswer(parsed, data);

		if (!answerStatus) throw new Error("Countries data incorrect");

		if (!answerStatus.isCorrect) {
			console.log(
				`[answer-handler]: Answer: ${parsed.answer} is not correct! Correct: ${answerStatus.correct}`
			);
			return {
				statusCode: 400,
				body: JSON.stringify({
					correctAnswer: answerStatus.correct,
					correct: false, // used to show that the answer is incorrect!
				}),
			};
		}

		// Answer was correct!
		return {
			statusCode: 200,
			body: JSON.stringify({
				correct: true, // used to show that the answer is incorrect!
			}),
		};
	} catch (error) {
		console.log("[answer-handler] " + error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: ERRORS.GENERIC_ERROR_MESSAGE,
				error: error,
			}),
		};
	}
};
