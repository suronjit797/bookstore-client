import { useParams } from "react-router";
import Layout from "../../layouts/Layout";
import { useGetSingleBooksQuery } from "../../redux/features/books/bookApi";
import Loading from "../../components/Loading/Loading";
import { Container } from "react-bootstrap";
import moment from "moment";
import Comments from "../../components/comments/Comments";
import { initBook } from "../../shared/constants";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const Book = () => {
  const { bookId } = useParams();

  const { data: user } = useAppSelector((state) => state.user);

  const { data: book, isLoading } = useGetSingleBooksQuery(bookId as string);

  if (!book?.success) {
    return;
  }

  return (
    <Layout>
      <Container>
        <div className="card mb-3 my-4">
          {isLoading && <Loading />}
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={book.data.image! || "/images/bookCover.webp"}
                className="img-fluid rounded-start w-100"
                alt="book cover"
                style={{ maxHeight: "400px" }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body text-capitalize d-flex justify-content-center h-100 flex-column">
                <h5 className="card-title">{book.data.title}</h5>
                <div>
                  <b> author: </b> {book.data.author}
                </div>
                <div>
                  <b> genre: </b> {book.data.genre}
                </div>
                <div>
                  <b> publication year: </b>
                  {moment(book?.data?.publicationDate).format("DD/MM/YYYY")}
                </div>

                {user._id === book?.data?.authorDetails._id ? (
                  <div className="mt-3">
                    <Link
                      to={`/update-book/${book?.data?._id as string}`}
                      className="text-capitalize btn btn-warning me-3"
                    >
                      edit
                    </Link>
                    <button className="text-capitalize btn btn-danger">
                      remove
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <Comments book={book.data ? book.data : initBook} />
      </Container>
    </Layout>
  );
};

export default Book;
