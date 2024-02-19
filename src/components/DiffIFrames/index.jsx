import { useEffect, useRef, useState } from 'react'
import { DEFAULT_IHEIGHT } from '../../utils'
import PropTypes from 'prop-types'

function DiffIFrames ({
  debounceInputs,
  handleIHeightChange
}) {
  const [firstLoad, setFirstLoad] = useState(true)
  const iFrameLeft = useRef(null)
  const iFrameRight = useRef(null)

  useEffect(() => {
    if (!firstLoad) {
      const value = parseInt(debounceInputs.iHeight)
      if (isNaN(value) || value < 1500 || value > 20000) {
        handleIHeightChange(false)
      } else {
        iFrameRight.current.style.height = `${value}px`
        iFrameLeft.current.style.height = `${value}px`
        iFrameLeft.current.style.width = parseInt(debounceInputs.iWidth) === 0 ? '100%' : `${debounceInputs.iWidth}px`
        iFrameRight.current.style.width = parseInt(debounceInputs.iWidth) === 0 ? '100%' : `${debounceInputs.iWidth}px`
      }
    } else {
      setFirstLoad(false)
    }
  }, [debounceInputs.iHeight, debounceInputs.iWidth])

  return (
    <section className='flex gap-x-6 justify-center'>
      {/* left iframe */}
      <div ref={iFrameLeft} className="mockup-browser border bg-base-300 w-full" style={{ height: `${DEFAULT_IHEIGHT}px` }}>
        <div className="mockup-browser-toolbar">
          <div className="input">{ debounceInputs.leftUrl }</div>
        </div>
        {/* <div className="flex justify-center px-4 py-16 bg-base-200">Hello!</div> */}
        <iframe scrolling="no" src={ debounceInputs.leftUrl } name="myiFrame" className='w-full h-full overflow-hidden'></iframe>
      </div>

      {/* right iframe */}
      <div ref={iFrameRight} className="mockup-browser border bg-base-300 w-full" style={{ height: `${DEFAULT_IHEIGHT}px` }}>
        <div className="mockup-browser-toolbar">
          <div className="input">{ debounceInputs.rightUrl }</div>
        </div>
        {/* <div className="flex justify-center px-4 py-16 bg-base-200">Hello!</div> */}
        <iframe scrolling="no" src={ debounceInputs.rightUrl } name="myiFrame" className='w-full h-full overflow-hidden'></iframe>
      </div>
    </section>
  )
}

DiffIFrames.propTypes = {
  debounceInputs: PropTypes.object.isRequired,
  handleIHeightChange: PropTypes.func.isRequired
}

export default DiffIFrames
