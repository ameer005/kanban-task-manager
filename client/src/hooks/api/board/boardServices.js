import api from "../../../api/api";

export const fetchBoards = () => {
  return api.get("/boards");
};

export const fetchBoard = ({ queryKey }) => {
  return api.get(`/boards/${queryKey[1]}`);
};

export const createNewBoad = (boardData) => {
  return api.post("/boards", boardData);
};

export const updateBoard = (payload) => {
  return api.patch(`/boards/${payload.id}`, payload.data);
};

export const deleteBoard = (boardId) => {
  return api.delete(`/boards/${boardId}`);
};

export const createTask = (payload) => {
  return api.post(`/boards/${payload.id}/task`, payload.data);
};

export const updateTask = (payload) => {
  return api.patch(`/boards/${payload.id}/task`, payload.data);
};

export const deleteTask = (payload) => {
  return api.put(`/boards/${payload.id}/task`, payload.data);
};
