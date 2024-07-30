import { Link } from "react-router-dom";

export const ExploreTopBooks = () => {
  return (
    <div className="p-5 mb-4 bg-dark header">
      <div className="container  text-white ">
        <div className="row justify-content-center align-items-center"> {/* Changed justify-content-end to justify-content-center */}
          <div className="col-md-8 text-center explore"> {/* Added text-center to center the content within the column */}
            <h1 className="display-5 mb-4 fw-bold flicker">Find your book</h1>
            <div>
              <Link
                type="button"
                className="btn btn-secondary btn-lg text-white color buttonn"
                to="/search"
              >
                Explore top books
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
