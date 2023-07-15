import { useParams } from "react-router";
import Layout from "../../layouts/Layout";
import { useGetSingleBooksQuery } from "../../redux/features/books/bookApi";
import Loading from "../../components/Loading/Loading";
import { Container } from "react-bootstrap";
import moment from "moment";
import Comments from "../../components/comments/Comments";
import { initBook } from "../../shared/constants";


const Book = () => {
  const { bookId } = useParams();

  const { data: book, isLoading } = useGetSingleBooksQuery(bookId as string);

  return (
    <Layout>
      <Container>
        <div className="card mb-3 my-4">
          {isLoading && <Loading />}
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={
                  (book?.success && book.data.image) || "/images/bookCover.webp"
                }
                className="img-fluid rounded-start w-100"
                alt="book cover"
                style={{ maxHeight: "400px" }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body text-capitalize d-flex justify-content-center h-100 flex-column">
                <h5 className="card-title">
                  {book?.success && book.data.title}
                </h5>
                <div>
                  <b> author: </b> {book?.success && book.data.author}
                </div>
                <div>
                  <b> genre: </b> {book?.success && book.data.genre}
                </div>
                <div>
                  <b> publication year: </b>
                  {book?.success &&
                    moment(book?.data?.publicationDate).format("DD/MM/YYYY")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Comments book={book?.success && book.data ? book.data : initBook} />
      </Container>
    </Layout>
  );
};

export default Book;
