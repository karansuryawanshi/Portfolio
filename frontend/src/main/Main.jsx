import React from "react";
import {
  About,
  Footer,
  Header,
  Skills,
  Testimonial,
  Work,
  Certification,
} from "../containers";
import { Navbar } from "../Components";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Header></Header>
      <About></About>
      <Work></Work>
      <Skills></Skills>
      {/* <Testimonial></Testimonial> */}
      <Certification></Certification>
      <Footer></Footer>
    </div>
  );
};

export default Main;
