import React, { useState } from 'react'
import CameraView from './ARview'
import './styles.css'

function Fullview() {
  const pathname = window.location.pathname // Get the pathname of the current URL

  const id = pathname.substring(1) // Remove the first character '/' from the pathname to get the id
  const imageurl = `https://www.magnific.in/demo/fans/${id}.png`
  console.log(id)
  console.log(imageurl)

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 200, height: 200 })
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [pinching, setPinching] = useState(false)
  const [initialDistance, setInitialDistance] = useState(null)

  const handleMouseDown = (e) => {
    setDragging(true)
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      })
    }
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      setPinching(true)
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      setInitialDistance(distance)
    } else {
      setDragging(true)
      setOffset({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      })
    }
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      const delta = distance - initialDistance
      setSize((prevSize) => ({
        width: prevSize.width + delta,
        height: prevSize.height + delta,
      }))
      setInitialDistance(distance)
      setPosition((prevPosition) => ({
        x: prevPosition.x - delta / 2,
        y: prevPosition.y - delta / 2,
      }))
    } else if (dragging) {
      const touch = e.touches[0]
      setPosition({
        x: touch.clientX - offset.x,
        y: touch.clientY - offset.y,
      })
    }
  }

  const handleTouchEnd = () => {
    setDragging(false)
    setPinching(false)
    setInitialDistance(null)
  }

  return (
    <div className='div1'>
      <div className='div2'>
        <span className='fan'>
          {' '}
          <CameraView className='fan' />
        </span>
      </div>
      <div
        className='div3'
        style={{
          top: position.y,
          left: position.x,
          width: size.width,
          height: size.height,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {' '}
        <img src={imageurl} alt='fan' />
      </div>
    </div>
  )
}

export default Fullview
