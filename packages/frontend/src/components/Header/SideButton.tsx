import { Button, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useQuizContext } from '../context/context';

export function SideButton() {
  const quizContext = useQuizContext();

  if (!quizContext) return;

  const restartButtonCallback = useCallback(() => {
    quizContext.nextQuestion();
  }, []);

  return (
    <div
      style={{
        flex: '30%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
      }}>
      <Typography variant="caption" sx={{ direction: 'row', paddingRight: '.5em' }}>
        Score: {quizContext.score}
      </Typography>
      <Button variant="contained" onClick={restartButtonCallback}>
        Restart
      </Button>
    </div>
  );
}
