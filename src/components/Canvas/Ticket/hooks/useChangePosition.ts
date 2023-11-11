import { useEffect } from "react";
import { TicketType } from "../../store/useStore";

type UseChangePositionProps = {
  ref: HTMLDivElement | null;
  isDrag: boolean;
  position?: TicketType["position"];
};

export const useChangePosition = ({
  ref,
  position,
  isDrag,
}: UseChangePositionProps): void => {
  useEffect(() => {
    if (ref && position && isDrag) {
      //Изменение позиции элемента
      const { offsetLeft, offsetTop } = ref;
      const style = ref.style;
      style.transform = `translate(${position.x - offsetLeft - 75}px,${
        position.y - offsetTop - 20
      }px)`;
      style.boxShadow = `0px 0px 15px 5px red`;
    }
  }, [isDrag, position, ref]);
};
