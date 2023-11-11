import { useEffect } from "react";

export const useStopDragKeyPress = (
  setFlag: React.Dispatch<React.SetStateAction<boolean>>,
  ref: HTMLDivElement | null
) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const cb = (e) => {
      if (e.key.toLowerCase() === "s" || e.key.toLowerCase() === "ы") {
        setFlag(false);
        if (ref) ref.style.boxShadow = "none";
      }
    };

    window.addEventListener("keypress", cb);

    return () => {
      window.removeEventListener("keypress", cb);
    };
  }, [ref, setFlag]);
};
