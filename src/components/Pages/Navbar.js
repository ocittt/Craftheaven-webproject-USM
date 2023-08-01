import logo from "../../assets/logo/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { BiUserCircle, BiShoppingBag } from "react-icons/bi";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const Navbar = () => {
  const auth = getAuth();
  const history = useHistory();
  const logout = () => {
    signOut(auth)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand pe-4" to="/custDash">
            <img src={logo} alt="Logo" width={43} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/search"
                >
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="#">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="#">
                  Help
                </Link>
              </li>
            </ul>
            <div className="ms-auto">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active cartnavlink" to="#">
                    <BiShoppingBag />
                  </Link>
                </li>
                <div className="ms-auto">
                  <div className="dropstart">
                    <ul className="navbar-nav">
                      <li className="nav-item dropdown">
                        <Link
                          className="nav-link active cartnavlink"
                          to="#"
                          id="navbarDropdownMenuLink"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <BiUserCircle />
                        </Link>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdownMenuLink"
                        >
                          <li>
                            <Link className="dropdown-item" onClick={logout}>
                              Log Out
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
