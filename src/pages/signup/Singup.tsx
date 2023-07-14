import { ChangeEvent, FormEvent } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";


const Signup = () => {
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name, e.target.value);
      };
    
      const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      };
    
      return (
        <div className="user_form">
          <div className="container py-4 m-auto">
            <div className="user_form-body">
              <h4 className="fw-bold text-center  mb-3">
                Books<span className="text_bg-primary pe-1">Bazar</span>
              </h4>
    
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <label htmlFor="name" className="text-capitalize mb-2">
                    full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full name"
                    onChange={changeHandler}
                    required
                  />
                </Form.Group>
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
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <label htmlFor="name" className="text-capitalize mb-2">
                    confirm password
                  </label>
                  <input
                    type="password"
                    id="cPassword"
                    name="cPassword"
                    placeholder="Confirm Password"
                    onChange={changeHandler}
                    required
                  />
                </Form.Group>
    
                <button className="btn" type="submit">
                  Register
                </button>
              </Form>
              <div className="mt-4">
                Already have an account? <Link to='/signin'>  Login now</Link>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default Signup;