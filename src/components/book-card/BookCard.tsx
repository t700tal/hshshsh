import { FC, useState, ChangeEventHandler } from "react"
import { AiFillStar, AiOutlineMessage } from "react-icons/ai"
import { useDispatch } from "react-redux"

import { Book } from "../../types/book"
import { updateBookActivity, createBookRating } from "../../actions/books"
import { calcAvgBookRating } from "../../utils/book"
import BookModal from "../book-modal/BookModal"
import ConfirmModal from "../confirm-modal/ConfirmModal"

import "./BookCard.scss"
import { toastError } from "../../utils/error"
import CommentsModal from "../comments-modal/CommentsModal"

const BookCard: FC<Book> = (book) => {
  const { id, title, image, description,
          categories, ratings, price, author, activity, } = book
  const [didOpenBookModal, setDidOpenBookModal] = useState(false)
  const [didOpenCommentsModal, setDidOpenCommentsModal] = useState(false)
  const dispatch = useDispatch<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [isRatingLoading, setIsRatingLoading] = useState(false)
  const openBookModal = () => setDidOpenBookModal(true)
  const [activityChanges, setActivityChanges] = useState<{isChanging: boolean, requestedValue: boolean | null}>({
    isChanging: false,
    requestedValue: null,
  })

  const openConfirmModal: ChangeEventHandler<HTMLInputElement> = (e) => {
    setActivityChanges({
      isChanging: true,
      requestedValue: e.target.checked,
    })
  }
  
  const changeActivity = async () => {
    try {
      setIsLoading(true)
      await dispatch(updateBookActivity(id, activityChanges.requestedValue))
    } catch (error) {
      toastError(error)
    }
    setIsLoading(false)
  }

  const closeConfirmModal = () => {
    setActivityChanges({
      isChanging: false,
      requestedValue: null,
    })
  }

  const createRating = async (grade: number) => {
    try {
      setIsRatingLoading(true)
      await dispatch(createBookRating(id, grade))
    } catch (error) {
      toastError(error)
    }
    setIsRatingLoading(false)
  }

  return (
    <>
      <div className='book-card'>
        <img src={image} alt={`${title}'s image`} />
        <div className='book-info'>
          <div className='book-header'>
            <div onClick={openBookModal} className='book-title'>
              {title}
            </div>
            <span onClick={openBookModal} className='book-author'>
              {author.name}
            </span>
          </div>
          <div onClick={openBookModal} className='book-desc'>
            {description}
          </div>
          <div className='book-activity'>
            <label htmlFor={`${id}-activity`}>Book activity</label>
            {isLoading ? (
              <img
                className='loading-spinner'
                src='/loading.svg'
                alt='Loading spinner'
              />
            ) : (
              <input
                onChange={openConfirmModal}
                checked={activity}
                type='checkbox'
                id={`${id}-activity`}
              />
            )}
          </div>
          <div className='book-reputation'>
            {isRatingLoading ? (
              <img src='/loading.svg' alt='Orange loading spinner' />
            ) : (
              <span className='grade'>{calcAvgBookRating(ratings)}</span>
            )}
            <div className='book-rating'>
              <AiFillStar
                className='star-icon'
                onClick={() => createRating(1)}
              />
              <AiFillStar
                className='star-icon'
                onClick={() => createRating(2)}
              />
              <AiFillStar
                className='star-icon'
                onClick={() => createRating(3)}
              />
              <AiFillStar
                className='star-icon'
                onClick={() => createRating(4)}
              />
              <AiFillStar
                className='star-icon'
                onClick={() => createRating(5)}
              />
            </div>
            <AiOutlineMessage
              onClick={() => setDidOpenCommentsModal(true)}
              className='comment-icon'
            />
          </div>
          <span onClick={openBookModal} className='book-categories'>
            {categories.join(", ")}
          </span>
          <div className='book-price'>${price}</div>
        </div>
      </div>
      <ConfirmModal
        isOpen={activityChanges.isChanging}
        onCofirm={changeActivity}
        onClose={closeConfirmModal}
      />
      <BookModal
        book={book}
        isOpen={didOpenBookModal}
        onClose={() => setDidOpenBookModal(false)}
      />
      <CommentsModal
        book={book}
        isOpen={didOpenCommentsModal}
        onClose={() => setDidOpenCommentsModal(false)}
      />
    </>
  )
}

export default BookCard
