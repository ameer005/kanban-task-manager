import api from "../../../api/api";

const fetchAllBoards = async () => {
  const { data } = await api.get("/boards");

  return data;
};

const createNewBoard = async (payload) => {
  const { data } = await api.post("/boards", payload);

  return data;
};

const baordService = {
  fetchAllBoards,
  createNewBoard,
};

export default baordService;
