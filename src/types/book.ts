import { Author } from "./author"

export interface Book {
    id: string
    title: string
    categories: string[]
    author: Author
    description: string
    image: string
    price: number
    ratings: Rating[]
    comments: Comment[]
    activity: boolean
    created_at: {
        _seconds: string
    }
    updated_at: {
        _seconds: string
    }
}

export interface PreBook {
    title: string
    categories: string[]
    authorId: string
    description: string
    image: File
    price: number | string
}

export interface Category {
    label: string
    value: string
}

export interface Comment {
    comment: {
        id: string
        text: string
        created_at: {
            _seconds: string
        }
    }
    commentRef: object
}

export interface Rating {
    rating: {
        grade: number
        created_at: {
            _seconds: string
        }
    }
    ratingRef: object
}

export interface BooksState {
    data: Book[]
    sortKey: string
    searchKey: string
}
