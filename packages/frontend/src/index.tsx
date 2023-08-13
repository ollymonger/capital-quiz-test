import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('app');

const root = ReactDOM.createRoot(container!);

// React version 18 Strict Mode causes re-rendering in development builds.
root.render(<App />);
