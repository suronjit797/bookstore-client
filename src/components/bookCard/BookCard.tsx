import { useState, useEffect } from "react";
import { IBook } from "../../interface/bookInterface";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsBookmarkXFill, BsBookmarkCheckFill } from "react-icons/bs";
import "./bookCard.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleWishlist } from "../../redux/features/wishList/wishListSlice";

const BookCard = ({ book }: { book: IBook }) => {
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state.wishlist);
  const [wishList, setWishList] = useState<boolean>(false);

  useEffect(() => {
    const isExist = books.find((b) => b._id === book._id);
    if (isExist) {
      setWishList(true);
    } else {
      setWishList(false);
    }
  }, [books, book._id]);

  const wishListHandler = () => {
    dispatch(toggleWishlist(book));
  };

  return (
    <>
      <Card className="w-100 bookCard">
        <div className="bookImage">
          <Card.Img
            variant="top"
            src={book.image || "images/bookCover.webp"}
            style={{ height: "300px", position: "relative" }}
          />
        </div>
        <Link
          to={`/book/${book?._id ? book?._id : ""}`}
          className="text-black text-capitalize"
        >
          <Card.Body className="pb-0">
            <Card.Title> {book.title} </Card.Title>
            <Card.Text>
              <div className="d-flex">
                <b className="me-2">Author: </b>
                <span> {book.author} </span>
              </div>
              <div className="d-flex">
                <b className="me-2">genre: </b> <span> {book.genre} </span>
              </div>
              <div className="d-flex">
                <b className="me-2">Publication: </b>
                <span>{moment(book.publicationDate).format("DD/MM/YYYY")}</span>
              </div>
            </Card.Text>
          </Card.Body>
        </Link>
        <div className="p-3 pt-0 d-flex justify-content-end">
          <div className="d-flex">
            <div
              className="wishLIst fs-2 me-2"
              title="Add to wish list"
              onClick={wishListHandler}
            >
              {wishList ? <AiFillHeart /> : <AiOutlineHeart />}
            </div>
            <div
              className="finishBook fs-2"
              title="Add to wish list"
              // onClick={wishListHandler}
            >
              {book?.isFinished ? (
                <BsBookmarkCheckFill className="text-success" />
              ) : (
                <BsBookmarkXFill className="text-danger" />
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default BookCard;
