import { toast } from "react-toastify"

import { PreAuthor } from "../types/author"

export const validateAuthorFields = (values: PreAuthor) => {
  let isError = false
  if (!values.name || !values.country || !values.age || !values.picture || !values?.picture?.name) {
    toast.error("Please fill all the fields")
    return false
  }
  if (values.name.length < 2) {
    toast.error("Name must be at least 2 characters long")
    isError = true
  }
  if (values.country.length < 2) {
    toast.error("Country must be at least 2 characters long")
    isError = true
  }
  if (typeof values.age !== "number" || values.age < 21 || values.age > 119) {
    toast.error("Enter valid age, between 20 and 120")
    isError = true
  }

  if (!/\.(jpg|jpeg|png|svg)$/.test(values?.picture.name)) {
    toast.error("Invalid picture")
    isError = true
  }

  return !isError
}
