import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

export const LibraryServices = () => {
  const { authState } = useOktaAuth();

  return (
    <div className="container my-5 service pb-5">
      <div className="row -p4 align-items-center border shadow-lg radius">
        <div className="col-lg-7 p-3">
          <h1 className="display-4 fw-bold">
            Can't find what you are looking for?
          </h1>
          <p className="lead">
            If you cannot found what you are looking for, send our library
            admin's a personal message!
          </p>
          <div className="d-grap gap-2 justify-content-md-start mb-4 mb-lg-3">
            {authState?.isAuthenticated ? (
              <Link
                type="button"
                className="btn  btn-secondary color btn-lg px-4 me-md-2 fw-bold text-white color buttonn"
                to="/messages"
              >
                Library services
              </Link>
            ) : (
              <Link
                className="btn  btn-secondary color btn-lg text-white color buttonn"
                to="/login"
              >
                Sign up
              </Link>
            )}
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
      </div>
    </div>
  );
};
