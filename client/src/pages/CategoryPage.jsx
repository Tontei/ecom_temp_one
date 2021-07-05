import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Backdrop from "../components/Backdrop";
import Grid from "@material-ui/core/Grid";
import { makeStyles, AppBar, Toolbar } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Drawer from "../components/Drawer";

export default function CategoryPage() {
  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const history = useHistory();

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
    setLoading(true);
    fetch(`http://localhost:9000/items/categories/${params.categoryName}`).then(
      (res) => res.json().then((data) => setItemsData(data.items))
    );
    setLoading(false);
  }, []);

  return (
    <Container>
      {winWidth < 800 && <Drawer />}
      <Toolbar>
        <ArrowBackIcon onClick={() => history.goBack()} />
      </Toolbar>
      <Typography variant="h4">{params.categoryName}</Typography>
      {itemsData.length < 1 ? (
        <Backdrop />
      ) : (
        <Grid container spacing={2}>
          {itemsData.map((element, index) => {
            return <ItemCard {...element} key={index} />;
          })}
        </Grid>
      )}
    </Container>
  );
}
