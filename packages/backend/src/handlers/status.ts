import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  console.log("[STATUS]: Up and running");
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};
