import PropTypes from 'prop-types'

function DiffInput ({
  diffInput,
  handleDiffInputChange,
  iFramesLoaded,
  handleIFramesLoad
}) {
  return (
    <section className="flex flex-col w-full lg:flex-row">
      {/* Right side url */}
      <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
        <label className="form-control w-full max-w-xs">
          <div className="flex flex-row gap-x-2">
            <input type="text"
              placeholder="Website URL"
              name="leftUrl"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                if (e.target.value.trim() !== '') {
                  handleIFramesLoad('leftIFrame', false)
                } else {
                  handleIFramesLoad('leftIFrame', true)
                }
                handleDiffInputChange(e)
              }}
              value={diffInput.leftUrl}
            />
            <span className={`${iFramesLoaded.leftIFrame ? 'invisible' : 'visible'} loading loading-spinner text-info`}></span>
          </div>
          <div className="label pb-0">
            <span className="label-text text-base">First URL</span>
          </div>
        </label>
      </div>

      {/* Divider */}
      <div className="divider lg:divider-horizontal">
        VS
      </div>

      {/* Left side url */}
      <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
        <label className="form-control w-full max-w-xs">
          <div className="flex flex-row gap-x-2">
            <input type="text"
              placeholder="Another Website URL"
              name="rightUrl"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => {
                if (e.target.value.trim() !== '') {
                  handleIFramesLoad('rightIFrame', false)
                } else {
                  handleIFramesLoad('rightIFrame', true)
                }
                handleDiffInputChange(e)
              }}
              value={diffInput.rightUrl}
            />
            <span className={`${iFramesLoaded.rightIFrame ? 'invisible' : 'visible'} loading loading-spinner text-info`}></span>
          </div>
          <div className="label pb-0">
            <span className="label-text text-base">Second URL</span>
          </div>
        </label>
      </div>
    </section>
  )
}
DiffInput.propTypes = {
  diffInput: PropTypes.object.isRequired,
  handleDiffInputChange: PropTypes.func.isRequired,
  iFramesLoaded: PropTypes.object.isRequired,
  handleIFramesLoad: PropTypes.func.isRequired
}

export default DiffInput
