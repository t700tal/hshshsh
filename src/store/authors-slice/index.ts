import { createSlice } from '@reduxjs/toolkit'

import { Author, AuthorState } from '../../types/author'

const initialState: AuthorState = {
  data: [],
  searchKey: "",
}

const authorsSlice = createSlice({
  name: 'authors',
  initialState: initialState,
  reducers: {
    setAuthors(state, action) {
      state.data = action.payload
    },
    addAuthor(state, action) {
      state.data.push(action.payload)
    },
    updateAuthorActivity(state, action) {
      const { id, isActive } = action.payload
      state.data.map((a: Author) => {
        if (a.id === id) {
          a.isActive = isActive
        }
      })
    },
    setSearchKey(state, action) {
      state.searchKey = action.payload
    },
  },
})

export const authorsActions = authorsSlice.actions
export const authorsReducer = authorsSlice.reducer
