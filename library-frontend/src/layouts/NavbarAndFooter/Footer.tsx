import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="nav-color mt-5">
      <footer className="container d-flex flex-wrap justify-content-between align-items-center py-5 nav-color ">
        <p className="col-md4 mb-0 text-white h5">Library FIN, University of Kragujevac</p>
        <ul className="nav navbar-dark col-md-4 justify-content-end">
          <li className="nav-item h5">
            <Link to="/" className="nav-link px-2 text-white">
              Home
            </Link>
          </li>
          <li className="nav-item h5">
            <Link to="/search" className="nav-link px-2 text-white">
              Search Books
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};
