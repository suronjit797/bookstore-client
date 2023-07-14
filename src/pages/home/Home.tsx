/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Layout from "../../layouts/Layout";
import Loading from "../../components/Loading/Loading";
import BookCard from "../../components/bookCard/BookCard";
import { IBook } from "../../interface/bookInterface";
import { useGetBooksQuery } from "../../redux/features/books/bookApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./home.css";

const Home = () => {
  const { data, isLoading, error } = useGetBooksQuery("limit=10");
  const books: IBook[] = data?.data as IBook[];

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
  }
  return (
    <Layout>
      <div className="banner"></div>

      <div className="my-4">
        <h2 className="text-center heading">
          <span> Recent Added </span>
        </h2>
      </div>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} className="my-3 g-4">
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

export default Home;
