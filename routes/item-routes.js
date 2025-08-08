const express = require("express");
const { asyncHandler, APIError } = require("../middleware/errorHandler.js");

const router = express.Router();

//duumy data
const items = [
  {
    id: 1,
    name: "Item 1",
  },
  {
    id: 2,
    name: "Item 2",
  },
  {
    id: 3,
    name: "Item 3",
  },
];

const item_controller = async (req, res) => {
  res.json(items);
};
router.get("/items", asyncHandler(item_controller));

router.post(
  "/items",
  asyncHandler(async (req, res) => {
    if (!req.body.name) {
      throw new APIError("Item name is required OK", 400);
    }
    const newItem = {
      id: items.length + 1,
      name: req.body.name,
    };
    items.push(newItem);
    res.status(201).json(newItem);
  })
);

module.exports = router;
