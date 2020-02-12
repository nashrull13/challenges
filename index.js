const express = require("express");
const Morgan = require("morgan");
const Mongoose = require("mongoose");

const port = 3002;
const address = "localhost";
const app = express();

require("./books.js")(app);

app.use(express.json());

Mongoose.connect("mongodb://localhost/express_mongoose", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

  .then(() => console.log("Now Connected to MongoDb"))
  .catch(err => console.error("Something went wrong", err));

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
