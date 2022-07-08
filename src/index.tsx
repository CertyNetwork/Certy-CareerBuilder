/* eslint-disable no-lone-blocks */

/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
// Initialize languages
import * as ReactDOM from 'react-dom';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { HelmetProvider } from 'react-helmet-async';
import 'react-perfect-scrollbar/dist/css/styles.css';
// React Query Set up
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { App } from 'app';
import { NearProvider } from 'app/contexts/NearContext';
import { SettingsProvider } from 'app/contexts/SettingsContext';
import { Buffer } from 'buffer';
import 'core-js';
import reportWebVitals from 'reportWebVitals';
import 'sanitize.css/sanitize.css';
import { configureAppStore } from 'store/configureStore';

import './locales/i18n';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       refetchOnReconnect: false,
//       retry: false,
//       staleTime: 60 * 1000,
//     },
//   },
// });

(window as any).Buffer = Buffer;

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/edricngo/certy-network',
  cache: new InMemoryCache(),
});

const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <SettingsProvider>
        <NearProvider>
          <BrowserRouter>
            {/* <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} /> */}
            <ApolloProvider client={client}>
              <App />
              <ToastContainer autoClose={3000} />
              {/* </QueryClientProvider> */}
            </ApolloProvider>
          </BrowserRouter>
        </NearProvider>
      </SettingsProvider>
    </HelmetProvider>
  </Provider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {});
}
reportWebVitals();
