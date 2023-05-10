export interface PreAuthor {
  picture: File
  name: string
  country: string
  age: number | string
}

export interface Author {
  id: string
  isActive: boolean
  age: number
  picture: string
  name: string
  country: string
  updated_at: string
  created_at: {
    _seconds: string
  }
}

export interface AuthorState {
  data: Author[]
  searchKey: string
}
