import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"

import MainLoading from "./components/main-loading/MainLoading"
import Header from "./components/header/Header"
import Router from "./components/router/Router"
import { fetchAuthors } from "./actions/authors"
import { fetchBooks } from "./actions/books"
import { initiateAxios } from "./utils/axios"
import { toastError } from "./utils/error"

import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch<any>()
  
  initiateAxios()

  useEffect(() => {
    // Fetch authors and books initally
    try {
      setIsLoading(true)
      dispatch(fetchAuthors())
      dispatch(fetchBooks())
    } catch (error) {
      toastError(error)
    }
    setIsLoading(false)
  }, [dispatch, isLoading])

  return (
    <>
      <Header />
      <ToastContainer />
      {isLoading ? 
        <MainLoading /> :
        <Router />
      }
    </>
  )
}

export default App
