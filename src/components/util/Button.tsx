/* eslint-disable react/require-default-props */
import React from 'react'

interface IProps {
  onClick?: () => void
  className?: string
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'muted' | 'white' | 'orange'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const Button: React.FunctionComponent<IProps> = props => {
  const renderBackgroundColor = () => {
    switch (props.color) {
      case 'primary':
        return '#08614b'
      case 'secondary':
        return '#cfcfcf'
      case 'danger':
        return '#E84724'
      case 'warning':
        return '#f5bf2c'
      case 'white':
        return '#ffffff'
      case 'orange':
        return '#ffa32b'
      default:
        return '#08614b'
    }
  }
  const styles: React.CSSProperties = {
    backgroundColor: renderBackgroundColor(),
    color: props.color === 'secondary' ? '#000' : props.color === 'white' ? '#08614b' : '#fff'
  }
  return (
    <button disabled={props.disabled} className={`btn btn-${props.color ?? 'success'} ` + props.className} style={styles} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
