import { Marker } from './Marker';
import { Range, useMarkerValues } from './useMarkerValues';


interface Props {
  range: Range
  align: 'left' | 'right'
  targetCount: number
  format: (value: number) => string
}


export const Markers = (props: Props) => {

  const markerValues = useMarkerValues({range: props.range, targetCount: props.targetCount});

  return <>{markerValues.map(v => 

    <Marker
      key={v} 
      value={props.format(v)} 
      align={props.align}
      top={(props.range.max - v) / (props.range.max - props.range.min)}
    />
  )}</>;
}
