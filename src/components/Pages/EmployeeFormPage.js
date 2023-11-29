import React from "react"
import Header from "../UI/Header/Header"
import EmployeeForm from "../Employee/EmployeeForm"
import Breadcrumb from "../UI/Breadcrumb/Breadcrumb";

function EmployeeFormPage() {
  return (
    <>
    <div className="wrapper">
      <Header />
      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <Breadcrumb />
            </div>
        </nav>
          <EmployeeForm />
        </div>
    </div> 
    </> 
  );
}

export default EmployeeFormPage;
