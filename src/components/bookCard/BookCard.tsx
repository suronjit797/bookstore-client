// import React from 'react';
import { IBook } from "../../interface/bookInterface";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { AiOutlineHeart } from "react-icons/ai";
import "./bookCard.css";

const BookCard = ({ book }: { book: IBook }) => {
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
        <Card.Body>
          <Card.Title> {book.title} </Card.Title>
          <Card.Text>
            <div className="d-flex text-capitalize">
              <b className="me-2">Author: </b> <span> {book.author.name} </span>
            </div>
            <div className="d-flex text-capitalize">
              <b className="me-2">genre: </b> <span> {book.genre} </span>
            </div>
            <div className="d-flex text-capitalize">
              <b className="me-2">Publication: </b>{" "}
              <span> {moment(book.publicationDate).format("DD/MM/YYYY")} </span>
            </div>
            <div className="wishLIst fs-4">
              <AiOutlineHeart />
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default BookCard;
