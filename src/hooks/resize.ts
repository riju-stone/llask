
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window"

export const useResizeAppWindow = async (height: number) => { 
    const win = getCurrentWindow();

    let currSize = await win.outerSize()
    let currHeight = currSize.height / 2;

    if (currHeight < height) {
        win.setSize(new LogicalSize(600, height));
    } else if (currHeight > height) {
        setTimeout(() => {
            win.setSize(new LogicalSize(600, height));
        }
        , 800);
    }
}