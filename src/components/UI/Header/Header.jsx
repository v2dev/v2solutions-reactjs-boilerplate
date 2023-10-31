import React from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/auth"; // Assuming you have an action for logout
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Header({ isAuthenticated, logoutUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(dispatch); // Dispatch the logout action
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link to="/" className="navbar-brand">Todo App</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (<></>)}
          </ul>
      </div>
    </div>
  </nav>
  )
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.loggedIn,
});

export default connect(mapStateToProps, { logoutUser })(Header);

