import React from "react";


interface Opts {
  onZoom: (deltaY: number) => void
}


export const useWheel = (opts: Opts) => {
  React.useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        // Ctrl + scroll is typically used for zooming on Mac trackpads
        // You can use event.deltaY to adjust the scale of your element
        event.preventDefault();
        opts.onZoom(event.deltaY * -0.01);
      }
    };
  
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
}