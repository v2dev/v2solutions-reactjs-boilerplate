import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/auth";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header({ isAuthenticated, logoutUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser(dispatch);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">EMP</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Employee</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/employee/add" ? "active" : ""}`} to="/employee/add">Add Employee</Link>
            </li>
          </ul>
          {isAuthenticated ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="btn btn-link" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.loggedIn,
});

export default connect(mapStateToProps, { logoutUser })(Header);
