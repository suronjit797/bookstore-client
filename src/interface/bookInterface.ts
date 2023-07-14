export type IBook = {
    title: string
    author: string
    genre: string
    publicationDate: Date
    reviews: IReview[]
  }

  export type IReview = {
    user: string
    comment: string
  }
  