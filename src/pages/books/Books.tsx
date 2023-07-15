/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, FormEvent } from "react";
import Loading from "../../components/Loading/Loading";
import BookCard from "../../components/bookCard/BookCard";
import { IBook } from "../../interface/bookInterface";
import Layout from "../../layouts/Layout";
import { useGetBooksQuery } from "../../redux/features/books/bookApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsSearch } from "react-icons/bs";
import "./book.css";
import BookSideBar from "../../components/bookSideBar/BookSideBar";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useGetBooksQuery(
    // queryOption
    `${genreFilter ? "genre=" + genreFilter + "&" : ""}${
      yearFilter ? "publicationDate=" + yearFilter + "&" : ""
    }query=${searchTerm} 
    `
  );

  const books: IBook[] = data?.data as IBook[];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
  }

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(search);
  };

  return (
    <Layout>
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center mt-4">
          <h4 className="mb-0"> BookLists </h4>
          <form className="d-flex" onSubmit={searchHandler}>
            <input
              type="search"
              name="search"
              id="search"
              className="form-control rounded-0"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary rounded-0" type="submit">
              <BsSearch />
            </button>
          </form>
        </div>
        <hr className="mb-0" />
        <Row>
          <Col lg={2} md={3}>
            <div className="book_sidebar">
              <BookSideBar
                setGenreFilter={setGenreFilter}
                setYearFilter={setYearFilter}
              />
            </div>
          </Col>
          <Col lg={10} md={9}>
            <Row xs={1} sm={2} md={2} lg={3} className="my-3 g-4">
              {books.length > 0 &&
                books.map((book) => (
                  <Col key={book._id}>
                    <BookCard book={book} />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Books;
