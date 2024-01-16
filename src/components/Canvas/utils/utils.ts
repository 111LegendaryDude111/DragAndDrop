export type Listener = {
  onElement: boolean;
  type: keyof HTMLElementEventMap;
  callback: (e: MouseEvent) => void;
};

export const addEventListeners = (
  element: HTMLDivElement,
  arrayOfListeners: Array<Listener>
): void => {
  arrayOfListeners.forEach((el) => {
    const { onElement, callback, type } = el;
    if (onElement) {
      //@ts-ignore
      element.addEventListener(type, callback);
    }
    //@ts-ignore
    document.addEventListener(type, callback);
  });
};

export const removeEventListeners = (
  element: HTMLDivElement,
  arrayOfListeners: Array<Listener>
) => {
  arrayOfListeners.forEach((el) => {
    const { callback, onElement, type } = el;
    if (onElement) {
      //@ts-ignore
      element.removeEventListener(type, callback);
    }
    //@ts-ignore
    document.removeEventListener(type, callback);
  });
};
