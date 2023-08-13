import { Container, Typography } from '@mui/material';
import React from 'react';
import { COUNTRIES_FACTS } from '../../../data/countries_facts';
import { useQuizContext } from '../../context/context';
import { Result } from './Result';

export function AnswerResultContainer() {
  const quizContext = useQuizContext();

  if (!quizContext) return;

  const proceedToNext = () => {
    quizContext.nextQuestion();
  };

  const randomFactIndex = Math.floor(Math.random() * COUNTRIES_FACTS.length); // Selects a random fact to be displayed.

  return (
    <Container
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: 'darkgray',
        border: '1px solid limegreen',
        justifyContent: 'center',
      }}>
      {quizContext.answerResponse && quizContext.awaitingAnswer ? (
        <Result
          country={quizContext.answerResponse.country}
          capital={quizContext.answerResponse.correctAnswer}
          onClick={proceedToNext}
          result={quizContext.answerResponse.correct}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <br />
          <Typography variant="h6">Did you know?</Typography>
          <br />
          <Typography variant="caption">{COUNTRIES_FACTS[randomFactIndex]}</Typography>
        </div>
      )}
    </Container>
  );
}
