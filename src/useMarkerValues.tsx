import { useMemo } from 'react';

export interface Range {
  min: number
  max: number
}

interface Opts {
  range: Range
  targetCount: number
}

export const useMarkerValues = ({range: {min, max}, targetCount}: Opts) => {
  return useMemo(() => {
    const range = max - min;
    const log10Range = Math.log10(range);
    const log10StepSize = log10Range - Math.log10(targetCount);
    const exponent = Math.floor(log10StepSize);
    const factor = log10StepSize - exponent;

    let step = Math.pow(10, exponent) * (factor < Math.log10(2) ? 1 : factor < Math.log10(5) ? 2 : 5);
    const decimalPlaces = exponent < 0 ? Math.abs(exponent) : 0;

    // Round min and max to the nearest multiple of step
    const roundedMin = Math.ceil(min / step) * step;
    const roundedMax = Math.floor(max / step) * step;

    // Generate the marker values
    const markers = [];
    for (let value = roundedMin; value <= roundedMax; value += step) {
      markers.push(Number(value.toFixed(decimalPlaces)));
    }

    return markers;
  }, [min, max, targetCount]);
};
