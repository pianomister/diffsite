import PropTypes from 'prop-types'

function DiffInput ({
  diffInput,
  handleDiffInputChange
}) {
  return (
    <section className="flex flex-col w-full lg:flex-row">
      {/* Right side url */}
      <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
        <label className="form-control w-full max-w-xs">
          <input type="text"
            placeholder="Website URL"
            name="leftUrl"
            className="input input-bordered w-full max-w-xs"
            onChange={handleDiffInputChange}
            value={diffInput.leftUrl}
          />
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
          <input type="text"
            placeholder="Another Website URL"
            name="rightUrl"
            className="input input-bordered w-full max-w-xs"
            onChange={handleDiffInputChange}
            value={diffInput.rightUrl}
          />
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
  handleDiffInputChange: PropTypes.func.isRequired
}

export default DiffInput
