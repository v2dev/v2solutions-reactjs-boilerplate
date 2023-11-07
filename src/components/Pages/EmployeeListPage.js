import React from "react"
import Header from "../UI/Header/Header"
import Footer from "../UI/Footer/Footer"
import EmployeeList from "../Employee/EmployeeList"
function EmployeeListPage() {
  return (
        <>
        <div>
          <Header />
          <main>
            <EmployeeList />
          </main>
          <Footer />
        </div> 
        </>
  );
}

export default EmployeeListPage;
