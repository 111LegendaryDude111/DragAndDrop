export type Listener = {
  onElement: boolean;
  type: keyof HTMLElementEventMap;
  callback: (e: MouseEvent) => void;
};

export const addEventListeners = (
  element: HTMLElement,
  arrayOfListeners: Array<Listener>
): void => {
  arrayOfListeners.forEach((el) => {
    const { onElement, callback, type } = el;
    if (onElement) {
      element.addEventListener(type, callback);
    } else {
      document.addEventListener(type, callback);
    }
  });
};

export const removeEventListeners = (
  element: HTMLElement,
  arrayOfListeners: Array<Listener>
) => {
  arrayOfListeners.forEach((el) => {
    const { callback, onElement, type } = el;
    if (onElement) {
      element.removeEventListener(type, callback);
    } else {
      document.removeEventListener(type, callback);
    }
  });
};

export const rafThrottled = <T>(callback: (event: T) => void) => {
  let id: number | null = null;
  let eventsArgs = null;

  return (args: T) => {
    eventsArgs = args;
    if (id !== null) {
      return;
    }

    callback(eventsArgs);

    id = requestAnimationFrame(() => {
      id = null;
    });
  };
};
