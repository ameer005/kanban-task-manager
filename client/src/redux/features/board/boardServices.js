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

// Update Board
const updateBoard = async (payload) => {
  const { data } = await api.patch(`/boards/${payload.id}`, payload.data);

  return data;
};

// Create task
const createTask = async (payload) => {
  const { data } = await api.post(`/boards/${payload.id}/task`, payload.data);

  return data;
};

// delete task
const deleteTask = async (payload) => {
  console.log(payload.data);
  const { data } = await api.put(`/boards/${payload.id}/task`, payload.data);

  return data;
};

// update task
const updateTask = async (payload) => {
  const { data } = await api.patch(`/boards/${payload.id}/task`, payload.data);

  return data;
};

const baordService = {
  fetchAllBoards,
  createNewBoard,
  deleteBoard,
  updateBoard,
  createTask,
  deleteTask,
  updateTask,
};

export default baordService;
