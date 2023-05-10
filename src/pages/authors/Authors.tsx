import AuthorsTable from "../../components/authors-table/AuthorsTable"
import AuthorsFilterBar from "../../components/authors-filter-bar/AuthorsFilterBar"

import "./Authors.scss"

const Authors = () => {
  return (
    <div className='authors'>
      <AuthorsFilterBar />
      <AuthorsTable />
    </div>
  )
}

export default Authors
