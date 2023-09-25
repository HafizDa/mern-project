const path = require("path");
const dotenv = require("dotenv").config();
const express = require("express");
const colors = require("colors");
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

//Connect to DB
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

//Routes

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

//Serve frontend

if (process.env.NODE_ENV === "production") {
  //Set build folder as static static

  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
