/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Loading from "../../components/Loading/Loading";
import { IBook } from "../../interface/bookInterface";
import Layout from "../../layouts/Layout";
import { useGetBooksQuery } from "../../redux/features/books/bookApi";

const Books = () => {
  const { data, isLoading, error } = useGetBooksQuery("");

  const books: IBook[] = data.data as IBook[];

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    // <Layout>{data.length && data.map((book) => <h1> {book.name} </h1>)}</Layout>
    <Layout> data </Layout>
  );
};

export default Books;
