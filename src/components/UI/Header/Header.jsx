import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/authActions";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Header({ isAuthenticated, logoutUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser(dispatch);
    navigate("/");
  };

  return (
      <nav id="sidebar">
            <div className="sidebar-header">
                <img src="/images/v-2-logo.svg" alt="Logo" />
            </div>
            <ul className="list-unstyled components">
                <li className={` ${location.pathname === "/home" ? "active" : ""}`}>
                  <Link  to="/">Home</Link>
                </li>
                <li className={` ${location.pathname === "/employee" ? "active" : ""}`}>
                  <Link  to="/employee">Employee</Link>
                </li>
                {isAuthenticated ? (
                  <li >
                    <Link to="/"  onClick={handleLogout}>Logout</Link>
                  </li>
                ) : (
                  <li >
                    <Link to="/auth" >Login</Link>
                  </li>
              )}
          </ul>
      </nav>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.loggedIn,
});

export default connect(mapStateToProps, { logoutUser })(Header);
