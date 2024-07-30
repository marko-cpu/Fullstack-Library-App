import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SearchBook } from "./components/SearchBook";
import { SpinerLoading } from "../Utils/SpinnerLoading";
import { Pagination } from "../Utils/Pagination";

export const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] = useState("Book category");

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = `https://localhost:8443/api/books`;

      let url: string = "";

      if (searchUrl === "") {
        url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
      } else {
        let searchWithPage = searchUrl.replace(
          "<pageNumber>",
          `${currentPage - 1}`
        );
        url = baseUrl + searchWithPage;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Somthing went wrong!");
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.books;

      setTotalAmountOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedBooks: BookModel[] = [];

      for (const key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }

      setBooks(loadedBooks);
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  if (isLoading) {
    return (
      <div className="container m-5">
        <SpinerLoading />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const searchHandleChange = () => {
    setCurrentPage(1);

    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`
      );
    }
    setCategorySelection("Book category");
  };

  const categoryField = (value: string) => {
    setCurrentPage(1);
    if (
      value.toLocaleLowerCase() === "fe" ||
      value.toLocaleLowerCase() === "be" ||
      value.toLocaleLowerCase() === "data" ||
      value.toLocaleLowerCase() === "devops" ||
      value.toLocaleLowerCase() === "unix" ||
      value.toLocaleLowerCase() === "hardware" ||
      value.toLocaleLowerCase() === "db" ||
      value.toLocaleLowerCase() === "rp" ||
      value.toLocaleLowerCase() === "ml"  ||
      value.toLocaleLowerCase() === "ps" || 
      value.toLocaleLowerCase() === "nw" ||
      value.toLocaleLowerCase() === "wp"

    ) {
      setCategorySelection(value);
      setSearchUrl(
        `/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`
      );
    } else {
      setCategorySelection("All");
      setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`);
    }
  };

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFristBook: number = indexOfLastBook - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div className="row mt-5 d-flex justify-content-end">
          <div className="col-6 ">
            <div className="d-flex">
              <input
                className="form-control me-2 search"
                type="search"
                placeholder="Search"
                aria-labelledby="Search"
                onChange={(e) => setSearch(e.target.value)}
              ></input>
              <button
                className="btn btn-outline-success searchb"
                style={{marginLeft:15}}
                onClick={() => searchHandleChange()}
              >
                Search
              </button>
            </div>
          </div>
          <div className="col-4">
            <div className="dropdown">
              <button
                className="btn btn-secondary  drop"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {categorySelection}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li onClick={() => categoryField("All")}>
                  <a className="dropdown-item" href="#">
                    All
                  </a>
                </li>
                <li onClick={() => categoryField("FE")}>
                  <a className="dropdown-item" href="#">
                    Front End
                  </a>
                </li>
                <li onClick={() => categoryField("BE")}>
                  <a className="dropdown-item" href="#">
                    Back End
                  </a>
                </li>
                <li onClick={() => categoryField("WP")}>
                  <a className="dropdown-item" href="#">
                    Wordpress
                  </a>
                </li>
                <li onClick={() => categoryField("Data")}>
                  <a className="dropdown-item" href="#">
                    Data
                  </a>
                </li>
                <li onClick={() => categoryField("ML")}>
                  <a className="dropdown-item" href="#">
                    Machine Learning
                  </a>
                </li>
                <li onClick={() => categoryField("DevOps")}>
                  <a className="dropdown-item" href="#">
                    DevOps
                  </a>
                </li>
                 <li onClick={() => categoryField("Unix")}>
                  <a className="dropdown-item" href="#">
                    Unix/Linux
                  </a>
                </li>
                <li onClick={() => categoryField("PS")}>
                  <a className="dropdown-item" href="#">
                  Protection and security
                  </a>
                </li>
                <li onClick={() => categoryField("Hardware")}>
                  <a className="dropdown-item" href="#">
                    Hardware
                  </a>
                </li>
                <li onClick={() => categoryField("DB")}>
                  <a className="dropdown-item" href="#">
                    Data base
                  </a>
                </li>
                <li onClick={() => categoryField("RP")}>
                  <a className="dropdown-item" href="#">
                   Raspberry Pi
                  </a>
                </li>
                <li onClick={() => categoryField("NW")}>
                  <a className="dropdown-item" href="#">
                  Networks
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {totalAmountOfBooks > 0 ? (
          <>
            <div className="mt-3">
              <h5>Number of results: {totalAmountOfBooks}</h5>
            </div>
            <p>
              {indexOfFristBook + 1} to {lastItem} of {totalAmountOfBooks}{" "}
              items:
            </p>
            {books.map((book) => (
              <SearchBook book={book} key={book.id} />
            ))}
          </>
        ) : (
          <div className="m-5">
            <h3>Can't find what you are looking for?</h3>
            <a
              type="button"
              className="btn pag  btn-md px-4 me-md-2 fw-bold text-white"
              href="#"
            >
              Library Services
            </a>
          </div>
        )}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};
function setCurrentPage(pageNumber: any) {
  throw new Error("Function not implemented.");
}
