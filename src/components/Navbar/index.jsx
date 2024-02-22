import { useState } from 'react'
import { IconContext } from 'react-icons'
import { RiSunFill } from 'react-icons/ri'
import { HiMoon } from 'react-icons/hi'
import Modal from '../Modal'
import { DEFAULT_IHEIGHT, MIN_IHEIGHT, MAX_IHEIGHT } from '../../utils'

function Navbar () {
  const [isDarkMode, setIsDarkMode] = useState(window.localStorage.getItem('diffTheme') ? window.localStorage.getItem('diffTheme') === 'true' : true)

  const handleDarkModeChange = () => {
    setIsDarkMode(() => {
      document.querySelector('html').setAttribute('data-theme', !isDarkMode ? 'dark' : 'winter')
      window.localStorage.setItem('diffTheme', !isDarkMode)
      return !isDarkMode
    })
  }

  return (
    <div className="navbar bg-base-300 rounded-box">
      <div className="navbar-start">
        <Modal
          btnText="How to use this tool?"
          title="How to use the DiffSite Tool"
          content={`This is a simple websites comparison tool built with React.<br>
          It allows to compare two sites side by side or with an overlay effect.<br>
          Enter a valid URL in both input fields to start the comparison, in case a URL is invalid, the border of the navigation bar on the corresponding browser mock will turn red <br>
          The height of the iframes is customizable between a range of ${MIN_IHEIGHT}px - ${MAX_IHEIGHT}px, the default value is ${DEFAULT_IHEIGHT}px.<br>
          For the overlay <u>blend</u> and <u>onion</u> modes, the opacity can be adjusted.<br>
          Inside the viewport width option, the classy and treasury mobile breakpoints are available as well as other common mobile devices, for a responsive view, use the <u>full width</u> option.<br>
          There are two themes available, the dark and light themes, the default theme is dark.<br>
          The tool is responsive and works on all devices.<br>
          <b><u>Important Note</u></b>: Not all websites can be iframed because of their own configuration, if you encounter any issues, please try another website.`}
        />
      </div>
      <div className="navbar-center">
        <h2 className="text-xl font-medium tracking-widest">Bankrate DiffSite Tool</h2>
      </div>
      <div className="navbar-end mr-4">
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
                <HiMoon aria-hidden />
              </IconContext.Provider>
            </div>
          </div>
          <div className="swap-off">
            <div className="flex flex-col items-center">
              <IconContext.Provider value={{ className: 'text-3xl' }}>
                <RiSunFill aria-hidden />
              </IconContext.Provider>
            </div>
          </div>
        </label>
      </div>
    </div>
  )
}

export default Navbar
