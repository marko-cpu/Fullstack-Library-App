import { Link } from "react-router-dom";
import BookModel from "../../../models/BookModel";

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded bg">
      <div className="row g-0 ">
        <div className="col-md-2 ">
          <Link to={`/checkout/${props.book.id}`}>
          <div className="d-none d-lg-block">
            {props.book.img ? (
              <img
                className="line ds"
                src={props.book.img}
                width="153"
                height="246"
                alt="Book"
              ></img>
            ) : (
              <img
                src={require("../../../Images/BooksImages/book.jpg")}
                width="163"
                height="236"
                alt="Book"
              ></img>
            )}
          </div>
          </Link>
          <Link to={`/checkout/${props.book.id}`}>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            {props.book.img ? (
              <img
              className="line ds"
                src={props.book.img}
                width="153"
                height="246"
                alt="Book"
              ></img>
            ) : (
              <img
                src={require("../../../Images/BooksImages/book.jpg")}
                width="163"
                height="246"
                alt="Book"
              ></img>
            )}
          </div>
          </Link>
        </div>
       
        <div className="col-md-6">
          <div className="card-body d">
            <h5 className="card-title">{props.book.author}</h5>
            <h4>{props.book.title}</h4>
            <p className="card-text">{props.book.description}</p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <Link className="btn  btn-secondary color btn-md text-white buttonn" to={`/checkout/${props.book.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
