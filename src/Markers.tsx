import { Marker } from './Marker';
import { Range, useMarkerValues } from './useMarkerValues';
import { useMinorMarkerValues } from './useMinorMarkerValues';


interface Props {
  range: Range
  align: 'left' | 'right'
  targetCount: number
  format: (value: number) => string
}


export const Markers = (props: Props) => {

  const majorMarkers = useMarkerValues({range: props.range, targetCount: props.targetCount});
  const minorMarkers = useMinorMarkerValues({majorMarkers});

  return <>
    {majorMarkers.map(v => 
      <Marker
        key={v} 
        value={props.format(v)} 
        align={props.align}
        top={(props.range.max - v) / (props.range.max - props.range.min)}
      />
    )}
    {minorMarkers.map(v => 
      <Marker
        key={v} 
        align={props.align}
        top={(props.range.max - v) / (props.range.max - props.range.min)}
      />
    )}
  </>;
}
