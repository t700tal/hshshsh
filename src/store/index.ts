import { configureStore } from '@reduxjs/toolkit'

import { authorsReducer } from './authors-slice'
import { AuthorState } from '../types/author'
import { booksReducer } from './books-slice'
import { BooksState } from '../types/book'

const store = configureStore({
  reducer: {
    authors: authorsReducer,
    books: booksReducer,
  },
})

export interface RootState {
  authors: AuthorState
  books: BooksState
}

export default store
