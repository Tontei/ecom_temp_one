import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// contexts
import { CartContext } from "../contexts/cart-context";

// material ui core
import { Container, Toolbar, Typography } from "@material-ui/core";

// components
import CartItem from "../components/CartItem";

// material ui icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function Cart() {
  const history = useHistory();
  const [cartItems, setCartItems] = useContext(CartContext);

  return (
    <Container>
      <Toolbar>
        <ArrowBackIcon onClick={() => history.goBack()} />
      </Toolbar>
      {cartItems.map(element => <CartItem key={element.id} {...element}/>)}
    </Container>
  );
}
