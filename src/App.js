import React from "react";
import Header from "./components/UI/Header/Header";
import Footer from "./components/UI/Footer/Footer";
import TodoApp from "./components/Todo/TodoApp";
const App = () => {
  return (
    <div>
      <Header />
      <main>
        <TodoApp />
      </main>
      <Footer />
    </div>
  );
};

 
export default App;