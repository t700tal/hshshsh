import { FC } from "react"
import { useSelector } from "react-redux"

import Modal from "../modal/Modal"
import { RootState } from "../../store"

import "./BooksListModal.scss"

interface Props {
  isOpen: boolean
  authorId: string
  onClose: () => void
}

const BooksListModal: FC<Props> = ({ onClose, authorId, isOpen }) => {
  const books = useSelector((state: RootState) => state.books.data)
  const authorBooks = books.filter((book) => book.author.id === authorId)
  return (
    <Modal className='books-list-modal' onClose={onClose} isOpen={isOpen}>
      <div className='books-list'>
        {authorBooks.length > 0 ? (
          authorBooks.map((book) => (
            <div key={book.id} className='book-item'>
              <div className='book-item-title'>{book.title}</div>
            </div>
          ))
        ) : (
          <div>No books yet</div>
        )}
      </div>
      <button onClick={onClose}>Close</button>
    </Modal>
  )
}

export default BooksListModal
