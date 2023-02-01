require("dotenv").config(); // it is for access the dotenv file
const bodyParser = require("body-parser"); //for handling the payload
const express = require("express");
const cors = require("cors"); //for backend and frontend connection


//routes
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/", userRoutes);

const port = process.env.PORT;
// const port = 9000;
app.listen(port, () => {
  console.log(`Serve is listening on port :  ${port}`);
});
