import { useState } from "react"
import ReactPaginate from "react-paginate"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import { useSelector } from "react-redux"

import BooksFilterBar from "../../components/books-filter-bar/BooksFilterBar"
import BookCard from "../../components/book-card/BookCard"
import { filterBooks } from "../../utils/book"
import { Book } from "../../types/book"
import { RootState } from "../../store"

import "./Books.scss"

const Books = () => {
  const { data: books, sortKey, searchKey } = useSelector((state: RootState) => state.books)
  const [itemOffset, setItemOffset] = useState(0)

  const itemsPerPage = 12

  const endOffset = itemOffset + itemsPerPage
  const currentItems = filterBooks(books, sortKey, searchKey)?.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(books.length / itemsPerPage)

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % books.length
    setItemOffset(newOffset)
  }

  return (
    <div className='books'>
      <BooksFilterBar />
      <div className='books-list'>
        {currentItems?.map((book: Book) => 
          <BookCard key={book.id} {...book} />
        )}
      </div>
      <ReactPaginate
        nextLabel={<GrFormNext />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<GrFormPrevious />}
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  )
}

export default Books
