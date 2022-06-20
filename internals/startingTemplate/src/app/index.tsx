/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import * as React from 'react';

import { Route, Routes } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={HomePage} />
        <Route path="*" element={NotFoundPage} />
      </Routes>
      <GlobalStyle />
    </>
  );
}
