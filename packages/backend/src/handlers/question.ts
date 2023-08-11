import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import { ERRORS } from "../constants";
import {
	fetchCountriesWithCapitals,
	format,
	generateQuizOptions,
} from "../utils";
import cache from "../utils/cache";

/**
 * Gathers data from the countries endpoint.
 * Returns a selected country, and three options for the User to pick from.
 *
 * returns {{
 *  country: "England",
 *  options: ["London", "...", "..."]
 * }}
 */
export const handler: APIGatewayProxyHandler = async (event, context) => {
	try {
		const countries = await fetchCountriesWithCapitals();

		if (!countries) {
			throw new Error(ERRORS.COUNTRIES_NOT_FOUND);
		}

		const options = generateQuizOptions(countries); // Get the answers array

		if (!options) {
			console.log(
				"[question-handler] Something went wrong gathering the answers!"
			);
			throw new Error(ERRORS.OPTIONS_FAILED_TO_GENERATE);
		}

		const [correctAnswer] = options; // Get the correct answer from the getCountryAnswers call. (ALWAYS first)

		const uuid = uuidv4();

		cache.put(uuid, correctAnswer); // Put the answer into the cache.

		return {
			statusCode: 200,
			body: JSON.stringify({
				selected: correctAnswer.country,
				options: format(options), // Shuffle, and only return the capitals
				uuid: uuid, // answer.ts will query this to ensure that it does not recall the endpoint.
			}),
		};
	} catch (error) {
		console.log("[question-handler] " + error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: ERRORS.GENERIC_ERROR_MESSAGE,
				error: error,
			}),
		};
	}
};
