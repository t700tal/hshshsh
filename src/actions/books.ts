import axios from "axios"
import { booksActions } from "../store/books-slice"

export const fetchBooks = () => async (dispatch: any) => {
  const { data } = await axios.get('/api/books')
  dispatch(booksActions.setBooks(data))
}

export const updateBookActivity = (id: string, activity: null | boolean) => async (dispatch: any) => {
  await axios.patch(`/api/books/activity/${id}`, { activity })
  dispatch(booksActions.updateBookActivity({ id, activity }))
}

export const createBook = (book: FormData) => async (dispatch: any) => {
  const { data } = await axios.post("/api/books/", book)
  await dispatch(booksActions.addBook(data))
}

export const addCommentToBook = (bookId: string, text: string) => async (dispatch: any) => {
  const { data } = await axios.post(`/api/comments/${bookId}`, {
    text,
  })
  await dispatch(booksActions.addCommentToBook({ bookId, data }))
}

export const createBookRating = (bookId: string, grade: number) => async (dispatch: any) => {
  const { data } = await axios.post(`/api/ratings/${bookId}`, {
    grade,
  })
  await dispatch(booksActions.addRatingToBook({ bookId, data }))
}
