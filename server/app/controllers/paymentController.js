const Razorpay = require("razorpay");
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorPayInstance = new Razorpay({
  key_id: RAZORPAY_ID_KEY,
  key_secret: RAZORPAY_SECRET_KEY,
});

export const renderProductPage = async (req, res) => {
  try {
    res.render("product");
  } catch (err) {
    console.log(err.message);
  }
};

export const createOrder = async (req, res) => {
  try {
    const amount = req.body.amount * 100; // 1500 -> 15 in the amount that's why we had to multiply 100
    const options = {
      amount: amount,
      currency: "INR",
      receipt: "razorUser@gmail.com",
    };

    razorPayInstance.orders.create(options, (err, order) => {
      if (!err) {
        res.status(200).send({
          success: true,
          msg: "Order created!",
          order_id: order.id,
          amount: amount,
          key_id: RAZORPAY_ID_KEY,
          product_name: req.body.name,
          description: req.body.description,
          contact: "3498322398",
          name: "John smith",
          email: "john@gmail.com",
        });
      } else {
        res.status(400).send({
          success: false,
          msg: "something went wrong!",
        });
      }
    });
  } catch (err) {
    console.error("error occurred");
  }
};
