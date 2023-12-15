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
        <EmployeeForm />
      </div>
    </div>
    <Footer /> 
    </> 
  );
}

export default EmployeeFormPage;
