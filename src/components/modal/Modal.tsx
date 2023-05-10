import { FC, PropsWithChildren, useState } from "react"
import ReactModal from "react-modal"

import "./Modal.scss"

interface Props extends PropsWithChildren {
  className?: string
  isOpen: boolean
  onClose: () => void
}

ReactModal.setAppElement('#modals')

const Modal: FC<Props> = ({ className, children, isOpen, onClose }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onClose}
    className={`modal ${className ? className : ""}`}
    overlayClassName='overlay'
  >
    {children}
  </ReactModal>
)

export default Modal
