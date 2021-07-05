import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";
import SimpleMenu from "../components/SimpleMenu";
import Drawer from "../components/Drawer";
import { Typography } from "@material-ui/core";
import ItemCard from "../components/ItemCard";
import Container from "@material-ui/core/Container";
import ItemGrid from "../components/ItemGrid";

function Home() {
  // useEffect(() => {
  //   fetch('http://localhost:9000/testAPI').then(res => res.json()).then(data => setCount(data.message))
  // })

  const [winWidth, setWinWidth] = useState(window.innerWidth);

  // update the value of the viewport's height and width
  const updateDimensions = () => {
    setWinWidth(window.innerWidth);
  };

  // monitor changes in viewport's height and width
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Container>
      {winWidth < 800 && <Drawer />}

      <div className="App">
        <ItemGrid categoryName="shoes" />
      </div>
    </Container>
  );
}

export default Home;
