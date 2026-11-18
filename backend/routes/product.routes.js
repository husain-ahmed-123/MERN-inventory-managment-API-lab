const Product = require("../models/Product");
const router = require("express").Router();
const { standardLimiter } = require("../middlewear/rateLimiter");

//create routes
router.post("/", async (req, res) => {
  try {
    const createdProduct = await Product.create(req.body);
    res.status(201).json(createdProduct);
  } catch (err) {
    console.log(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (err) {
    console.log(err);
  }
});
//get routes
router.get("/:ProductId", async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.ProductId);
    res.status(200).json(foundProduct);
  } catch (err) {
    console.log(err);
  }
});
//updtae routes
router.put("/:ProductId", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.ProductId,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log();
  }
});
//delete routes
router.delete("/:ProductId", async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.ProductId);
    if (!deleteProduct) {
    }
    res.status(404).json({ message: "Product was deleted successfuly" });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
