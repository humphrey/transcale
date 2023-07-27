import { useGesture } from '@use-gesture/react';
import React from 'react';


interface Props {
  onZoom: (e: GestureData) => void
  onPan: (e: GestureData) => void
}

interface GestureData {
  delta: number
  elementHeight: number
}


export const useScaleGestures = (props: Props) => {

  // Disable gestures using events for Mac track pads
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handler = (e: Event) => e.preventDefault();
    if (ref.current) ref.current.addEventListener('wheel', handler);
    return () => {
      if (ref.current) ref.current.removeEventListener('wheel', handler);
    }
  }, [ref.current]);

  // Handle guestures
  const bind = useGesture({
    onDrag: (x) => ref.current && props.onPan({delta: x.delta[1], elementHeight: ref.current.clientHeight}),
    onWheel: (x) => ref.current && props.onPan({delta: 0 - x.delta[1], elementHeight: ref.current.clientHeight}),
    onPinch: (x) => ref.current && props.onZoom({delta: x.delta[0], elementHeight: ref.current.clientHeight}),
  }, {
      drag: {  axis: 'y' },
      pinch: {  eventOptions: { passive: false } },
      wheel: { eventOptions: { passive: false } }  // For MacOS trackpad pinch
  });
  
  return {
    ref, 
    ...bind(), 
    styles: {
      touchAction: 'none', 
    }};
};
