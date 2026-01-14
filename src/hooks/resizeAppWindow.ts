
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window"

export const useResizeAppWindow = (width: number, height: number) => {
    const win = getCurrentWindow();
    win.setSize(new LogicalSize(width, height));
}