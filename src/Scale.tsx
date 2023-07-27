import { Markers } from './Markers';
import styles from './Scale.module.scss';

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
  children?: React.ReactNode
}

export const Scale = ({left, right, ...props}: Props) => {

  const range2 = {
    min: right.convert(left.range.min),
    max: right.convert(left.range.max),
  };


  if (props.children) {
    return props.children;
  }
  return (
    <>
      <div className={styles.scale}>
      <div className={styles.verticalLine}/>
        <Markers 
          align='left'
          targetCount={10}
          {...left}
        />
        <Markers 
          align='right'
          range={range2}
          targetCount={10}
          {...right}
        />
      </div>
    </>
  );
};
