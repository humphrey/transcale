import React from 'react'
import './App.css'
import { Scale } from './Scale';
import { useWheel } from './useWheel';

function App() {

  const [range,  setRange] = React.useState({min: -50, max: 50})
  const celsiusToFahrenheit = (c: number) => (c * 9/5) + 32;

  // Zoom in/out using Mac Trackpad
  useWheel({
    onZoom: scale => {
      setRange(oldRange => {
        return {
          max: oldRange.max - ((oldRange.max - oldRange.min) * scale),
          min: oldRange.min + ((oldRange.max - oldRange.min) * scale),
        };
      })
    }
  });

  return (
    <>
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
    </>
  )
}

export default App
