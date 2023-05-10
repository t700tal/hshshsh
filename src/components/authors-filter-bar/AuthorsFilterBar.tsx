import { ChangeEventHandler } from "react"
import { useDispatch, useSelector } from "react-redux"

import { RootState } from "../../store"
import { authorsActions } from "../../store/authors-slice"

import "./AuthorsFilterBar.scss"

const AuthorFilterBar = () => {
  const dispatch = useDispatch()
  const searchKey = useSelector((state: RootState) => state.authors.searchKey)

  const searchChangeHandler: ChangeEventHandler<any> = (e) => {
    dispatch(authorsActions.setSearchKey(e.target.value))
  }
  return (
    <div className='authors-filter-bar'>
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

export default AuthorFilterBar
