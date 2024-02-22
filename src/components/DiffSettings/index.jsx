import './DiffSettings.css'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BsLayoutSplit } from 'react-icons/bs'
import { MdContentCopy } from 'react-icons/md'
import { IconContext } from 'react-icons'

function DiffSettings ({
  diffSettings,
  handleDiffSettingsChange,
  handleBreakPointChange
}) {
  const [isLgView, setIsLgView] = useState(true)
  const btnStyles = {
    backgroundColor: 'slategrey',
    borderColor: 'slategrey'
  }

  const resizeObserver = new ResizeObserver((entries) => {
    const { width } = entries[0].contentRect
    if (width <= 1007) {
      setIsLgView(false)
    } else {
      setIsLgView(true)
    }
  })

  useEffect(() => {
    const { width } = document.documentElement.getBoundingClientRect()
    if (width <= 1007) {
      setIsLgView(false)
    }
    resizeObserver.observe(document.documentElement)

    return () => {
      resizeObserver.unobserve(document.documentElement)
    }
  }, [])

  useEffect(() => {
    console.log(isLgView)
    const { width } = document.documentElement.getBoundingClientRect()
    if (!isLgView && width <= 1007 && diffSettings.sideBySide) {
      handleBreakPointChange()
    }
  }, [isLgView])

  return (
    <section className='flex justify-center items-start gap-x-8 flex-wrap py-4 sticky top-0 z-20 bg-base-300 rounded-box'>
      {/* iframe height */}
      <label className="form-control min-w-56 max-w-xs">
        <div className="label self-center">
          <span className="label-text text-base">Iframes height (px)</span>
        </div>
        <input type="text"
          placeholder="Iframes height"
          name="iHeight"
          className="input input-bordered w-full max-w-xs"
          onChange={handleDiffSettingsChange}
          value={diffSettings.iHeight}
        />
      </label>
      {/* viewport width */}
      <label className="form-control min-w-56 max-w-xs">
        <div className="label self-center">
          <span className="label-text text-base">Viewport width</span>
        </div>
        <select
          name="iWidth"
          className="select select-bordered"
          value={diffSettings.iWidth}
          onChange={handleDiffSettingsChange}
        >
          <option value="0" data-breakpoint="full-width">Full Width</option>
          <optgroup label="Classy Breakpoints">
            <option value="599" data-breakpoint="classy-mb">Classy Mobile</option>
            {/* <option value="900" data-breakpoint="classy-sm">Classy Small</option> */}
            {/* <option value="1001" data-breakpoint="classy-md">Classy Medium</option> */}
            {/* <option value="1441" data-breakpoint="classy-lg">Classy Large</option> */}
          </optgroup>

          <optgroup label="Classy Breakpoints">
            <option value="639" data-breakpoint="treasury-mb">Treasury Mobile</option>
            {/* <option value="879" data-breakpoint="treasury-sm">Treasury Small</option> */}
            {/* <option value="881" data-breakpoint="treasury-md">Treasury Medium</option> */}
            {/* <option value="1121" data-breakpoint="treasury-lg">Treasury Large</option> */}
          </optgroup>

          <optgroup label="Mobile Devices">
            <option value="320" data-breakpoint="iphone-5">iPhone 5/SE</option>
            <option value="360" data-breakpoint="galaxy-s5">Galaxy S5</option>
            <option value="412" data-breakpoint="galaxy-a51">Galaxy A51</option>
            <option value="375" data-breakpoint="iphone-xxs">iPhone X/XS</option>
            <option value="411" data-breakpoint="pixel-2">Pixel 2</option>
          </optgroup>
        </select>
      </label>

      {/* compare mode */}
      <div className="flex flex-col">
        <div className="label self-center">
          <span className={`label-text text-base ${!isLgView && 'disabled-text'}`}>Comparison mode</span>
        </div>
        <label className="swap swap-flip">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            name="sideBySide"
            checked={diffSettings.sideBySide}
            onChange={handleDiffSettingsChange}
            disabled={!isLgView}
          />
          <div className="swap-on">
            <div className="flex flex-col items-center">
              <IconContext.Provider value={{ className: `text-4xl ${isLgView ? 'text-primary' : 'text-slategrey'}` }}>
                <BsLayoutSplit aria-hidden />
              </IconContext.Provider>
              <span className={`label-text text-base ${!isLgView && 'disabled-text'}`}>Side By Side</span>
            </div>
          </div>
          <div className="swap-off">
            <div className="flex flex-col items-center">
              <IconContext.Provider value={{ className: `text-4xl ${isLgView ? 'text-primary' : 'text-slategrey'}` }}>
                <MdContentCopy aria-hidden />
              </IconContext.Provider>
              <span className={`label-text text-base ${!isLgView && 'disabled-text'}`}>Overlay</span>
            </div>
          </div>
        </label>
      </div>

      {/* overlay options */}
      <div className="flex flex-col">
        <div className="label self-center">
          <span className={`label-text text-base ${diffSettings.sideBySide ? 'disabled-text' : ''}`}>Overlay mode</span>
        </div>
        <div className="join">
          <input
            style={ diffSettings.overlayMode === 'swipe' && diffSettings.sideBySide ? btnStyles : {} }
            className="join-item btn custom-radio"
            type="radio"
            name="overlayMode"
            aria-label="Swipe"
            value="swipe"
            checked={ diffSettings.overlayMode === 'swipe'}
            onChange={ handleDiffSettingsChange }
            disabled={ diffSettings.sideBySide }
          />
          <input
            style={ diffSettings.overlayMode === 'blend' && diffSettings.sideBySide ? btnStyles : {} }
            className="join-item btn custom-radio"
            type="radio"
            name="overlayMode"
            aria-label="Blend"
            value="blend"
            checked={ diffSettings.overlayMode === 'blend'}
            onChange={handleDiffSettingsChange}
            disabled={diffSettings.sideBySide}
          />
          <input
            style={ diffSettings.overlayMode === 'onion' && diffSettings.sideBySide ? btnStyles : {} }
            className="join-item btn custom-radio"
            type="radio"
            name="overlayMode"
            aria-label="Onion"
            value="onion"
            checked={ diffSettings.overlayMode === 'onion'}
            onChange={handleDiffSettingsChange}
            disabled={diffSettings.sideBySide}
          />
        </div>
      </div>

      {/* opacity for overlay options */}
      <div className="flex flex-col basis-56">
        <div className="label self-center">
          <span className={`label-text text-base ${diffSettings.sideBySide || diffSettings.overlayMode === 'swipe' ? 'disabled-text' : ''}`}>Opacity</span>
        </div>
        <input
          name="opacity"
          type="range"
          min="0"
          max="1"
          value={diffSettings.opacity}
          step="0.01"
          className={`range ${diffSettings.sideBySide || diffSettings.overlayMode === 'swipe' ? '' : 'range-primary'}`}
          onChange={handleDiffSettingsChange}
          disabled={diffSettings.sideBySide || diffSettings.overlayMode === 'swipe'}
        />
        <div className="label self-center">
          <span className={`label-text text-base ${diffSettings.sideBySide || diffSettings.overlayMode === 'swipe' ? 'disabled-text' : ''}`}>{Math.floor(diffSettings.opacity * 100)}%</span>
        </div>
      </div>

    </section>
  )
}

DiffSettings.propTypes = {
  diffSettings: PropTypes.object.isRequired,
  handleDiffSettingsChange: PropTypes.func.isRequired,
  handleBreakPointChange: PropTypes.func.isRequired
}
export default DiffSettings
