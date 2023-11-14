export const throttle = (callback: VoidFunction, DURATION = 3000) => {
  let timeout: number | undefined = undefined;

  return () => {
    if (timeout === undefined) {
      callback();
      timeout = setTimeout(() => {
        timeout = undefined;
      }, DURATION);
    }
  };
};
