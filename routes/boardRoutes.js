const express = require("express");
const boardController = require("../controllers/bordController");
const authenticateUser = require("../middleware/auth");

const router = express.Router();

router.use(authenticateUser);

router
  .route("/")
  .get(boardController.getAllBoard)
  .post(boardController.createBoard);

module.exports = router;
