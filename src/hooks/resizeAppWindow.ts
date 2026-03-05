export const useResizeAppWindow = (width: number, height: number) => {
  if (window.electronAPI) {
    window.electronAPI.setSize(width, height, true);
  }
};
