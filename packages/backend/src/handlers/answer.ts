// User should be able to answer here.
import { APIGatewayProxyHandler } from "aws-lambda";
import cache from "memory-cache";
import { ERRORS } from "../constants";
import { PostAnswerEventType } from "../types";

export const handler: APIGatewayProxyHandler = async (event, context) => {
	try {
		if (!event.body) throw new Error("No body parsed.");

		if (!event.headers["uuid"]) throw new Error("No UUID associated.");

		const parsed: PostAnswerEventType = JSON.parse(event.body);

		if (!parsed) throw new Error("Body was not in correct format.");

		const cached = cache.get(event.headers["uuid"]);

		if (!cached) throw new Error("No cache found.");

		if (cached !== parsed.answer) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					correct: cached,
				}),
			};
		}

		return {
			statusCode: 200,
			body: JSON.stringify({}),
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
