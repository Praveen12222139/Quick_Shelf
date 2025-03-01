// const 3rd part imports
const express = require("express");
const cors = require("cors");
const app = express();
// require("dotenv").config();
require("dotenv").config({ path: "./.env" });

// core imports

// my imports
const connectToDb = require("./utilities/conncetionDb");

const PORT = process.env.PORT || 5000;
// importing routers
const bookRouter = require("./routers/BooksRoute");
const userRouter = require("./routers/UserRoute");
const fileRouter = require("./routers/fileRoute");
const commetRouter = require("./routers/CommentRoute");

const dbpath = process.env.MYDATABASE.replace(
  "<db_password>",
  process.env.MYPASSWORD
);

connectToDb(dbpath);
// adding the body parser to read the body in put request

app.use(express.json()); //added to the middleware

// adding the cors
app.use(cors());

////////////////////////////////// routers///////////////////////////////
//---------------------------- book route------------------------------
app.use("/api/v1/book", bookRouter);
//---------------------------- user route------------------------------
app.use("/api/v1/user", userRouter);
//------------------------ file convert route--------------------------------
app.use("/api/v1/file", fileRouter); // this is temp we should put it right there mate
//------------------------ comment  route--------------------------------
app.use("/api/v1/comment", commetRouter); // this is temp we should put it right there mate

app.all("*", async (req, res) => {
  res.status(404).json({
    status: "error",
    message: `sorry we could not find anything related to ${req.originalUrl}`,
  });
});

// /////////////////////////global error handler/////////////////////////

app.use(async (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "fail",
    message: err.message || "something went wrong",
  });
});

/////////////////////////////////////////////////////////////////////////

app.listen(5000, () => {
  console.log(`we have started listening on the port ${PORT}`);
});
