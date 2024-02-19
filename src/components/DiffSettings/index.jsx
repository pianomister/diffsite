import PropTypes from 'prop-types'
import { BsLayoutSplit } from 'react-icons/bs'
import { MdContentCopy } from 'react-icons/md'
import { IconContext } from 'react-icons'

function DiffSettings ({
  diffSettings,
  handleDiffSettingsChange
}) {
  const btnStyles = {
    backgroundColor: 'slategrey',
    borderColor: 'slategrey'
  }

  return (
    <section className='flex justify-center items-start gap-x-8 flex-wrap py-4 sticky top-0 z-10 bg-[#1D232A]'>
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
          <option value="0" data-breakpoint="no-breakpoint">No specific breakpoint</option>
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
          <span className="label-text text-base">Comparison mode</span>
        </div>
        <label className="swap swap-flip">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            name="sideBySide"
            checked={diffSettings.sideBySide}
            onChange={handleDiffSettingsChange}
          />
          <div className="swap-on">
            <div className="flex flex-col items-center">
              <IconContext.Provider value={{ className: 'text-4xl' }}>
                <BsLayoutSplit aria-hidden />
              </IconContext.Provider>
              <span className="label-text text-base">Side By Side</span>
            </div>
          </div>
          <div className="swap-off">
            <div className="flex flex-col items-center">
              <IconContext.Provider value={{ className: 'text-4xl' }}>
                <MdContentCopy aria-hidden />
              </IconContext.Provider>
              <span className="label-text text-base">Overlay</span>
            </div>
          </div>
        </label>
      </div>

      {/* overlay options */}
      <div className="flex flex-col">
        <div className="label self-center">
          <span className={`label-text text-base ${diffSettings.sideBySide ? 'text-gray-600' : ''}`}>Overlay mode</span>
        </div>
        <div className="join">
          <input
            style={ diffSettings.overlayMode === 'Swipe' && diffSettings.sideBySide ? btnStyles : {} }
            className="join-item btn"
            type="radio"
            name="overlayMode"
            aria-label="Swipe"
            value="Swipe"
            checked={ diffSettings.overlayMode === 'Swipe'}
            onClick={ handleDiffSettingsChange }
            disabled={ diffSettings.sideBySide }
          />
          <input
            style={ diffSettings.overlayMode === 'Blend' && diffSettings.sideBySide ? btnStyles : {} }
            className="join-item btn"
            type="radio"
            name="overlayMode"
            aria-label="Blend"
            value="Blend"
            checked={ diffSettings.overlayMode === 'Blend'}
            onClick={handleDiffSettingsChange}
            disabled={diffSettings.sideBySide}
          />
          <input
            style={ diffSettings.overlayMode === 'Onion' && diffSettings.sideBySide ? btnStyles : {} }
            className="join-item btn"
            type="radio"
            name="overlayMode"
            aria-label="Onion"
            value="Onion"
            checked={ diffSettings.overlayMode === 'Onion'}
            onClick={handleDiffSettingsChange}
            disabled={diffSettings.sideBySide}
          />
        </div>
      </div>

      {/* opacity for overlay options */}
      <div className="flex flex-col basis-56">
        <div className="label self-center">
          <span className={`label-text text-base ${diffSettings.sideBySide ? 'text-gray-600' : ''}`}>Opacity</span>
        </div>
        <input
          name="opacity"
          type="range"
          min="0"
          max="1"
          value={diffSettings.opacity}
          step="0.01"
          className={`range ${diffSettings.sideBySide ? '' : 'range-primary'}`}
          onChange={handleDiffSettingsChange}
          disabled={diffSettings.sideBySide}
        />
        <div className="label self-center">
          <span className={`label-text text-base ${diffSettings.sideBySide ? 'text-gray-600' : ''}`}>{Math.floor(diffSettings.opacity * 100)}%</span>
        </div>
      </div>

    </section>
  )
}

DiffSettings.propTypes = {
  diffSettings: PropTypes.object.isRequired,
  handleDiffSettingsChange: PropTypes.func.isRequired
}
export default DiffSettings
