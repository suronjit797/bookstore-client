// import React from 'react';
import { Form } from "react-bootstrap";

interface BookSideBarProps {
  setGenreFilter: (genre: string) => void;
  setYearFilter: (year: string) => void;
}

const BookSideBar: React.FC<BookSideBarProps> = ({
  setGenreFilter,
  setYearFilter,
}) => {
  const genreList: string[] = ["uponnash", "kobita", "textbook"];
  const yearList: string[] = ["2020", "2021", "2022"];

  return (
    <div className="py-3">
      <h5> Genre: </h5>
      <div className="ps-3">
        <Form.Check
          label="All"
          name="genre"
          type="radio"
          id={`radio-genre-all`}
          onClick={() => setGenreFilter("")}
        />
        {genreList.map((genre) => (
          <Form.Check
            key={genre}
            label={genre}
            name="genre"
            type="radio"
            id={`radio-${genre}`}
            onClick={() => setGenreFilter(genre)}
          />
        ))}
      </div>
      <h5> Year: </h5>
      <div className="ps-3">
        <Form.Check
          label="All"
          name="year"
          type="radio"
          id={`radio-year-all`}
          onClick={() => setYearFilter("")}
        />
        {yearList.map((year) => (
          <Form.Check
            key={year}
            label={year}
            name="year"
            type="radio"
            id={`radio-${year}`}
            onClick={() => setYearFilter(year)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookSideBar;
