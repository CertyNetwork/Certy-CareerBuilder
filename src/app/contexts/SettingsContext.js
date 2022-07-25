// config
import { createContext, useEffect } from 'react';

import PropTypes from 'prop-types';

import { defaultSettings } from '../config';
// hooks
import useLocalStorage from '../hooks/useLocalStorage';
// utils
import getColorPresets, {
  colorPresets,
  defaultPreset,
} from '../utils/getColorPresets';

// ----------------------------------------------------------------------

const initialState = {
  ...defaultSettings,
  recruiterMode: false,
  // Recruiter
  onRecruiterMode: () => {},

  // Mode
  onToggleMode: () => {},
  onChangeMode: () => {},

  // Direction
  onToggleDirection: () => {},
  onChangeDirection: () => {},
  onChangeDirectionByLang: () => {},

  // Layout
  onToggleLayout: () => {},
  onChangeLayout: () => {},

  // Contrast
  onToggleContrast: () => {},
  onChangeContrast: () => {},

  // Color
  onChangeColor: () => {},
  setColor: defaultPreset,
  colorOption: [],

  // Stretch
  onToggleStretch: () => {},

  // Reset
  onResetSetting: () => {},
};

const SettingsContext = createContext(initialState);

// ----------------------------------------------------------------------

SettingsProvider.propTypes = {
  children: PropTypes.node,
};

function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', {
    themeMode: initialState.themeMode,
    themeLayout: initialState.themeLayout,
    themeStretch: initialState.themeStretch,
    themeContrast: initialState.themeContrast,
    themeDirection: initialState.themeDirection,
    themeColorPresets: initialState.themeColorPresets,
    recruiterMode: initialState.recruiterMode,
  });

  const isArabic = localStorage.getItem('i18nextLng') === 'ar';

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang('ar');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArabic]);

  const onRecruiterMode = () => {
    setSettings({
      ...settings,
      recruiterMode: !settings.recruiterMode,
    });
  };

  // Mode

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    });
  };

  const onChangeMode = event => {
    setSettings({
      ...settings,
      themeMode: event.target.value,
    });
  };

  // Direction

  const onToggleDirection = () => {
    setSettings({
      ...settings,
      themeDirection: settings.themeDirection === 'rtl' ? 'ltr' : 'rtl',
    });
  };

  const onChangeDirection = event => {
    setSettings({
      ...settings,
      themeDirection: event.target.value,
    });
  };

  const onChangeDirectionByLang = lang => {
    setSettings({
      ...settings,
      themeDirection: lang === 'ar' ? 'rtl' : 'ltr',
    });
  };

  // Layout

  const onToggleLayout = () => {
    setSettings({
      ...settings,
      themeLayout:
        settings.themeLayout === 'vertical' ? 'horizontal' : 'vertical',
    });
  };

  const onChangeLayout = event => {
    setSettings({
      ...settings,
      themeLayout: event.target.value,
    });
  };

  // Contrast

  const onToggleContrast = () => {
    setSettings({
      ...settings,
      themeContrast: settings.themeContrast === 'default' ? 'bold' : 'default',
    });
  };

  const onChangeContrast = event => {
    setSettings({
      ...settings,
      themeContrast: event.target.value,
    });
  };

  // Color

  const onChangeColor = event => {
    setSettings({
      ...settings,
      themeColorPresets: event.target.value,
    });
  };

  // Stretch

  const onToggleStretch = () => {
    setSettings({
      ...settings,
      themeStretch: !settings.themeStretch,
    });
  };

  // Reset

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
      themeLayout: initialState.themeLayout,
      themeStretch: initialState.themeStretch,
      themeContrast: initialState.themeContrast,
      themeDirection: initialState.themeDirection,
      themeColorPresets: initialState.themeColorPresets,
      recruiterMode: initialState.recruiterMode,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,

        // Recruiter
        onRecruiterMode,

        // Mode
        onToggleMode,
        onChangeMode,

        // Direction
        onToggleDirection,
        onChangeDirection,
        onChangeDirectionByLang,

        // Layout
        onToggleLayout,
        onChangeLayout,

        // Contrast
        onChangeContrast,
        onToggleContrast,

        // Stretch
        onToggleStretch,

        // Color
        onChangeColor,
        setColor: getColorPresets(settings.themeColorPresets),
        colorOption: colorPresets.map(color => ({
          name: color.name,
          value: color.main,
        })),

        // Reset
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
