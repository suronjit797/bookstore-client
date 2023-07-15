/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { IErrorPayload } from "../../interface/authInterface";
import { usePostBooksMutation } from "../../redux/features/books/bookApi";
import { bookEnum } from "../../shared/constants";
import { IBook } from "../../interface/bookInterface";

type TResponse = {
  data: IBook;
  message: string;
  statusCode: number | string;
  success: boolean;
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

type TProps = {
  mode: "edit" | "create";
  data?: IBook;
};

const ProductForm = ({ mode, data }: TProps) => {
  const [formData, setFormData] = useState<IBook>(initialState);
  const [createBook] = usePostBooksMutation();

  useEffect(() => {
    if (mode === "edit" && data) {
      setFormData(data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

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

  const createBookFunction = async (): Promise<void> => {
    try {
      const data = {
        ...formData,
        publicationDate: new Date(formData.publicationDate),
      };
      const res = await createBook(data);
      if ("data" in res) {
        const { message } = res.data as TResponse;

        await Toast.fire({
          icon: "success",
          title: message,
        });
      }
      if ("error" in res) {
        const error = res.error as IErrorPayload;
        await Toast.fire({
          icon: "error",
          title: error.message || "Server error occurred",
        });
      }
      setFormData(initialState);
    } catch (error) {
      await Toast.fire({
        icon: "error",
        title: "Server Error",
      });
    }
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (mode === "create") {
      await createBookFunction();
    }
  };

  return (
    <div className="user_form py-4">
      <h1 className="text-center"> Create a New Book </h1>
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
                value={formData.publicationDate.toString()}
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

export default ProductForm;
