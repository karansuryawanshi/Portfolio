import React, { useState, useEffect } from "react";
import Preloader from "./containers/Preloader/Preloader";
import Main from "./main/Main";
import "./App.scss";
// import Lenis from "lenis";

const App = () => {
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMain(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // const lenis = new Lenis({
  //   autoRaf: true,
  // });

  // lenis.on("scroll", (e) => {
  //   console.log(e);
  // });

  return (
    <div className="app">
      <Main />
    </div>
  );
};

export default App;
