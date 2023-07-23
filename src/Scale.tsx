import React from 'react';
import styles from './Scale.module.scss'
import { Marker } from './Marker';

interface Props {
  left: {
    range: {
      min: number
      max: number
    }
    format: (value: number) => string
  }
  right: {
    convert: (leftValue: number) => number
    format: (value: number) => string
  }
}

export const Scale = ({left, right}: Props) => {
  const markerInterval = 10;
  const markers = [];

  const range2 = {
    min: right.convert(left.range.min),
    max: right.convert(left.range.max),
  }

  for (let leftValue = left.range.min; leftValue <= left.range.max; leftValue += markerInterval) {
    const tempF = Math.round(right.convert(leftValue));

    markers.push(
      <Marker 
        key={leftValue} 
        value={`${leftValue}°C`} 
        align='left' 
        top={(left.range.max - leftValue) / (left.range.max - left.range.min)}
      />
    );
    markers.push(
      <Marker 
        key={tempF} 
        value={`${tempF}°F`} 
        align='right' 
        top={(range2.max - tempF) / (range2.max - range2.min)}
      />
    );
  }

  return (
    <>
      <div className={styles.scale}>
      <div className={styles.verticalLine}/>
        {markers}
      </div>
    </>
  );
};
