const Product = require("../models/Product");
const dotenv = require("dotenv");
const products = require("../data/product");
const connectDatabase = require("../config/database");

//setting dotenev
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Product deleted successfully");
    await Product.insertMany(products);
    console.log("Product inserted successfully");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};
seedProducts();
