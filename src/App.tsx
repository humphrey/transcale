import React from 'react';
import { Scale } from './Scale';
import { useScaleGestures } from './useScaleGestures';


const defaultRange = {min: -50, max: 50};


function App() {

  const [range,  setRange] = React.useState(defaultRange)
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
    <div {...bind} style={{touchAction: 'none', userSelect: 'none'}}>
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
      <div style={{position: 'fixed', top: 0, left: 0, right: 0, padding: '3px', background: '#035', textAlign: 'center', fontSize: '85%'}}>
        Transcale: Your Visual Converter
      </div>
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, padding: '3px', background: '#222', borderTop: '1px solid #444', color: '#777', textAlign: 'center', fontSize: '85%'}}>
        Tip: Try dragging and pinching to zoom. <span onClick={() => setRange(defaultRange)}>[RESET]</span>
      </div>
    </div>
  )
}

export default App
