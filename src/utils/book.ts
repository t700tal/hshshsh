import { toast } from "react-toastify"

import { Book, PreBook, Rating } from "../types/book"

export const calcAvgBookRating = (ratings: Rating[]): number => {
  const avgRating = (ratings.reduce((acc, { rating }) => acc + rating.grade, 0) / ratings.length) || 0
  return parseFloat(avgRating.toFixed(1))
}

export const getBookCategories = () => [{
  label: "Comedy",
  value: "Comedy",
}, {
  label: "Drama",
  value: "Drama",
}, {
  label: "Fantasy",
  value: "Fantasy",
}, {
  label: "Horror",
  value: "Horror",
}, {
  label: "Mystery",
  value: "Mystery",
}, {
  label: "Romance",
  value: "Romance",
}
]

export const validateBookFields = (values: PreBook) => {
  let isError = false
  if (!values.title || values?.categories?.length < 1 || !values.authorId || !values.description || !values.price || !values?.image?.name) {
    toast.error("Please fill all the fields")
    return false
  }
  if (values.title.length < 2) {
    toast.error("Title must be at least 2 characters long")
    isError = true
  }
  if (values.categories.length < 1) {
    toast.error("Select a category")
    isError = true
  }
  if (values.description.length < 2) {
    toast.error("description must be at least 2 characters long")
    isError = true
  }
  if (typeof values.price !== "number" || values.price < 11 || values.price > 99) {
    toast.error("Enter valid price, between 10 and 100")
    isError = true
  }

  if (!/\.(jpg|jpeg|png|svg)$/.test(values?.image.name)) {
    toast.error("Invalid image")
    isError = true
  }

  return !isError
}

export const filterBooks = (books: Book[], sortKey: string, searchKey: string) => {
  return [...books]
    ?.sort((book1: Book, book2: Book) => {
      return sortKey === "date"
        ? new Date(book2.created_at._seconds).getTime() -
        new Date(book1.created_at._seconds).getTime()
        : calcAvgBookRating(book2.ratings) - calcAvgBookRating(book1.ratings)
    })
    ?.filter((book: Book) =>
      book.title.toLowerCase().includes(searchKey.toLowerCase())
    )
}
