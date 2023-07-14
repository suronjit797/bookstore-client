/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { usePostLoginMutation } from "../../redux/features/user/userApi";
import Swal from "sweetalert2";

type TFormData = {
  email: string;
  password: string;
};

type TResponse = {
  data: {
    accessToken: string;
  };
  message: string;
  statusCode: number | string;
  success: boolean;
};

const initialState = {
  email: "",
  password: "",
};

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TFormData>(initialState);
  const [loginPost, result] = usePostLoginMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    const res = await loginPost(formData);
    if ("data" in res) {
      const { data, message } = res.data as TResponse;

      Toast.fire({
        icon: "success",
        title: message,
      });

      localStorage.setItem("token", data.accessToken);
      navigate("/");
    }
  };

  return (
    <div className="user_form">
      <div className="container py-4 m-auto">
        <div className="user_form-body">
          <h4 className="fw-bold text-center mb-3">
            Books<span className="text_bg-primary pe-1 ">Bazar</span>
          </h4>

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <label htmlFor="name" className="text-capitalize mb-2">
                email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                onChange={changeHandler}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <label htmlFor="name" className="text-capitalize mb-2">
                password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={changeHandler}
                required
              />
            </Form.Group>

            <button className="btn" type="submit">
              Login
            </button>
          </Form>
          <div className="mt-4">
            Don;t have an account? <Link to="/signup"> Register now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
