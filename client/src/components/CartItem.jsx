import React, { useEffect, useState, useContext } from "react";

// Material core
import {
  Card,
  CardMedia,
  makeStyles,
  useTheme,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@material-ui/core";

// Material icons
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  details: {
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: "40%",
  },
}));

export default function CartItem({ name, brand, price, img, addedToCart, id }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardMedia className={classes.image} image={img} title={name} />
        <CardContent>
          <Typography>{name}</Typography>
          <Typography>{brand}</Typography>
          <Typography>{price}</Typography>
        </CardContent>
      </div>
      <CardActions>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
