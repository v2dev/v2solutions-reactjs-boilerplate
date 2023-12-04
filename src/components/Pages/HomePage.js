import React from "react"
import Header from "../UI/Header/Header"
import { useSelector } from 'react-redux';
import Footer from "../UI/Footer/Footer"

function HomePage() {
  const { loggedIn } = useSelector((state) => state.auth) || {};

  return (
        <>
        <div className="wrapper ">
          <Header />
          <div id="content">
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-8 mt-5">
                <div className="text-center home">
                  <h1 className="mb-4">Welcome to the Home Page</h1>
                  <hr />
                  {loggedIn ? (
                     <div  className="logged-in-message">
                      <h2>Logged in successfully</h2>
                    </div>
                  ): (
                    <div  className="not-logged-in-message">
                    <h2>Please login first</h2>
                  </div>
                  )}
                 
                  
                </div>
              </div>
            </div>
          </div>
          </div>  
        </div> 
        <Footer />
        </>
  );
}

export default HomePage;
