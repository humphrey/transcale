import { useState } from 'react'
import './App.css'
import { Scale } from './Scale';

function App() {

  const celsiusToFahrenheit = (c: number) => (c * 9/5) + 32;
  return (
    <>
      <Scale
        left={{
          range: {min: -50, max: 50},
          format: degrees => `${degrees}°C`,
        }}
        right={{
          convert: celsiusToFahrenheit,
          format: degrees => `${degrees}°F`,
        }}
      />
      {/* <ScaleCanvas/>
      <ScaleCanvas2/> */}
    </>
  )
}

export default App
