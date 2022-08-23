import api from "../../../api/api";

// fetch all boards
const fetchAllBoards = async () => {
  const { data } = await api.get("/boards");

  return data;
};

// Create new board
const createNewBoard = async (payload) => {
  const { data } = await api.post("/boards", payload);

  return data;
};

// Delete Board
const deleteBoard = async (id) => {
  const { data } = await api.delete(`/boards/${id}`);

  return data;
};

const baordService = {
  fetchAllBoards,
  createNewBoard,
  deleteBoard,
};

export default baordService;
