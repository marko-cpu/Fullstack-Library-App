import { Link, NavLink } from "react-router-dom";
import slika from "../../Images/navv.png";
import { useOktaAuth } from "@okta/okta-react";
import { SpinerLoading } from "../Utils/SpinnerLoading";

export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinerLoading />;
  }

  const handleLogout = async () => oktaAuth.signOut();

   //console.log(authState);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-color py-2">
      <div className="container-fluid">
        <NavLink className="navbar-brand mt-2 mt-lg-0" to="/home">
          <img src={slika} height="55" alt="MDB Logo" loading="lazy" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item h5">
              <NavLink className="nav-link btnn aa" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item h5">
              <NavLink className="nav-link btnn aa" to="/search">
                Search Books
              </NavLink>
            </li>
            {authState.isAuthenticated && (
              <li className="nav-item h5">
                <NavLink className="nav-link btnn aa" to="/shelf">
                  Shelf
                </NavLink>
              </li>
            )}
            {authState.isAuthenticated && (
              <li className="nav-item h5">
                <NavLink className="nav-link btnn aa" to="/fees">
                  Pay Fees
                </NavLink>
              </li>
            )}
            {authState.isAuthenticated &&
              authState.accessToken?.claims?.userType === "admin" && (
                <li className="nav-item h5">
                  <NavLink className="nav-link btnn aa" to="/admin">
                    Admin
                  </NavLink>
                </li>
              )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!authState.isAuthenticated ? (
              <li className="nav-item m-2">
                <Link
                  type="button"
                  className="btn btn-outline-light btn-lg"
                  to="/login"
                >
                  Sign in
                </Link>
              </li>
            ) : (
              <li>
                <button
                  className="btn btn-outline-light btn-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
