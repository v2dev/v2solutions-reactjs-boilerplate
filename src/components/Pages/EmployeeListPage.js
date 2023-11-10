import React from "react";
import Header from "../UI/Header/Header";
import EmployeeList from "../Employee/EmployeeList";
import Breadcrumb from "../UI/Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";

function EmployeeListPage() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div id="content">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Breadcrumb />
              {/* Add Employee Button */}
              <div className="ml-auto">
                <Link  to="/employee/add" className="btn btn-primary">Add Employee</Link>
                
              </div>
            </div>
          </nav>
          
          <EmployeeList />
        </div>
      </div>
    </>
  );
}

export default EmployeeListPage;
