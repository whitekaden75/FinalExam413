
import { Link, NavLink } from "react-router-dom";

const HeaderNavbar = () => {
  return (
    <nav className="navbar navbar-expand bg-dark navbar-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold" to="/">
          Final Exam
        </Link>

        <ul className="navbar-nav ms-auto d-flex flex-row gap-3 mb-0">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/entertainers"
              className={({ isActive }) =>
                `nav-link${isActive ? " active" : ""}`
              }>
              Entertainers
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HeaderNavbar;
