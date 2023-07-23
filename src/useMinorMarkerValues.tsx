import { useMemo } from 'react';

interface Opts {
  majorMarkers: number[],
}

const maxMinorMarkersPerInterval = 10;

export const useMinorMarkerValues = ({majorMarkers}: Opts) => {
  return useMemo(() => {
    const fractions = [2, 5, 10];
    let selectedFraction = fractions[0];

    if (majorMarkers.length < 2) {
      return []; // not enough major markers to calculate minor markers
    }

    const majorStep = majorMarkers[1] - majorMarkers[0];

    for (let fraction of fractions) {
      if (majorStep / fraction <= maxMinorMarkersPerInterval) {
        selectedFraction = fraction;
        break;
      }
    }

    const minorStep = majorStep / selectedFraction;
    const minorMarkers = [];

    // Iterate through each pair of consecutive major markers
    for (let i = 0; i < majorMarkers.length - 1; i++) {
      const start = majorMarkers[i];
      const end = majorMarkers[i + 1];

      // Generate minor markers in the gap between the pair of major markers
      for (let value = start + minorStep; value < end; value += minorStep) {
        minorMarkers.push(value);
      }
    }

    return minorMarkers.map((value) => Number(value.toFixed(2)));
    
  }, [majorMarkers, maxMinorMarkersPerInterval]);
};
