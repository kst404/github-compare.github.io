import React, { Component } from 'react'

const styles = {
  main: {
    stroke: '#999',
    strokeWidth: 1,
    fill: '#fff'
  },
  glass: {
    stroke: 'none',
    fill: 'url(#windowPreviewGlassFill)'
  },
  screen: {
    stroke: 'none',
    fill: 'url(#windowPreviewRollingShatterFill)'
  },
}

export default class WindowPreview extends Component {
  fullFrame = { width: 0, height: 0 }

  render() {
    this.fullFrame = this.props.data.reduce((result, { width, height }) => ({ width: result.width + width, height: height > result.height ? height : result.height }), {width: 0, height: 0})

    const { frames } = this.props.data.reduce((result, item) => ({ frames: result.frames.concat({thikness: 5, ...item, x: result.x, y: result.y }), x: result.x + item.width, y: result.y }), { x: 0, y: 0, frames: [] })

    return <svg xmlns="http://www.w3.org/2000/svg" viewBox={`-1 -1 ${this.fullFrame.width+2} ${this.fullFrame.height+2}`}>
      <g style={styles.main}>{frames.map((item, i) => <Frame key={i} {...item} />)}</g>
    </svg>
  }
}

const Frame = ({ x, y, width, height, thikness, tipology, ...props}) => {
  const { doors } = tipology.doors.reduce((result, item) => ({ doors: result.doors.concat({thikness: 5, ...item, x: result.x, y: result.y }), x: result.x + item.width, y: result.y }), { x: x + thikness, y: y + thikness, doors: [] })

  return (
  <g style={styles.main}>
    <path d={`M${x},${y}h${width}v${height}h${-width}z M${x+thikness},${y+thikness}v${height-thikness*2}h${width-thikness*2}v${-height+thikness*2}z`} {...props}/>
    {doors.map((door, i) => <Door key={i} {...door} />)}
  </g>
)}
