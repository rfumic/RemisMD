const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  closeApp: () => ipcRenderer.send('closeApp'),
  minimizeApp: () => ipcRenderer.send('minimizeApp'),
  maximizeApp: () => ipcRenderer.send('maximizeApp'),
  zoomIn: () => ipcRenderer.send('zoomIn'),
  zoomOut: () => ipcRenderer.send('zoomOut'),
  undo: () => ipcRenderer.send('undo'),
  redo: () => ipcRenderer.send('redo'),
});
