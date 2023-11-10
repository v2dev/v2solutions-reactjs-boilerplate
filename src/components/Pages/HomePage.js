import React from "react"
import Header from "../UI/Header/Header"
import Breadcrumb from "../UI/Breadcrumb/Breadcrumb";

function HomePage() {
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
            
            </div>
        </div> 
        </>
  );
}

export default HomePage;
