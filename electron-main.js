// electron-main.mjs

import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// If needed, figure out the __dirname equivalent in ESM:
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      // If you have a preload script, specify it here:
      // preload: path.join(__dirname, 'preload.js'),
    }
  })

  // Load your built index.html produced by "npm run build" (Vite).
  // Assuming "dist" folder is in the project root, adjust the path as necessary:
  win.loadFile(path.join(__dirname, 'dist', 'index.html'))

  // Optional: open dev tools for debugging
  // win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Mac-specific close handling
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
