'use strict';

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  shell,
  webFrame,
  nativeTheme,
  dialog,
} from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
import {
  getTheme,
  getAllThemes,
  getCurrentTheme,
  openSettingsFile,
  setCurrentTheme,
  windowSettings,
  getAllSettings,
  updateSettings,
} from '@/settings';
const path = require('path');
const fs = require('fs');
const isDevelopment = process.env.NODE_ENV !== 'production';

// const ipc = ipcMain;
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  const bounds = windowSettings.getBounds();
  // Create the browser window.
  const win = new BrowserWindow({
    width: bounds[0],
    height: bounds[1],
    // minWidth: 640,
    // minHeight: 720,
    frame: false,
    autoHideMenuBar: true,
    backgroundColor: '#141519',

    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.resolve(__static, 'preload.js'),
    },
  });

  win.on('resized', () => windowSettings.setBounds(win.getSize(), true));

  win.webContents.on('will-navigate', (event, url) => {
    // stop Electron from opening another BrowserWindow
    event.preventDefault();
    // open the url in the default system browser
    shell.openExternal(url);
  });

  ipcMain.on('closeApp', () => {
    console.log('closing app');
    win.close();
  });

  ipcMain.on('minimizeApp', () => {
    console.log('minimizing app');
    win.minimize();
  });

  ipcMain.on('maximizeApp', () => {
    console.log('maxzimizing app');
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });

  ipcMain.on('zoomIn', () => {
    win.webContents.zoomFactor = win.webContents.getZoomFactor() + 0.2;
  });
  ipcMain.on('zoomOut', () => {
    win.webContents.zoomFactor = win.webContents.getZoomFactor() - 0.2;
  });

  ipcMain.on('undo', () => {
    win.webContents.undo();
  });

  ipcMain.on('redo', () => {
    win.webContents.redo();
  });

  ipcMain.on('openConfig', async () => {
    openSettingsFile();
  });

  ipcMain.on('setCurrentTheme', async (event, themeName) => {
    setCurrentTheme(themeName);
  });
  ipcMain.on('updateSettings', async (event, args) => {
    updateSettings(args);
  });

  ipcMain.handle('openWith', () => {
    if (app.isPackaged) {
      process.argv.unshift(null);
    }
    if (process.argv.length > 2) {
      let data = process.argv.slice(2).map((f) => {
        return {
          name: path.basename(f),
          content: fs.readFileSync(f).toString(),
          path: f,
        };
      });
      return data;
    }
  });

  ipcMain.handle('openFile', () => {
    const [file] = dialog.showOpenDialogSync(win, {
      properties: ['openFile'],
      filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }],
      title: 'Open a file',
    });
    if (file) {
      // const content = fs.readFileSync(file).toString();
      // const name = path.basename(file);
      return [path.basename(file), fs.readFileSync(file).toString(), file];
    }
  });

  ipcMain.handle('saveFile', async (event, data) => {
    let file = data;
    if (file.path === undefined) {
      file.path = dialog.showSaveDialogSync(win, {
        title: 'Save file',
        filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }],
      });
    }

    fs.writeFileSync(file.path, file.content);
    return [path.basename(file.path), file.content, file.path];
  });

  ipcMain.handle('getCurrentTheme', () => {
    return getCurrentTheme();
  });
  ipcMain.handle('getAllThemes', () => {
    return getAllThemes();
  });
  ipcMain.handle('getAllSettings', () => {
    return getAllSettings();
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }

  createWindow();
});
app.commandLine.appendSwitch('enable-experimental-web-platform-features');
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
