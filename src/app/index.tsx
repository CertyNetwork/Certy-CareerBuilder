import { Provider } from 'react-redux';

// import { useTranslation } from 'react-i18next';
import { configureAppStore } from 'store/configureStore';
import { GlobalStyle } from 'styles/global-styles';

import { ProgressBarStyle } from './components/ProgressBar';
import ScrollToTop from './components/ScrollToTop';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
// components
import ThemeSettings from './components/settings';
import Router from './routes';
import ThemeProvider from './theme';

const store = configureAppStore();

export function App() {
  return (
    <Provider store={store}>
      <MotionLazyContainer>
        <ThemeProvider>
          <ThemeSettings>
            <ProgressBarStyle />
            <ScrollToTop />
            <Router />
          </ThemeSettings>
        </ThemeProvider>
      </MotionLazyContainer>
      <GlobalStyle />
    </Provider>
  );
}
