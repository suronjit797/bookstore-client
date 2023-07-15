import { useState, FormEvent, useEffect } from "react";
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
import Pagination from "react-bootstrap/Pagination";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(false);

  const limit = 9;

  const {
    data: book,
    isLoading,
    error,
    isFetching,
  } = useGetBooksQuery(
    `${genreFilter ? "genre=" + genreFilter + "&" : ""}${
      yearFilter ? "publicationDate=" + yearFilter + "&" : ""
    }query=${searchTerm}&limit=${limit}&page=${page}`
  );

  useEffect(() => {
    if (book?.success) {
      setBooks(book?.data);
      setTotal(Number(book?.meta?.total));
      setLoading(isLoading);
    }
  }, [book]);

  if (error) {
    console.log(error);
  }

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSearchTerm(search);
  };

  const items: JSX.Element[] = [];
  console.log(total / limit);
  for (let number = 1; number <= Math.ceil(total / limit); number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => {
          setLoading(true);
          setPage(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Layout>
      <Container fluid>
        {(loading || isFetching) && <Loading />}
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
                setPage={setPage}
              />
            </div>
          </Col>
          <Col lg={10} md={9}>
            <Row xs={1} sm={2} md={2} lg={3} className="mb-3 mt-1 g-4">
              {books.length > 0 &&
                books.map((book) => (
                  <Col key={book._id}>
                    <BookCard book={book} />
                  </Col>
                ))}
            </Row>

            <div className="my-4">
              {total > limit && <Pagination>{items}</Pagination>}
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Books;
