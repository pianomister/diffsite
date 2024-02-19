import './DiffIFrames.css'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function DiffIFrames ({
  debounceInputs,
  handleIHeightChange
}) {
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    if (!firstLoad) {
      const value = debounceInputs.iHeightDebounce
      if (isNaN(value) || value < 1500 || value > 20000) {
        handleIHeightChange(false)
      }
    } else {
      setFirstLoad(false)
    }
  }, [debounceInputs.iHeightDebounce, debounceInputs.iWidth])

  return (
    <section
      className={`flex flex-row gap-x-6 relative ${!debounceInputs.sideBySide ? `dif-mode-overlay dif-mode-overlay--${debounceInputs.overlayMode}` : 'justify-center'}`}
      style={{
        height: `${debounceInputs.iHeightDebounce}px`
      }}
    >
      {/* left iframe */}
      <div
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
    </section>
  )
}

DiffIFrames.propTypes = {
  debounceInputs: PropTypes.object.isRequired,
  handleIHeightChange: PropTypes.func.isRequired
}

export default DiffIFrames
