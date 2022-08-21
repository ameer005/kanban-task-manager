const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const connectDb = require("./db/connect");
const authRouter = require("./routes/authRoutes");

const app = express();
dotenv.config();

// Global Middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "yo this is working",
  });
});

// Routes
app.use("/api/v1/auth", authRouter);

// Global Error handeling
app.use((req, res) => {
  res.status(400).json({
    status: "fail",
    message: "Route does not exist",
  });
});
app.use(errorHandlerMiddleware);

// Server
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
