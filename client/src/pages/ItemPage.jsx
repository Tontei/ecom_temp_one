import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Backdrop from "../components/Backdrop";
import Drawer from "../components/Drawer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import { CartContext } from "../contexts/cart-context";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  appbar: {
    top: "auto",
    bottom: 0,
  },
  addToCart: {
    width: "100%",
    background: "orange",
  },
}));

export default function ItemPage() {
  const params = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useContext(CartContext);
  const [added, setAdded] = useState(item.addedToCart);

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

  useEffect(() => {
    requestForItemObject();
  }, []);

  function requestForItemObject() {
    setLoading(true);
    fetch(`http://localhost:9000/items/${params.id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .then(setLoading(false));
  }

  function addToCart() {
    setAdded(true);
    item.addedToCart = true;
    setCartItems((prevValue) => {
      return [...prevValue, item];
    });
  }

  function removeFromCart() {
    setAdded(false);
    item.addedToCart = false;
    setCartItems((prevValue) => {
      let temp = prevValue.filter((element) => element.id != item.id);
      return temp;
    });
  }

  function cartContainsItem(item, cart) {
    let temp = cart.filter((element) => {
      return element.id === item.id;
    });
    if (temp.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Container>
      {winWidth < 800 && <Drawer />}
      <Toolbar>
        <ArrowBackIcon onClick={() => history.goBack()} />
      </Toolbar>

      {item ? (
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item md={6} sm={6}>
            <img src={item.img} alt={params.name} style={{ width: "100%" }} />
          </Grid>
          <Grid container item md={6} sm={6} spacing={1}>
            <Grid item md={12} sm={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "5rem",
                  justifyContent: "space-around",
                }}
              >
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Brand: {item.brand}</Typography>
              </div>

              <Typography variant="h4">${item.price}</Typography>
            </Grid>
            {winWidth > 700 && (
              <Grid item md={12} sm={12}>
                {cartContainsItem(cartItems, item) ? (
                  <Button
                    className={classes.addToCart}
                    onClick={removeFromCart}
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <AddShoppingCartIcon />
                    <Typography style={{ width: "90%" }}>
                      Remove from Cart
                    </Typography>
                  </Button>
                ) : (
                  <Button
                    className={classes.addToCart}
                    onClick={addToCart}
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <AddShoppingCartIcon />
                    <Typography style={{ width: "90%" }}>
                      Add to Cart
                    </Typography>
                  </Button>
                )}
              </Grid>
            )}
            <Grid item md={12} sm={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  {" "}
                  <Typography className={classes.heading}>
                    Description
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Backdrop />
      )}

      {winWidth < 700 && (
        <AppBar className={classes.appbar}>
          <Toolbar>
            {cartContainsItem(item, cartItems) ? (
              <Button
                className={classes.addToCart}
                onClick={removeFromCart}
                size="large"
                style={{ width: "100%" }}
              >
                <AddShoppingCartIcon />
                <Typography style={{ width: "90%" }}>
                  Remove from Cart
                </Typography>
              </Button>
            ) : (
              <Button
                className={classes.addToCart}
                onClick={addToCart}
                size="large"
                style={{ width: "100%" }}
              >
                <AddShoppingCartIcon />
                <Typography style={{ width: "90%" }}>Add to Cart</Typography>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      )}
    </Container>
  );
}
