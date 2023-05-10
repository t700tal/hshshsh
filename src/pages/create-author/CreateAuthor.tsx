import { ChangeEventHandler, FormEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BsCardImage } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

import { createAuthor } from "../../actions/authors"
import { validateAuthorFields } from "../../utils/author"
import { toastError } from "../../utils/error"

import "./CreateAuthor.scss"

const CreateAuthor = () => {
  const dispatch = useDispatch<any>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({
    name: "",
    country: "",
    age: "",
    picture: {} as File,
  })

  const valuesChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === "picture") {
      const files = e.target.files
      setValues((p) => ({ ...p, [e.target.name]: files?.item(0) }))
      return
    }
    if (e.target.name === "age") {
      const value = e.target.value
      const age = value ? parseInt(value) : ""
      setValues((p) => ({ ...p, [e.target.name]: age }))
      return
    }
    setValues((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (!validateAuthorFields(values)) return

    const formData = new FormData()

    formData.append("file", values.picture)
    formData.append("name", values.name)
    formData.append("country", values.country)
    formData.append("age", values.age)

    try {
      setIsLoading(true)
      await dispatch(createAuthor(formData))
      setIsLoading(false)
      toast.success("Author created successfully")
      navigate("/authors")
    } catch (error) {
      toastError(error)
    }
    setIsLoading(false)
  }

  return (
    <div className='create-author'>
      <form onSubmit={submitHandler}>
        <div className='text'>
          <div className='title'>Create a new author</div>
          <span className='provide-data'>Provide all the data below</span>
        </div>
        <input
          onChange={valuesChangeHandler}
          value={values.name}
          name='name'
          placeholder='Name'
          type='text'
        />
        <input
          onChange={valuesChangeHandler}
          value={values.country}
          name='country'
          placeholder='State / Country'
          type='text'
        />
        <input
          onChange={valuesChangeHandler}
          value={values.age}
          name='age'
          placeholder='Age'
          type='number'
        />
        <label htmlFor='authorImgInput'>
          <BsCardImage className='image-icon' />
          <span>
            {values?.picture?.name ? values?.picture?.name : "Choose file"}
          </span>
        </label>
        <input
          onChange={valuesChangeHandler}
          name='picture'
          type='file'
          id='authorImgInput'
          accept='.jpg, .jpeg, .png, .svg'
        />
        {isLoading ? (
          <img src='/loading.svg' alt='Orange loading spinner' />
        ) : (
          <button type='submit'>Submit</button>
        )}
      </form>
    </div>
  )
}

export default CreateAuthor
