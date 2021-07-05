const express = require("express");
let router = express.Router();

let itemsArray = [
  {
    name: "Nike shoes",
    brand: "Nike",
    price: 900,
    addedToCart: false,
    img: "/static/images/shoe_wood_bg.jpg",
    id: "qw",
    category: ["fashion", "shoes"],
  },
  {
    name: "shoe",
    brand: "Adidas",
    price: 900,
    addedToCart: false,
    img: "/static/images/shoe_trans_bg.png",
    id: "er",
    category: ["shoes"],
  },
  {
    name: "shoe",
    brand: "Nike",
    price: 900,
    addedToCart: false,
    img: "/static/images/shoe_trans_bg.png",
    id: "ty",
    category: ["shoes"],
  },
  {
    name: "Gucci shoes",
    brand: "Gucci",
    price: 900,
    addedToCart: false,
    img: "/static/images/shoe_wood_bg.jpg",
    id: "ui",
    category: ["shoes"],
  },
  {
    name: "shoe",
    brand: "Nike",
    price: 900,
    addedToCart: false,
    img: "/static/images/shoe_wood_bg.jpg",
    id: "op",
    category: ["shoes"],
  },
  {
    name: "shoe",
    brand: "Nike",
    price: 900,
    addedToCart: false,
    img: "/static/images/shoe_trans_bg.png",
    id: "as",
    category: ["shoes"],
  },
];

router.route("/").get((req, res) => {
  console.log("request to / executed");
  res.send(itemsArray);
});

router.route("/:id").get((req, res) => {
  let itemId = req.params.id;
  let item = itemsArray.find((element) => element.id === itemId);
  res.json(item);
});

router.route("/categories/:category").get((req, res) => {
  let quantity = req.query.qty;
  console.log(quantity);
  let itemsInCategory = itemsArray.filter((element) =>
    element.category.includes(req.params.category.toLowerCase())
  );
  if (quantity) {
    res.json({
      items: itemsInCategory.slice(0, quantity),
    });
  } else {
    res.json({
      items: itemsInCategory,
    });
  }
});

module.exports = router;
