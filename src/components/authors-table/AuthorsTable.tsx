import { useSelector } from "react-redux"

import { RootState } from "../../store"
import { Author } from "../../types/author"
import AuthorTableRow from "../author-table-row/AuthorTableRow"

import "./AuthorsTable.scss"

const AuthorsTable = () => {
  const { data, searchKey } = useSelector((state: RootState) => state.authors)

  const authors = [...data]
    ?.sort((author1: Author, author2: Author) => {
      return (
        new Date(author2.created_at._seconds).getTime() -
        new Date(author1.created_at._seconds).getTime()
      )
    })
    ?.filter((author: Author) =>
      author.name.toLowerCase().includes(searchKey.toLowerCase())
    )

  return (
    <div className='authors-table'>
      <table>
        <thead>
          <tr>
            <th>{/* Placeholder for the picture. */}</th>
            <th>Name</th>
            <th>Books</th>
            <th>State / Country</th>
            <th>Age</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author: Author) => (
            <AuthorTableRow key={author.id} {...author} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AuthorsTable
