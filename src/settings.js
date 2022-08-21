import Store from 'electron-store';

const schema = {
  themes: {
    defaultDark: {
      background: '#141519',
      foreground: '#b6bbbb',
      editor: '#181a1f',
      textActive: '#6d808c',
      textInactive: '#394b52',
      textArea: '#1d2024',
      textAreaBorder: '#262a2e',
      highlight: '#2b98db',
    },
    defaultLight: {
      background: '#ebebeb',
      foreground: '#455067',
      editor: '#f4f4f4',
      textActive: '#61C1DA',
      textInactive: '#8B99B1',
      textArea: '#ECF2F3',
      textAreaBorder: '#DCEDF0',
      highlight: '#DA7A61',
    },
  },
  settings: {
    currentTheme: 'defaultDark',
    rememberWindowSize: true,
    windowBounds: [800, 800],
  },
};

const storage = new Store();

function checkStorage() {
  const data = storage.get('data');
  if (!data) {
    storage.set('data', schema);
  }
}
const windowSettings = {
  getBounds: () => {
    checkStorage();
    return storage.get('data.settings.windowBounds');
  },
  setBounds: (bounds, isFromResize) => {
    const setting = storage.get('data.settings.rememberWindowSize');
    if (setting || !isFromResize) {
      storage.set('data.settings.windowBounds', bounds);
    }
  },
};

function getAllThemes() {
  checkStorage();
  return storage.get('data.themes');
}

function getTheme(themeName) {
  checkStorage();
  return storage.get(`data.themes.${themeName}`);
}

function getCurrentTheme() {
  checkStorage();
  const themeName = storage.get('data.settings.currentTheme');
  return {
    theme: themeName,
    ...storage.get(`data.themes.${themeName}`),
  };
  // return storage.get(`data.themes.${themeName}`);
}

function setCurrentTheme(themeName) {
  checkStorage();
  storage.set('data.settings.currentTheme', themeName);
}

function openSettingsFile() {
  checkStorage();
  storage.openInEditor();
}

function getAllSettings() {
  return storage.get('data.settings');
}

function updateSettings({ setting, value }) {
  storage.set(`data.settings.${setting}`, value);
}

export {
  getAllThemes,
  getTheme,
  getCurrentTheme,
  openSettingsFile,
  setCurrentTheme,
  windowSettings,
  getAllSettings,
  updateSettings,
};
