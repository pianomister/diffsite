import PropTypes from 'prop-types'
import { IconContext } from 'react-icons'
import { BsInfoCircleFill } from 'react-icons/bs'

function Modal ({
  btnText,
  title,
  content
}) {
  return (
    <>
      <button className="btn btn-ghost" onClick={() => document.getElementById('my_modal_5').showModal()}>
      <IconContext.Provider value={{ className: 'text-2xl' }}>
        <BsInfoCircleFill />
      </IconContext.Provider>
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg px-4">{ title }</h3>
          <p className="p-4" dangerouslySetInnerHTML={{ __html: content }} />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

Modal.propTypes = {
  btnText: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string
}

export default Modal
