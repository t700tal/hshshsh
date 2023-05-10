import { Routes, Route } from "react-router-dom"

import Books from "../../pages/books/Books"
import Authors from "../../pages/authors/Authors"
import CreateBook from "../../pages/create-book/CreateBook"
import CreateAuthor from "../../pages/create-author/CreateAuthor"
import NotFound from "../../pages/not-found/NotFound"

const Router = () => {
  return (
    <Routes>
      <Route path='/' Component={Books} />
      <Route path='/authors' Component={Authors} />
      <Route path='/create-a-book' Component={CreateBook} />
      <Route path='/create-an-author' Component={CreateAuthor} />
      <Route path='/*' Component={NotFound} />
    </Routes>
  )
}

export default Router
