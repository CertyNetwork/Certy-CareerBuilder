/* eslint-disable prettier/prettier */
import * as ReactDOM from 'react-dom';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { HelmetProvider } from 'react-helmet-async';
import 'react-perfect-scrollbar/dist/css/styles.css';
// React Query Set up
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// eslint-disable-next-line prettier/prettier
import './utils/highlight';
// editor
import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
//
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


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 60 * 1000
    },
  },
});

(window as any).Buffer = Buffer;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        jobs: {
          keyArgs: ['jobs'],
          merge(existing = [], incoming: any[]) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/edricngo/certy-network',
  cache,
});

const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <SettingsProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <NearProvider>
              <ApolloProvider client={client}>
                <App />
                <ToastContainer autoClose={3000} />
              </ApolloProvider>
            </NearProvider>
          </QueryClientProvider>
        </BrowserRouter>
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
