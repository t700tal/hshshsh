import { FC } from "react"

import Modal from "../modal/Modal"
import { Book } from "../../types/book"

import "./BookModal.scss"

interface Props {
  isOpen: boolean
  onClose: () => void
  book: Book
}

const BookModal: FC<Props> = ({ isOpen, onClose, book }) => {
  return (
    <Modal className='book-modal' onClose={onClose} isOpen={isOpen}>
      <span className='type'>Name:</span>
      <span className='title'>{book.title}</span>
      <span className='type'>Author:</span>
      <span className='author'>{book.author.name}</span>
      <span className='type'>Categories:</span>
      <span className='author'>{book.categories.join(", ")}</span>
      <span className='description'>{book.description}</span>
      <button onClick={onClose}>Close</button>
    </Modal>
  )
}

export default BookModal
