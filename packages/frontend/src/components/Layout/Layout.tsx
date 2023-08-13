import { Grid } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useIsDesktop } from '../../hooks';
import { FetchQuestionResult, PostAnswerResult } from '../../types';
import { fetchQuestion, postAnswer } from '../../utils';
import { Header } from '../Header/Header';
import { QuizContext } from '../context/context';
import { LayoutContainer, LayoutGrid } from './styles';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useIsDesktop();

  const [loading, setLoading] = useState<boolean>(true);
  const [awaitingAnswer, setAwaitingAnswer] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const [currentQuestion, setCurrentQuestion] = useState<FetchQuestionResult | null>({
    selected: null,
    options: null,
  });

  const [answerResponse, setAnswerResponse] = useState<PostAnswerResult | null>(null);

  const nextQuestionAsync = async () => {
    try {
      setLoading(true);
      const question = await fetchQuestion(); // Call the new function
      if (question) {
        setLoading(false);
        setAnswerResponse(null);
        setCurrentQuestion(question);
      }
      return question;
    } catch (error) {
      console.error('Error fetching next question:', error);

      enqueueSnackbar({
        message: 'Error fetching next question!',
        variant: 'error',
      }); // Providers a small error toast. If something goes wrong.
      return null;
    }
  };

  const answerAsync = async (answer: string) => {
    try {
      setAwaitingAnswer(false);
      if (!currentQuestion) {
        return null;
      }
      const res = await postAnswer({
        answer,
        question: currentQuestion.selected,
      }); // Call the new function

      if (res) {
        setAwaitingAnswer(true);
        setAnswerResponse(res);
        if (res.correct) {
          // plus one point for incorrect answers

          setScore(score + 1);
        } else {
          // minus one point for incorrect answers
          setScore(score - 1);
        }
      }
      return res;
    } catch (error) {
      console.error('Error answering question!', error);

      enqueueSnackbar({
        message: 'Error answering the question!',
        variant: 'error',
      }); // Providers a small error toast. If something goes wrong.
      return null;
    }
  };

  return (
    <LayoutContainer
      disableGutters={!isDesktop}
      sx={{
        paddingLeft: { xs: 0, sm: 0, md: 2, lg: 6 },
        paddingRight: { xs: 0, sm: 0, md: 2, lg: 6 },
      }}>
      <QuizContext.Provider
        value={{
          loading: loading,
          setLoading: (loading) => setLoading(loading),
          nextQuestion: nextQuestionAsync,
          answerQuestion: async (answer) => answerAsync(answer),
          awaitingAnswer: awaitingAnswer,
          setAwaitingAnswer: setAwaitingAnswer,
          answerResponse: answerResponse,
          updateAnswerResponse: (answer) => setAnswerResponse(answer),
          currentQuestion: currentQuestion,
          updateCurrentQuestion: setCurrentQuestion,
          score,
          incrementScore: () => setScore(score + 1),
        }}>
        <LayoutGrid container direction="column" spacing={!isDesktop ? 0 : 1}>
          <Grid item xs={1} sx={{ background: 'limegreen' }}>
            <Header />
          </Grid>
          <Grid item xs={11}>
            {children}
          </Grid>
        </LayoutGrid>
      </QuizContext.Provider>
    </LayoutContainer>
  );
};
