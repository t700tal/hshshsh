import { createSlice } from '@reduxjs/toolkit'

import { Book, BooksState } from '../../types/book'

const initialState: BooksState = {
  data: [],
  sortKey: "date",
  searchKey: "",
}

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    setBooks(state, action) {
      state.data = action.payload
    },
    addBook(state, action) {
      state.data.push(action.payload)
    },
    updateBookActivity(state, action) {
      const { id, activity } = action.payload
      state.data.map((b: Book) => {
        if (b.id === id) {
          b.activity = activity
        }
      })
    },
    addCommentToBook(state, action) {
      const { bookId, data } = action.payload
      state.data.map((b: Book) => {
        if (b.id === bookId) {
          b.comments.push(data)
        }
      })
    },
    addRatingToBook(state, action) {
      const { bookId, data } = action.payload
      state.data.map((b: Book) => {
        if (b.id === bookId) {
          b.ratings.push(data)
        }
      })
    },
    setSortKey(state, action) {
      state.sortKey = action.payload
    },
    setSearchKey(state, action) {
      state.searchKey = action.payload
    },
  },
})

export const booksActions = booksSlice.actions
export const booksReducer = booksSlice.reducer
