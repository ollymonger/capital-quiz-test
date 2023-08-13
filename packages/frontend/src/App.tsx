import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Layout, QuestionContainer } from './components';

export function App() {
  return (
    <Layout>
      <SnackbarProvider>
        <QuestionContainer />
      </SnackbarProvider>
    </Layout>
  );
}
