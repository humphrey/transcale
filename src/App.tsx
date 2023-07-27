import React from 'react';
import { Scale } from './Scale';
import { useScaleGestures } from './useScaleGestures';


function App() {

  const [range,  setRange] = React.useState({min: -50, max: 50})
  const celsiusToFahrenheit = (c: number) => (c * 9/5) + 32;

  const bind = useScaleGestures({
    onPan: d => setRange(oldRange => {
      return {
        max: oldRange.max + (d.delta / d.elementHeight * (oldRange.max - oldRange.min)),
        min: oldRange.min + (d.delta / d.elementHeight * (oldRange.max - oldRange.min)),
      };
    }),
    onZoom: d => setRange(oldRange => {
      return {
        max: oldRange.max - ((oldRange.max - oldRange.min) * d.delta),
        min: oldRange.min + ((oldRange.max - oldRange.min) * d.delta),
      };
    }),
  })

  return (
    <div {...bind} style={{touchAction: 'none'}}>
      <Scale
        left={{
          range,
          format: degrees => `${degrees}°C`,
        }}
        right={{
          convert: celsiusToFahrenheit,
          format: degrees => `${degrees}°F`,
        }}
      />
    </div>
  )
}

export default App
