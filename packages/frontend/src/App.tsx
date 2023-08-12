import React from "react";
import { Layout } from "./components/Layout/Layout";
import { QuestionContainer } from "./components/QuestionSection/QuestionContainer/QuestionContainer";
export function App() {
	return (
		<Layout>
			<QuestionContainer />
		</Layout>
	);
}
