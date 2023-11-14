import { useEffect } from "react";
/*
const hadlePoisitonOfBlock = useCallback(
    (e) => {
      dispatch({
        type: StoreActions.changePosition,
        // position: { x: e.pageX, y: e.pageY },
        position: { x: e.clientX, y: e.clientY },
        text,
        id,
      });
    },
    [dispatch, id, text]
  );

  const cons = useCallback(
    (e) => {
      console.log("e in console", e);
      console.log("e.target in console", e.target);

      hadlePoisitonOfBlock(e);
    },
    [hadlePoisitonOfBlock]
  );
*/
function useThrottle(callback: (e) => void, delay = 100) {
  useEffect(() => {
    let timeoutId: number | null;

    function handleMouseMove(event) {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          callback(event);
          timeoutId = null;
        }, delay);
      }
    }

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [callback, delay]);
}

export default useThrottle;
