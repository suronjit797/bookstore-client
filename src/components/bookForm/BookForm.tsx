/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { IErrorPayload } from "../../interface/authInterface";
import {
  usePostBooksMutation,
  useUpdateBooksMutation,
} from "../../redux/features/books/bookApi";
import { bookEnum } from "../../shared/constants";
import { IBook } from "../../interface/bookInterface";
import moment from "moment";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { TApiResponse, TResponse } from "../../interface/globalInterface";

type TProps = {
  mode: "edit" | "create";
  data?: IBook;
};

const initialState: IBook = {
  title: "",
  genre: "",
  author: "",
  publicationDate: new Date(),
  authorDetails: {
    _id: "",
    email: "",
    name: "",
  },
  reviews: [],
};

const BookForm = ({ mode, data }: TProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IBook>(initialState);
  const [createBook] = usePostBooksMutation();
  const [updateBook] = useUpdateBooksMutation();

  useEffect(() => {
    // console.log(mode, data)
    if (mode === "edit" && data) {
      setFormData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, data]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectHandler = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        publicationDate: new Date(formData.publicationDate),
      };
      let res:
        | {
            data: TApiResponse<IBook>;
          }
        | {
            error: FetchBaseQueryError | SerializedError;
          };
      if (mode === "create") {
        res = await createBook(data);
        setFormData(initialState);
        navigate("/books");
      } else if (data?._id) {
        const id = data?._id;
        res = await updateBook({ id, data });
        navigate(`/book/${id}`);
      }

      if (res! && "data" in res) {
        const { message } = res.data as TResponse<IBook>;

        await Toast.fire({
          icon: "success",
          title: message,
        });
      }
      if (res! && "error" in res) {
        const error = res.error as IErrorPayload;
        await Toast.fire({
          icon: "error",
          title: error.message || "Server error occurred",
        });
      }
    } catch (error) {
      await Toast.fire({
        icon: "error",
        title: "Server Error",
      });
    }
  };

  return (
    <div className="user_form py-4">
      <h1 className="text-center">
        {mode === "create" ? " Create a New Book" : "Update Book"}
      </h1>
      <div className="container py-2 m-auto">
        <div className="user_form-body py-4">
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <label htmlFor="title" className="text-capitalize mb-2">
                title
              </label>
              <input
                type="title"
                id="title"
                name="title"
                placeholder="title"
                onChange={changeHandler}
                required
                value={formData.title}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <label htmlFor="genre" className="text-capitalize mb-2">
                genre
              </label>
              <select
                className="form-select"
                name="genre"
                value={formData.genre}
                onChange={(e) => selectHandler("genre", e.target.value)}
              >
                <option selected>Select a genre</option>
                {bookEnum.map((book: string) => (
                  <option key={book} value={book}>
                    {book}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3">
              <label htmlFor="publicationDate" className="text-capitalize mb-2">
                publication Date
              </label>
              <input
                type="date"
                value={moment(formData.publicationDate).format("yyyy-MM-DD")}
                id="publicationDate"
                name="publicationDate"
                placeholder="publicationDate"
                onChange={changeHandler}
                required
              />
            </Form.Group>

            <button className="btn" type="submit">
              {mode === "edit" ? "Update book" : "Create new book"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
