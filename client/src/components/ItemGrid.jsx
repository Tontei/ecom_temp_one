import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import ItemCard from "./ItemCard";
import Typography from "@material-ui/core/Typography";
import Backdrop from "./Backdrop";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1rem 0 0",
  },
  categoryHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export default function ItemGrid({ categoryName }) {
  const classes = useStyles();
  const [itemsData, setItemsData] = useState([]);
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);

  const tester = {
    name: "shoe",
    brand: "Nike",
    price: 900,
    addedToCart: false,
    img: "/static/images/shoe_trans_bg.png",
  };

  useEffect(() => {
    setLoading(true);
    if (winWidth > 700) {
      fetch(
        `http://localhost:9000/items/categories/${categoryName}?qty=6`
      ).then((res) => res.json().then((data) => setItemsData(data.items)));
    }
    if (winWidth < 700) {
      fetch(
        `http://localhost:9000/items/categories/${categoryName}?qty=4`
      ).then((res) => res.json().then((data) => setItemsData(data.items)));
    }

    setLoading(false);
  }, []);

 

  return (
    <div className={classes.root}>
      <div className={classes.categoryHeader}>
        <Typography gutterBottom variant="h5">
          {categoryName}
        </Typography>
        <Link to={`/categories/${categoryName}`}>See all</Link>
      </div>
      {loading && <Backdrop />}
      <Grid container spacing={2}>
        {itemsData.map((element, index) => {
          return <ItemCard {...element} key={index} />;
        })}
      </Grid>
    
    </div>
  );
}
