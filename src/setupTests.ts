// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
// Init i18n for the tests needing it
import 'locales/i18n';
