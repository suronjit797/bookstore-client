import { useState, useEffect } from "react";
import { IBook } from "../../interface/bookInterface";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
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
            src="images/bookCover.webp"
            style={{ height: "300px", position: "relative" }}
          />
        </div>
        <div
          className="wishLIst fs-4"
          onClick={wishListHandler}
        >
          {wishList ? <AiFillHeart /> : <AiOutlineHeart />}
        </div>
        <Link
          to={`/book/${book?._id ? book?._id : ""}`}
          className="text-black text-capitalize"
        >
          <Card.Body>
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
      </Card>
    </>
  );
};

export default BookCard;
