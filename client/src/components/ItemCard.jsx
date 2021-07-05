import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

// Material Core
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";



const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
  },
  actions: {
    justifyContent: "center",
  },
  actionButton: {
    background: "orange",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default function ItemCard({ name, brand, price, img, addedToCart, id }) {
  const classes = useStyles();

  return (
    <Grid item xs={6} sm={4} lg={2} md={3} xl={2}>
      <Card className={classes.root}>
        <CardActionArea component={Link} to={`/items/${id}`}>
          <CardMedia
            component="img"
            alt={name}
            height="150"
            image={img}
            title={name}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {brand}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              {name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              ${price}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions className={classes.actions}>
          
            
        </CardActions> */}
      </Card>
    </Grid>
  );
}
