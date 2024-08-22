import { useState, useEffect } from 'react';

export default function useWindowSize() {
  const [size, setSize] = useState<{ [key: string]: undefined | number }>({ width: undefined, height: undefined });

  useEffect(() => {
    function handleResize() {
      // Step 1: Grab the window size and save it
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Step 2: Add event listener any time the window changes
    window.addEventListener("resize", handleResize);

    // Step 3:Call handler
    handleResize();

    // Step 4: Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
