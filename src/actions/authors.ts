import axios from "axios"

import { authorsActions } from "../store/authors-slice"
import { fetchBooks } from "./books"

export const fetchAuthors = () => async (dispatch: any) => {
  const { data } = await axios.get('/api/authors')
  dispatch(authorsActions.setAuthors(data))
}

export const createAuthor = (author: FormData) => async (dispatch: any) => {
  const { data } = await axios.post("/api/authors/", author)
  await dispatch(authorsActions.addAuthor(data))
}

export const updateAuthorActivity = (id: string, isActive: null | boolean) => async (dispatch: any) => {
  await axios.patch(`/api/authors/activity/${id}`, { isActive })
  dispatch(authorsActions.updateAuthorActivity({ id, isActive }))
  dispatch(fetchBooks())
}
