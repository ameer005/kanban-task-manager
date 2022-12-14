const express = require("express");
const boardController = require("../controllers/boardController");
const authenticateUser = require("../middleware/auth");

const router = express.Router();

router.use(authenticateUser);

router
  .route("/")
  .get(boardController.getAllBoard)
  .post(boardController.createBoard);

router
  .route("/:id")
  .get(boardController.getBoard)
  .delete(boardController.deleteBoard)
  .patch(boardController.updateBoard);

router
  .route("/:id/task")
  .post(boardController.createTask)
  .put(boardController.deleteTask)
  .patch(boardController.updateTask);

router.route("/:id/task/delete").patch(boardController.deleteTask);

module.exports = router;
