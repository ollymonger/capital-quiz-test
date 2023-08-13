// User should be able to answer here.
import { APIGatewayProxyHandler } from 'aws-lambda';
import { ERRORS } from '../constants';
import { PostAnswerEventType } from '../types';
import { checkAnswer } from '../utils/answer';
import { fetchCountriesWithCapitals } from '../utils/countries';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    if (!event.body) throw new Error('No body parsed.');

    const parsed: PostAnswerEventType = JSON.parse(event.body);

    console.log(parsed);

    if (!parsed) throw new Error(ERRORS.ANSWERS_BODY_INCORRECT_FORMAT);

    const data = await fetchCountriesWithCapitals();

    if (!data) throw new Error(ERRORS.COUNTRIES_DATA_MALFORMED);

    const answerStatus = await checkAnswer(parsed, data);

    if (!answerStatus) {
      throw new Error('Something went wrong!');
    }

    if (!answerStatus.isCorrect) {
      console.log(`[answer-handler]: Answer: ${parsed.answer} is not correct! Correct: ${answerStatus.correct}`);
      return {
        statusCode: 200,
        body: JSON.stringify({
          correctAnswer: answerStatus.correct,
          correct: false, // used to show that the answer is incorrect!
          country: parsed.country,
        }),
      };
    }

    // Answer was correct!
    return {
      statusCode: 200,
      body: JSON.stringify({
        correct: true,
        correctAnswer: answerStatus.correct,
        country: parsed.country,
      }),
    };
  } catch (error) {
    console.log('[answer-handler] ' + error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: ERRORS.GENERIC_ERROR_MESSAGE,
        error: error,
      }),
    };
  }
};
