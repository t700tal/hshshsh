import { useState, ChangeEventHandler, FormEventHandler } from "react"
import { MultiSelect } from "react-multi-select-component"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { BsCardImage } from "react-icons/bs"
import { toast } from "react-toastify"

import { getBookCategories, validateBookFields } from "../../utils/book"
import { RootState } from "../../store"
import { Author } from "../../types/author"
import { createBook } from "../../actions/books"
import { Category } from "../../types/book"
import { toastError } from "../../utils/error"

import "./CreateBook.scss"

const CreateBook = () => {
  const dispatch = useDispatch<any>()
  const authors = useSelector((state: RootState) => state.authors.data).filter((a: Author) => a.isActive)
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState([])

  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    authorId: "",
    image: {} as File,
  })

  const isAllowedToCreateBook = authors.length === 0

  const allowedCategories = getBookCategories()

  const valuesChangeHandler: ChangeEventHandler<any> = (e) => {
    if (e.target.name === "image") {
      const files = e.target.files
      setValues((p) => ({ ...p, [e.target.name]: files?.item(0) }))
      return
    }
    if (e.target.name === "price") {
      const value = e.target.value
      const price = value ? parseInt(value) : ""
      setValues((p) => ({ ...p, [e.target.name]: price }))
      return
    }
    setValues((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const formattedCategories = categories.map((c: Category) => c.value)
    const selectedAuthorId = values.authorId || authors[0].id
    if (
      !validateBookFields({
        ...values,
        authorId: selectedAuthorId,
        categories: formattedCategories,
      })
    ) {
      return
    }
    const formData = new FormData()
    formData.append("title", values.title)
    formData.append("price", values.price)
    formData.append("authorId", selectedAuthorId)
    formData.append("description", values.description)
    formData.append("categories", formattedCategories.join(", "))
    formData.append("file", values.image)

    try {
      setIsLoading(true)
      await dispatch(createBook(formData))
      toast.success("Book created successfully")
      navigate("/")
    } catch (error) {
      toastError(error)
    }
    setIsLoading(false)
  }

  return (
    <div className='create-book'>
      <form onSubmit={submitHandler}>
        <div className='text'>
          <div className='title'>Create a new book</div>
          <span className='provide-data'>Provide all the data below</span>
        </div>
        <input
          onChange={valuesChangeHandler}
          name='title'
          placeholder='Title'
          type='text'
        />
        <textarea
          onChange={valuesChangeHandler}
          name='description'
          placeholder='Book description'
          value={values.description}
        />
        <div className='form-row'>
          <span className='categories-title'>Categories</span>
          <MultiSelect
            className='multi-select'
            options={allowedCategories}
            value={categories}
            onChange={setCategories}
            hasSelectAll={false}
            labelledBy='Categories / Genres'
          />
        </div>
        <div className='form-row'>
          Author:
          <select name='authorId' onChange={valuesChangeHandler}>
            {authors.map((author: Author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div className='form-row'>
          Price:
          <input
            onChange={valuesChangeHandler}
            value={values.price}
            placeholder='Price'
            type='range'
            min={11}
            max={99}
            name='price'
          />
          <input
            onChange={valuesChangeHandler}
            name='price'
            type='number'
            value={values.price}
          />
          $
        </div>
        <label className='image-label' htmlFor='bookImgInput'>
          <BsCardImage className='image-icon' />
          <span>
            {values?.image?.name ? values?.image?.name : "Choose file"}
          </span>
        </label>
        <input
          onChange={valuesChangeHandler}
          name='image'
          type='file'
          id='bookImgInput'
          accept='.jpg, .jpeg, .png, .svg'
        />
        {isAllowedToCreateBook && (
          <span className='warning'>No active authors</span>
        )}
        {isLoading ? (
          <img src='/loading.svg' alt='Orange loading spinner' />
        ) : (
          <button disabled={isAllowedToCreateBook} type='submit'>
            Submit
          </button>
        )}
      </form>
    </div>
  )
}

export default CreateBook
