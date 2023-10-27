import React from "react"
import Header from "../UI/Header/Header"
import Footer from "../UI/Footer/Footer"
import TodoApp from "../Todo/TodoApp"
function TodoPage() {
  return (
        <>
        <div>
          <Header />
          <main>
            <TodoApp />
          </main>
          <Footer />
        </div> 
        </>
  );
}

export default TodoPage;
