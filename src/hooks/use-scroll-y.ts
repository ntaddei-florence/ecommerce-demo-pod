import { useCallback, useEffect, useState } from "react";

export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  const onScroll = useCallback(() => {
    const { scrollY } = window;
    setScrollY(scrollY);
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return scrollY;
}
