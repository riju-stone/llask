const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  setSize: (width, height, animate = true) => ipcRenderer.invoke('window:setSize', width, height, animate),
  getSize: () => ipcRenderer.invoke('window:getSize'),
  minimize: () => ipcRenderer.invoke('window:minimize'),
  close: () => ipcRenderer.invoke('window:close')
});
