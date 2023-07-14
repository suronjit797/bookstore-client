import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/Home";
import Books from "./pages/books/Books";
import Book from "./pages/book/Book";
import NotFound from "./pages/notFound/NotFound";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/book/:bookId",
    element: <Book />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default App;
