import { useState } from 'react'
import DiffInput from './components/DiffInput'
import DiffSettings from './components/DiffSettings'
import DiffIFrames from './components/DiffIFrames'
import { useDebounce } from './hooks/useDebounce'
import { DEFAULT_IHEIGHT } from './utils'

function App () {
  const [diffInput, setDiffInput] = useState({
    leftUrl: 'https://www.bankrate.com',
    rightUrl: 'https://www.bankrate.com'
  })

  const [diffSettings, setDiffSettings] = useState({
    iHeight: DEFAULT_IHEIGHT,
    iWidth: 0,
    sideBySide: true,
    overlayMode: 'swipe',
    opacity: 1
  })

  const handleDiffInputChange = (e) => {
    setDiffInput({
      ...diffInput,
      [e.target.name]: e.target.value
    })
  }

  const handleDiffSettingsChange = (e) => {
    setDiffSettings({
      ...diffSettings,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }
    )
  }

  const handleIHeightChange = (isValid) => {
    if (!isValid) {
      setDiffSettings({
        ...diffSettings,
        iHeight: DEFAULT_IHEIGHT
      })
    }
  }
  return (
    <>
      <DiffInput
        diffInput={diffInput}
        handleDiffInputChange={handleDiffInputChange}
      />
      <DiffSettings
        diffSettings={diffSettings}
        handleDiffSettingsChange={handleDiffSettingsChange}
      />
      <DiffIFrames debounceInputs= {
          {
            leftUrl: useDebounce(diffInput.leftUrl, 1000),
            rightUrl: useDebounce(diffInput.rightUrl, 1000),
            iHeightDebounce: useDebounce(diffSettings.iHeight, 1000),
            ...diffSettings
          }
        }
        handleIHeightChange = { handleIHeightChange }
      />
    </>
  )
}

export default App
