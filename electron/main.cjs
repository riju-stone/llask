const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const log = require('electron-log');

log.initialize();
log.transports.file.level = 'info';
log.info('Application starting...');

let mainWindow = null;

function createWindow() {

  mainWindow = new BrowserWindow({
    title: 'Ask',
    width: 600,
    height: 120,
    frame: false,
    transparent: true,
    resizable: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: false,
    vibrancy: "fullscreen-ui",
    backgroundMaterial: "acrylic",
    trafficLightPosition: { x: -100, y: -100 },
  });

  const isDev = !app.isPackaged;
  
  if (isDev) {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  log.info('Window created successfully');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('window:setSize', (event, width, height, animate = true) => {
  if (mainWindow) {
    mainWindow.setSize(width, height, animate);
    return true;
  }
  return false;
});

ipcMain.handle('window:getSize', (event) => {
  if (mainWindow) {
    return mainWindow.getSize();
  }
  return [600, 120];
});

ipcMain.handle('window:minimize', (event) => {
  if (mainWindow) {
    mainWindow.minimize();
    return true;
  }
  return false;
});

ipcMain.handle('window:close', (event) => {
  if (mainWindow) {
    mainWindow.close();
    return true;
  }
  return false;
});
