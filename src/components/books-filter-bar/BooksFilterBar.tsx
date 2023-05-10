import { ChangeEventHandler } from "react"
import { useDispatch, useSelector } from "react-redux"

import { booksActions } from "../../store/books-slice"
import { RootState } from "../../store"

import "./BooksFilterBar.scss"

const BooksFilterBar = () => {
  const dispatch = useDispatch()
  const searchKey = useSelector((state: RootState) => state.books.searchKey)

  const sortChangeHandler: ChangeEventHandler<any> = (e) => {
    dispatch(booksActions.setSortKey(e.target.value))
  }
  const searchChangeHandler: ChangeEventHandler<any> = (e) => {
    dispatch(booksActions.setSearchKey(e.target.value))
  }
  return (
    <div className='books-filter-bar'>
      <div className='sort'>
        <span>Sort:</span>
        <select onChange={sortChangeHandler}>
          <option value='date'>Date created</option>
          <option value='rating'>Rating</option>
        </select>
      </div>
      <input
        value={searchKey}
        onChange={searchChangeHandler}
        placeholder='Search...'
        className='search'
        type='text'
      />
    </div>
  )
}

export default BooksFilterBar
