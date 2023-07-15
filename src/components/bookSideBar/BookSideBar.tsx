// import React from 'react';
import { Form } from "react-bootstrap";
import { bookEnum } from "../../shared/constants";
import { useGetYearsQuery } from "../../redux/features/books/bookApi";
import Loading from "../Loading/Loading";
import { useState, useEffect } from "react";

interface BookSideBarProps {
  setGenreFilter: (genre: string) => void;
  setYearFilter: (year: string) => void;
  setPage: (num: number) => void;
}

const BookSideBar: React.FC<BookSideBarProps> = ({
  setGenreFilter,
  setYearFilter,
  setPage,
}) => {
  const [yearList, setYearList] = useState<string[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const {
    data: book,
    error,
    isLoading,
    isFetching,
  } = useGetYearsQuery(`limit=${limit}`);

  console.log({ isLoading, isFetching });
  if (error) {
    console.log(error);
  }

  if (isLoading || isFetching) {
    <Loading />;
  }

  const genreList: string[] = bookEnum;

  useEffect(() => {
    if (book?.success) {
      setYearList(book.data);
    }
  }, [book]);

  return (
    <div className="py-3">
      <h5> Genre: </h5>
      <div className="ps-3">
        <Form.Check
          label="All Genres"
          name="genre"
          type="radio"
          id={`radio-genre-all`}
          onClick={() => {
            setGenreFilter("");
            setPage(1);
          }}
        />
        {genreList.map((genre) => (
          <Form.Check
            key={genre}
            label={genre}
            name="genre"
            type="radio"
            className="text-capitalize"
            id={`radio-${genre}`}
            onClick={() => {
              setGenreFilter(genre);
              setPage(1);
            }}
          />
        ))}
      </div>
      <h5 className="mt-4"> Year: </h5>
      <div className="ps-3">
        <Form.Check
          label="All Years"
          name="year"
          type="radio"
          id={`radio-year-all`}
          onClick={() => {
            setYearFilter("");
            setPage(1);
          }}
        />
        {yearList?.map((year) => (
          <Form.Check
            key={year}
            label={year}
            name="year"
            type="radio"
            id={`radio-${year}`}
            onClick={() => {
              setYearFilter(year);
              setPage(1);
            }}
          />
        ))}

        <div className="mt-3">
          {book?.success &&
          Number(book?.meta?.total) > Number(book?.meta?.limit) ? (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => setLimit(limit + 10)}
            >
              More Year...
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSideBar;
