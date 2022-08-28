const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const connectDb = require("./db/connect");
const authRouter = require("./routes/authRoutes");
const boardRouter = require("./routes/boardRoutes");
const cors = require("cors");
const path = require("path");

const app = express();
dotenv.config();

// Global Middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/boards", boardRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client", "build", "index.html"));
  });
}

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
