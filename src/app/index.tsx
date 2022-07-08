import { ProgressBarStyle } from './components/ProgressBar';
import ScrollToTop from './components/ScrollToTop';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
// components
import ThemeSettings from './components/settings';
import Router from './routes';
import ThemeProvider from './theme';

// import { useTranslation } from 'react-i18next';

export function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <ProgressBarStyle />
          <ScrollToTop />
          <Router />
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
