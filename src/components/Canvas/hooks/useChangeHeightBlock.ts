import { useEffect } from "react";

type UseChangeHeightBlockProps = {
  ref: HTMLDivElement | null;
  text: string;
};

export const useChangeHeightBlock = ({
  ref,
  text,
}: UseChangeHeightBlockProps): void => {
  useEffect(() => {
    if (ref) {
      if (text.length > 60) {
        const lines = text.split("\n");
        let count = 70;
        lines.forEach((el) => {
          count += Math.ceil(el.length / 5);
        });
        const newHeight = count * 1.4;
        ref.style.height = newHeight + "px";
      } else {
        const lines = text.split("\n");
        let count = 70;
        lines.forEach((el) => {
          count += Math.ceil(el.length / 5);
        });
        const newHeight = count / 1.4;
        ref.style.height = newHeight + "px";
      }
    }
  }, [ref, text]);
};
