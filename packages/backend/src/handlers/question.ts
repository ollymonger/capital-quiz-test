import { APIGatewayProxyHandler } from "aws-lambda";
import { ERRORS } from "../constants";
import { getCountriesData, getCountryAnswers } from "../utils/countries";
import { format } from "../utils/format";

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
    const countries = await getCountriesData();

    if (!countries) {
      throw new Error(ERRORS.COUNTRIES_NOT_FOUND);
    }

    const options = getCountryAnswers(countries.filter((item) => item.capital)); // Get the answers array

    if (!options) {
      console.log(
        "[question-handler] Something went wrong gathering the answers!"
      );
      throw new Error(ERRORS.OPTIONS_FAILED_TO_GENERATE);
    }

    const [correctAnswer] = options; // Get the correct answer from the getCountryAnswers call. (ALWAYS first)

    return {
      statusCode: 200,
      body: JSON.stringify({
        selected: correctAnswer.country,
        options: format(options), // Shuffle, and only return the capitals
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