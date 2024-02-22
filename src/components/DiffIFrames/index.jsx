import './DiffIFrames.css'
import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IconContext } from 'react-icons'
import { isValidUrl } from '../../utils'

function DiffIFrames ({
  debounceInputs,
  handleIHeightChange
}) {
  const [urlValidated, setUrlValidated] = useState({
    leftUrl: '',
    rightUrl: ''
  })
  const [swiperPos, setSwiperPos] = useState(() => {
    return debounceInputs.iWidth === 0 ? window.innerWidth / 2 : debounceInputs.iWidth / 2
  })

  const [iFramesLoaded, setIframesLoaded] = useState({ leftIFrame: true, rightIFrame: true })
  const [firstLoad, setFirstLoad] = useState(true)

  const leftUrlValidated = isValidUrl(debounceInputs.leftUrl)
  const rightUrlValidated = isValidUrl(debounceInputs.rightUrl)
  const iFramesContainer = useRef(null)
  const urlLeft = useRef(leftUrlValidated)
  const urlRight = useRef(rightUrlValidated)
  let eventStart = false

  useEffect(() => {
    const value = debounceInputs.iHeightDebounce
    if (isNaN(value) || value < 1500 || value > 20000) {
      handleIHeightChange(false)
      return
    }

    setSwiperPos(parseInt(debounceInputs.iWidth) === 0 ? iFramesContainer.current.getBoundingClientRect().width / 2 : parseInt(debounceInputs.iWidth) / 2)

    if (!firstLoad) {
      if (urlLeft.current !== leftUrlValidated && urlRight.current !== rightUrlValidated) {
        urlLeft.current = leftUrlValidated
        urlRight.current = rightUrlValidated
        setIframesLoaded({
          leftIFrame: leftUrlValidated === '',
          rightIFrame: rightUrlValidated === ''
        })
      } else if (urlLeft.current !== leftUrlValidated) {
        urlLeft.current = leftUrlValidated
        setIframesLoaded({
          ...iFramesLoaded,
          leftIFrame: leftUrlValidated === ''
        })
      } else if (urlRight.current !== rightUrlValidated) {
        urlRight.current = rightUrlValidated
        setIframesLoaded({
          ...iFramesLoaded,
          rightIFrame: rightUrlValidated === ''
        })
      }
    } else {
      setFirstLoad(false)
      setIframesLoaded({
        leftIFrame: leftUrlValidated === '',
        rightIFrame: rightUrlValidated === ''
      })
    }

    setUrlValidated({
      rightUrl: rightUrlValidated,
      leftUrl: leftUrlValidated
    })
  }, [debounceInputs.iHeightDebounce, debounceInputs.iWidth, debounceInputs.sideBySide, debounceInputs.leftUrl, debounceInputs.rightUrl])

  const swipeHandleDown = (e) => {
    e.preventDefault()
    eventStart = true
    window.addEventListener('mousemove', swipeHandleMove)
    window.addEventListener('mouseup', swipeHandleUp)
  }

  const swipeHandleMove = (e) => {
    if (!eventStart) return false

    const posFactorLeft = 6
    const posFactorRight = 25
    const cursorFactor = 18
    const { width, left } = iFramesContainer.current.getBoundingClientRect()
    const iWidth = parseInt(debounceInputs.iWidth) === 0 ? width : parseInt(debounceInputs.iWidth)

    // total px
    const total = left + iWidth
    const diff = total - (e.clientX - cursorFactor)
    const currentSwiperPos = iWidth - diff

    // left edge
    if (left - (e.clientX - cursorFactor) > posFactorLeft) {
      return false
    }

    // right edge
    if (total - (e.clientX - cursorFactor) < posFactorRight) {
      return false
    }
    setSwiperPos(currentSwiperPos)
  }

  const swipeHandleUp = (e) => {
    eventStart = false
    window.removeEventListener('mousemove', swipeHandleMove)
    window.removeEventListener('mouseup', swipeHandleUp)
  }

  return (
    <section
      className={`flex flex-row relative justify-center items-start ${!debounceInputs.sideBySide ? `dif-mode-overlay dif-mode-overlay--${debounceInputs.overlayMode}` : ''}`}
    >
      <div
        ref={iFramesContainer}
        className='flex flex-row gap-x-6 relative justify-center items-start w-full' style={{
          height: `${debounceInputs.iHeightDebounce}px`,
          width: debounceInputs.sideBySide ? '100%' : parseInt(debounceInputs.iWidth) === 0 ? '100%' : `${debounceInputs.iWidth}px`
        }}>
        {/* left iframe */}
        <div
          className="mockup-browser border bg-base-300 left-iframe overflow-hidden h-full"
          style={{
            opacity: debounceInputs.sideBySide || debounceInputs.overlayMode === 'swipe' ? 1 : debounceInputs.opacity,
            width: (!debounceInputs.sideBySide && debounceInputs.overlayMode === 'swipe') ? `${swiperPos + 18}px` : (parseInt(debounceInputs.iWidth) === 0 ? '100%' : `${debounceInputs.iWidth}px`)
          }}
        >
          <div
            className="mockup-browser-toolbar overflow-hidden"
            style={{
              width: (!debounceInputs.sideBySide && debounceInputs.overlayMode === 'swipe') ? (parseInt(debounceInputs.iWidth) === 0 ? 'calc(100vw - 50px)' : `${debounceInputs.iWidth}px`) : (parseInt(debounceInputs.iWidth) === 0 ? '100%' : `${debounceInputs.iWidth}px`)
            }}
          >
            <div className={`input input--flat justify-start items-center gap-x-2 ${debounceInputs.leftUrl && !leftUrlValidated ? 'input-error' : ''}`}>
              { !iFramesLoaded.leftIFrame && <span className="loading loading-spinner loading-sm -ml-1"></span> }
              { iFramesLoaded.leftIFrame &&
                <span>
                  <IconContext.Provider value={{
                    className: 'text-sm'
                  }}>
                    <FaMagnifyingGlass aria-hidden />
                  </IconContext.Provider>
                </span>
              }
              <span>
                { urlValidated.leftUrl }
              </span>
            </div>
          </div>
          <iframe
            scrolling="no"
            // src={ debounceInputs.leftUrl }
            src={ urlValidated.leftUrl }
            name="leftIFrame"
            onLoad={() => setIframesLoaded({ ...iFramesLoaded, leftIFrame: true })}
            className="h-full pointer-events-none overflow-hidden"
            style={{
              width: (!debounceInputs.sideBySide && debounceInputs.overlayMode === 'swipe') ? (parseInt(debounceInputs.iWidth) === 0 ? 'calc(100vw - 50px)' : `${debounceInputs.iWidth}px`) : (parseInt(debounceInputs.iWidth) === 0 ? '100%' : `${debounceInputs.iWidth}px`)
            }}
          ></iframe>
        </div>

        {/* right iframe */}
        <div
          className="mockup-browser border bg-base-300 w-full right-iframe overflow-hidden h-full"
          style={{
            width: parseInt(debounceInputs.iWidth) === 0 ? '100%' : `${debounceInputs.iWidth}px`
          }}
        >
          <div
            className="mockup-browser-toolbar overflow-hidden"
            style={{
              width: parseInt(debounceInputs.iWidth) === 0 ? '100%' : `${debounceInputs.iWidth}px`
            }}
          >
            <div className={`input input--flat justify-start items-center gap-x-2 ${debounceInputs.rightUrl && !rightUrlValidated ? 'input-error' : ''}`}>
              { !iFramesLoaded.rightIFrame && <span className="loading loading-spinner loading-sm -ml-1"></span> }
              { iFramesLoaded.rightIFrame &&
                <span>
                  <IconContext.Provider value={{
                    className: 'text-sm'
                  }}>
                    <FaMagnifyingGlass aria-hidden />
                  </IconContext.Provider>
                </span>
              }
              <span>
                { urlValidated.rightUrl }
              </span>
            </div>
          </div>
          <iframe
            scrolling="no"
            src={ urlValidated.rightUrl }
            name="rightIFrame"
            onLoad={() => setIframesLoaded({ ...iFramesLoaded, rightIFrame: true })}
            className="h-full pointer-events-none overflow-hidden"
            style={{
              width: parseInt(debounceInputs.iWidth) === 0 ? '100%' : `${debounceInputs.iWidth}px`
            }}
          ></iframe>
        </div>

        {/* swiper handle */}
        <div
          className={`absolute z-10 w-8 opacity-70 cursor-ew-resize ${debounceInputs.sideBySide || debounceInputs.overlayMode !== 'swipe' ? 'hidden' : ''}`}
          onMouseDown={swipeHandleDown}
          style={{
            left: `${swiperPos}px`,
            height: `${debounceInputs.iHeightDebounce}px`
          }}
        >
          <div className="my-0 mx-auto bg-red-600 h-full w-[3px]"></div>
        </div>
      </div>
    </section>
  )
}

DiffIFrames.propTypes = {
  debounceInputs: PropTypes.object.isRequired,
  handleIHeightChange: PropTypes.func.isRequired
}

export default DiffIFrames
