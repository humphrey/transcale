import styles from './Scale.module.scss'
import cs from 'classnames';


interface Props {
  value: string
  top: number
  align: 'left' | 'right'
}


export const Marker = (props: Props) => {
  return (
    <div className={cs(styles.marker, props.align === 'left' && styles.left, props.align === 'right' && styles.right)} style={{top: `${props.top * 100}%`}}>
      {props.value}<div className={styles.dash}/>
    </div>
  )
}
