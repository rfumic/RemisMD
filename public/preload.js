const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  closeApp: () => ipcRenderer.send('closeApp'),
  minimizeApp: () => ipcRenderer.send('minimizeApp'),
  maximizeApp: () => ipcRenderer.send('maximizeApp'),
  zoomIn: () => ipcRenderer.send('zoomIn'),
  zoomOut: () => ipcRenderer.send('zoomOut'),
  undo: () => ipcRenderer.send('undo'),
  redo: () => ipcRenderer.send('redo'),
  openConfig: () => ipcRenderer.send('openConfig'),
  setCurrentTheme: (themeName) => {
    ipcRenderer.send('setCurrentTheme', themeName);
  },
  updateSettings: (setting, value) => {
    ipcRenderer.send('updateSettings', { setting, value });
  },
  getCurrentTheme: () => ipcRenderer.invoke('getCurrentTheme'),
  getAllThemes: () => ipcRenderer.invoke('getAllThemes'),
  getAllSettings: () => ipcRenderer.invoke('getAllSettings'),
});
