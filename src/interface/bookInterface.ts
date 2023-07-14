export type IBook = {
  _id?: string;
  title: string;
  author: IAuthor;
  genre: string;
  publicationDate: Date;
  reviews: IReview[];
};

export type IAuthor = {
  _id: string;
  name: string;
  email: string;
};

export type IReview = {
  user: string;
  comment: string;
};
