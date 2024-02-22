import { useState } from 'react'
import { IconContext } from 'react-icons'
import { MdOutlineWbSunny } from 'react-icons/md'
import { FiMoon } from 'react-icons/fi'
import Modal from '../Modal'

function Navbar () {
  const [isDarkMode, setIsDarkMode] = useState(window.localStorage.getItem('diffTheme') ? window.localStorage.getItem('diffTheme') : false)

  const handleDarkModeChange = () => {
    setIsDarkMode(() => {
      document.querySelector('html').setAttribute('data-theme', isDarkMode ? 'dark' : 'winter')
      window.localStorage.setItem('diffTheme', !isDarkMode)
      return !isDarkMode
    })
  }

  return (
    <div className="navbar bg-base-300 rounded-box">
      <div className="flex-1">
        <Modal
          btnText="How to use this tool?"
          title="How to use the Diffsite Tool"
          content="This is a simple websites comparison tool built with React.<br>
          It allows to compare two sites side by side or with an overlay effect.<br>
          The height of the iframes is customizable, the default value is 8200px.<br>
          For the overlay <u>blend</u> and <u>onion</u> modes, the opacity can be adjusted.<br>
          Inside the viewport width option, the classy and treasury mobile breakpoints are available as well as other common mobile devices, for a responsive view, use the <u>full width</u> option.<br>
          The tool is responsive and works on all devices.<br>
          <b><u>Important Note</u></b>: Not all websites can be iframed because of its own configuration, if you encounter any issues, please try another website."
        />
      </div>
      <div className="flex-none mr-4">
        <label className="swap swap-rotate">
          {/* theme switcher */}
          <input
            type="checkbox"
            name="sideBySide"
            checked={isDarkMode}
            onChange={handleDarkModeChange}
          />
          <div className="swap-on">
            <div className="flex flex-col items-center">
              <IconContext.Provider value={{ className: 'text-3xl ' }}>
                <MdOutlineWbSunny aria-hidden />
              </IconContext.Provider>
            </div>
          </div>
          <div className="swap-off">
            <div className="flex flex-col items-center">
              <IconContext.Provider value={{ className: 'text-3xl' }}>
                <FiMoon aria-hidden />
              </IconContext.Provider>
            </div>
          </div>
        </label>
      </div>
    </div>
  )
}

export default Navbar
