import axios from "axios"
import { toast } from "react-toastify"

export const toastError = (error: any) => {
  if (axios.isAxiosError(error)) {
    toast.error(error?.response?.data.message)
  } else {
    toast.error("Something went wrong, try again later.")
  }
}
