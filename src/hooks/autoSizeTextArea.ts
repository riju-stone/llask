import { useLayoutEffect } from "react";

const useAutoSizeTextArea = (id: string, textAreaRef: React.RefObject<HTMLTextAreaElement>, value: string) => {
  useLayoutEffect(() => {
    const textArea = textAreaRef.current ?? document.getElementById(id) as HTMLTextAreaElement;
    if (textArea) {
      textArea.style.height = "auto";
      const scrollHeight = textArea.scrollHeight;
      const minHeight = 20;
      const maxHeight = 300;
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textArea.style.height = newHeight + "px";
    }
  }, [value]);
}

export default useAutoSizeTextArea;