import React from "react";
import { About, Footer, Header, Skills, Testimonial, Work } from "./containers";
import { Navbar } from "./Components/index";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Navbar></Navbar>
      <Header></Header>
      <About></About>
      <Work></Work>
      <Skills></Skills>
      <Testimonial></Testimonial>
      <Footer></Footer>
    </div>
  );
};

export default App;
