/* eslint-disable @typescript-eslint/no-misused-promises */
import { FormEvent, useState, useEffect } from "react";
import { Form } from "react-router-dom";
import { IBook, IReview } from "../../interface/bookInterface";
import { useUpdateBooksMutation } from "../../redux/features/books/bookApi";

const Comments = ({ book }: { book: IBook }) => {
  const [reviewList, setReviewList] = useState<IReview[]>([]);
  const [comment, setComment] = useState("");

  const [updateReviewList] = useUpdateBooksMutation();

  useEffect(() => {
    setReviewList(book.reviews);
  }, [book]);

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const updatedBook:IBook = {
      ...book,
      reviews: [...book.reviews, { comment, user: book.author }],
    };
    await updateReviewList({ id: book._id as string, data: updatedBook });
  };
  return (
    <div className="my-3">
      <Form className="d-flex" onSubmit={submitHandler}>
        <input
          type="text"
          onChange={(e) => setComment(e.target.value)}
          className="form-control rounded-0"
        />
        <button className="btn btn-success text-nowrap rounded-0" type="submit">
          Send Review
        </button>
      </Form>

      {reviewList.map((review) => (
        <div>{review.comment}</div>
      ))}
    </div>
  );
};

export default Comments;
