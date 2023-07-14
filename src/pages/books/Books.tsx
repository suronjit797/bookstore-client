/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Loading from "../../components/Loading/Loading";
import BookCard from "../../components/bookCard/BookCard";
import { IBook } from "../../interface/bookInterface";
import Layout from "../../layouts/Layout";
import { useGetBooksQuery } from "../../redux/features/books/bookApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Books = () => {
  const { data, isLoading, error } = useGetBooksQuery("");

  const books: IBook[] = data?.data as IBook[];

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} className='my-3'>
          {books.length > 0 &&
            books.map((book) => (
              <Col key={book._id}>
                <BookCard book={book} />
              </Col>
            ))}
        </Row>
      </Container>
    </Layout>
  );
};

export default Books;
