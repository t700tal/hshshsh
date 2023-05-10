import { FC, ChangeEventHandler, useState, FormEventHandler } from "react"
import { useDispatch } from "react-redux"

import { Book, Comment } from "../../types/book"
import Modal from "../modal/Modal"

import { addCommentToBook } from "../../actions/books"
import { toastError } from "../../utils/error"

import "./CommentsModal.scss"

interface Props {
  isOpen: boolean
  onClose: () => void
  book: Book
}
const CommentsModal: FC<Props> = ({ isOpen, onClose, book }) => {
  const [comment, setComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch<any>()

  const changeValueHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setComment(e.target.value)
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await dispatch(addCommentToBook(book.id, comment))
    } catch (error) {
      toastError(error)
    }
    setIsLoading(false)
  }

  return (
    <Modal className='comments-modal' onClose={onClose} isOpen={isOpen}>
      <div className='title'>Comments</div>
      <div className='comments'>
        {book.comments.map(({ comment }: Comment) => (
          <span key={comment.id} className='comment'>
            {comment.text}
          </span>
        ))}
      </div>
      <form className='new-comment' onSubmit={submitHandler}>
        <input onChange={changeValueHandler} type='text' />
        {isLoading ? (
          <img src='/loading.svg' alt='Orange loading spinner' />
        ) : (
          <button type='submit' className='add-btn'>
            Add
          </button>
        )}
      </form>
      <button className='close-btn' onClick={onClose}>
        Close
      </button>
    </Modal>
  )
}

export default CommentsModal
