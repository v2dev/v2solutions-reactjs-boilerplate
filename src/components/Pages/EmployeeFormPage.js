import React from "react"
import Header from "../UI/Header/Header"
import EmployeeForm from "../Employee/EmployeeForm"
import Footer from "../UI/Footer/Footer"

function EmployeeFormPage() {
  return (
    <>
    <div className="wrapper">
      <Header />
      <div id="content">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

              
            </div>
      </nav>
        <EmployeeForm />
      </div>
    </div>
    <Footer /> 
    </> 
  );
}

export default EmployeeFormPage;
