import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/authActions";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';

function Header({ isAuthenticated, logoutUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    logoutUser(dispatch);
    navigate("/");
  };

  return (
    <div className="header-container">
     
      <nav id="sidebar" className={isCollapsed ? "collapsed" : ""}>
        <div className="sidebar-header">
          <button className="collapse-btn" onClick={handleToggleCollapse}>
            {isCollapsed ? <FaBars /> : <FaBars />}
          </button>
          <img src="/images/v-2-logo.svg" alt="Logo" />
        </div>
        <ul className="list-unstyled components">
          <li className={` ${location.pathname === "/home" ? "active" : ""}`}>
            <Link to="/"><FaHome /> {!isCollapsed && "Home"}</Link>
          </li>
          <li className={` ${location.pathname === "/employee" ? "active" : ""}`}>
            <Link to="/employee"><FaUser /> {!isCollapsed && "Employee"}</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to="/" onClick={handleLogout}><FaSignOutAlt /> {!isCollapsed && "Logout"}</Link>
            </li>
          ) : (
            <li>
              <Link to="/auth"><FaSignInAlt /> {!isCollapsed && "Login"}</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.loggedIn,
});

export default connect(mapStateToProps, { logoutUser })(Header);
