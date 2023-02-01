const mongoose = require("mongoose");
const mongo_uri = process.env.MONGO_URI;

// database connection
mongoose
  .connect(mongo_uri, { useNewUrlParser: true })
  .then((result) =>
    console.log("✅ Database connection has been established successfully.")
  )
  .catch((err) => console.error("Unable to connect to the database:", err));
