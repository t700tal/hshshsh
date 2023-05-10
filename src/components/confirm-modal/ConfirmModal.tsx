import { FC } from "react"
import { AiOutlineExclamationCircle } from "react-icons/ai"

import Modal from "../modal/Modal"

import "./ConfirmModal.scss"

interface Props {
  isOpen: boolean
  onClose: () => void
  onCofirm: () => Promise<void>
}

const ConfirmModal: FC<Props> = ({
  onClose,
  isOpen,
  onCofirm,
  ...restProps
}) => {
  const confirmHandler = async () => {
    await onCofirm()
    onClose()
  }
  return (
    <Modal
      className='confirm-modal'
      onClose={onClose}
      isOpen={isOpen}
      {...restProps}
    >
      <AiOutlineExclamationCircle className='exc-icon' />
      <span className='confirm-text'>Are you sure?</span>
      <div className='buttons'>
        <button onClick={onClose}>Cancel</button>
        <button onClick={confirmHandler}>Yes</button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
