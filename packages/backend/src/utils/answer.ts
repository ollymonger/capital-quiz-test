import { Country, PostAnswerEventType } from "../types";

export async function checkAnswer(
	answer: PostAnswerEventType,
	data: Country[] | null
) {
	if (!data) {
		console.log("no data");
		return null;
	}

	const countryObject = data.find((country) => country.name === answer.country);

	if (!countryObject) {
		console.log("no country obj");
		return null;
	}

	if (countryObject.capital != answer.answer) {
		// Capital was incorrect.
		return {
			correct: countryObject.capital,
			isCorrect: false,
		};
	}

	return {
		correct: countryObject.capital,
		isCorrect: true,
	};
}
