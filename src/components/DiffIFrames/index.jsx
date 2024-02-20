import './DiffIFrames.css'
import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

function DiffIFrames ({
  debounceInputs,
  handleIHeightChange
}) {
  const [firstLoad, setFirstLoad] = useState(true)
  const [swiperPos, setSwiperPos] = useState('50%')
  const prevIWidth = useRef(debounceInputs.iWidth)
  const leftIframe = useRef(null)
  const rightIframe = useRef(null)
  const mainContainer = useRef(null)
  const swiperBlock = useRef(null)
  let eventStart = false

  useEffect(() => {
    if (!firstLoad) {
      const value = debounceInputs.iHeightDebounce
      if (isNaN(value) || value < 1500 || value > 20000) {
        handleIHeightChange(false)
      }

      if (prevIWidth.current !== debounceInputs.iWidth) {
        setSwiperPos('50%')
      }
    } else {
      setFirstLoad(false)
    }
  }, [debounceInputs.iHeightDebounce, debounceInputs.iWidth])

  const swipeHandleDown = (e) => {
    e.preventDefault()
    eventStart = true
    window.addEventListener('mousemove', swipeHandleMove)
    window.addEventListener('mouseup', swipeHandleUp)
  }

  const swipeHandleMove = (e) => {
    if (!eventStart) return false

    const posFactorLeft = 21
    const posFactorRight = 12
    const cursorFactor = 30
    const rigthIframeBounding = rightIframe.current.getBoundingClientRect()
    const iWidth = parseInt(debounceInputs.iWidth) === 0 ? rigthIframeBounding.width : parseInt(debounceInputs.iWidth)
    const swiperPos = e.clientX - cursorFactor

    // left edge
    if (swiperPos < (rigthIframeBounding.left - posFactorLeft)) {
      return false
    }

    // right edge
    if ((swiperPos + cursorFactor + posFactorRight) > (rigthIframeBounding.left + iWidth)) {
      return false
    }
    setSwiperPos(swiperPos.toString() + 'px')
  }

  const swipeHandleUp = (e) => {
    eventStart = false
    window.removeEventListener('mousemove', swipeHandleMove)
    window.removeEventListener('mouseup', swipeHandleUp)
  }

  return (
    <section
      ref={mainContainer}
      className={`flex flex-row gap-x-6 relative ${!debounceInputs.sideBySide ? `dif-mode-overlay dif-mode-overlay--${debounceInputs.overlayMode}` : 'justify-center'}`}
      style={{
        height: `${debounceInputs.iHeightDebounce}px`
      }}
    >
      {/* left iframe */}
      <div
        ref={leftIframe}
        className="mockup-browser border bg-base-300 w-full left-iframe overflow-hidden h-full"
        style={{
          width: parseInt(debounceInputs.iWidth) === 0 ? '100%' : `${debounceInputs.iWidth}px`,
          opacity: debounceInputs.sideBySide || debounceInputs.overlayMode === 'swipe' ? 1 : debounceInputs.opacity
        }}
      >
        <div className="mockup-browser-toolbar">
          <div className="input">{ debounceInputs.leftUrl } (First URL)</div>
        </div>
        <iframe
          scrolling="no"
          src={ debounceInputs.leftUrl }
          name="leftIFrame"
          className='w-full h-full pointer-events-none'
        ></iframe>
      </div>

      {/* right iframe */}
      <div
        ref={rightIframe}
        className="mockup-browser border bg-base-300 w-full right-iframe overflow-hidden h-full"
        style={{
          width: parseInt(debounceInputs.iWidth) === 0 ? '100%' : `${debounceInputs.iWidth}px`
        }}
      >
        <div className="mockup-browser-toolbar">
          <div className="input">{ debounceInputs.rightUrl } (Second URL)</div>
        </div>
        <iframe
          scrolling="no"
          src={ debounceInputs.rightUrl }
          name="rightIFrame"
          className='w-full h-full pointer-events-none'
        ></iframe>
      </div>

      {/* swiper handle */}
      <div
        ref={swiperBlock}
        className={`absolute z-10 w-8 opacity-70 cursor-ew-resize ${debounceInputs.sideBySide || debounceInputs.overlayMode !== 'swipe' ? 'hidden' : ''}`}
        onMouseDown={swipeHandleDown}
        style={{
          left: swiperPos,
          height: `${debounceInputs.iHeightDebounce}px`
        }}
      >
          <div className="my-0 mx-auto bg-red-600 h-full w-[3px]"></div>
        </div>
    </section>
  )
}

DiffIFrames.propTypes = {
  debounceInputs: PropTypes.object.isRequired,
  handleIHeightChange: PropTypes.func.isRequired
}

export default DiffIFrames
