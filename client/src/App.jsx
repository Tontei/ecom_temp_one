import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";

// Pages
import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import CategoryPage from "./pages/CategoryPage";
import Cart from './pages/Cart'

// Contexts
import { CartProvider } from "./contexts/cart-context";

export default function App() {
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
    <CartProvider>
      <BrowserRouter>
        {winWidth > 800 && <Navbar />}
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/items/:id">
            <ItemPage />
          </Route>
          <Route path="/categories/:categoryName">
            <CategoryPage />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </BrowserRouter>
    </CartProvider>
  );
}
