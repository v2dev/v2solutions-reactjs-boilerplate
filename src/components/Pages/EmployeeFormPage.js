import React from "react"
import Header from "../UI/Header/Header"
import Footer from "../UI/Footer/Footer"
import AddEmployee from "../Employee/AddEmployee"
function EmployeeFormPage() {
  return (
        <>
        <div>
          <Header />
          <main>
            <AddEmployee />
          </main>
          <Footer />
        </div> 
        </>
  );
}

export default EmployeeFormPage;
