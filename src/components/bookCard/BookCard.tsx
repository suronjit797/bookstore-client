// import React from 'react';
import { IBook } from "../../interface/bookInterface";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import moment from "moment";

const BookCard = ({ book }: { book: IBook }) => {
  return (
    <>
      <Card className="w-100">
        <Card.Img
          variant="top"
          src="images/bookCover.webp"
          style={{ height: "300px" }}
        />
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
              <span>
                {" "}
                {moment(book.publicationDate).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}{" "}
              </span>
            </div>
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default BookCard;
