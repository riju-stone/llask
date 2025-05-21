
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window"

export const useResizeAppWindow = (height: number) => { 
    const win = getCurrentWindow();
    console.log("Resizing window to height:", height);
    win.setSize(new LogicalSize(600, height));
}