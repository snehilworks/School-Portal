const express = require("express");
const { authenticateJwt, SECRET } = require("../midd leware/auth");
const { User, Course, Admin } = require("../db");
const router = express.Router();
const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET",
});

const order = await razorpay.orders.create({
  amount: 1000, // Amount in paise (example: 1000 paise = ₹10)
  currency: "INR",
  receipt: "order_receipt_12345", // Unique receipt identifier
});

app.post('/razorpay-webhook', async (req, res) => {
    const payment = req.body;
  
    // Verify the payment and update the order status in your database
    // Assuming you have the user's ID associated with the payment
    const userId = payment.user_id; // Adjust this based on how you associate payments with users
    const paymentStatus = payment.status;
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: { paymentStatus } },
        { new: true } // To get the updated user document
      );
  
      // Redirect the user back to your website
      res.redirect('https://www.yourwebsite.com/thank-you');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating payment status');
    }
  });
  

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  console.log(course);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/purchasedCourses", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

module.exports = router;

//student/courses
