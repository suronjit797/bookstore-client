import { useParams } from "react-router";
import Layout from "../../layouts/Layout";

const Book = () => {
  const { bookId } = useParams();

  console.log({ bookId });

  return <Layout>book</Layout>;
};

export default Book;
