import api from "../../../api/api";

const fetchAllBoards = async () => {
  const { data } = await api.get("/boards");

  return data;
};

const baordService = {
  fetchAllBoards,
};

export default baordService;
