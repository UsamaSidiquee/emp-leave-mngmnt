const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { checkUser, requireAuth } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

//connect to database
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// view engine
app.set("view engine", "ejs");

app.get("*", checkUser);

// ** blog Routes
app.use(authRoutes);
// ** keep auth routes above only else infinite redirects
app.use(userRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Lost Page" });
});
