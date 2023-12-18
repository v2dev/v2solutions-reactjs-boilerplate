import React from "react"
import Header from "../UI/Header/Header"
import EmployeeForm from "../Employee/EmployeeForm"
import Footer from "../UI/Footer/Footer"

function EmployeeFormPage() {
  return (
    <>
    <div className="container">
      
      <Header />

      <div id="content"  className="content">
        <EmployeeForm />
      </div>
    </div>
    <Footer /> 
    </> 
  );
}

export default EmployeeFormPage;
