const path = require("path");

const express = require("express");

const Product = require("../models/product.model");
const User = require("../models/user.model");

 const transporter = require("../configs/email");

const SendEmail = require("../utils/sendEmail");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const product = await Product.create(req.body);
   const user = await User.findById(product.user_id).lean().exec();

    SendEmail(
      "shubham@gmail.com.com",
      [user.email, "kamal@gmail.com"],
      `${user.first_name} Welcome to masai school`,
      "Product is created now",
      "<h1>Product done successfully</h1>",
      [{ filename: "name.html", path: path.join(__dirname, "../name.html") }]
    );


    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 5;
    let search = req.query.search;

    const skip = (page - 1) * size;

    let products, totalPages;
    if (!search) {
      products = await Product.find().skip(skip).limit(size).lean().exec();

      totalPages = Math.ceil((await Product.find().countDocuments()) / size);
    } else {
      products = await Product.find({ name: search })
        .skip(skip)
        .limit(size)
        .lean()
        .exec();
      totalPages = Math.ceil((await Product.find().countDocuments()) / size);
    }

    return res.status(200).send({ products, totalPages });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
