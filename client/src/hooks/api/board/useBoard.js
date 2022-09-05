import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchBoards,
  fetchBoard,
  createNewBoad,
  updateBoard,
  deleteBoard,
  createTask,
  updateTask,
  deleteTask,
} from "./boardServices";

// fetching all boards
export const useFetchBoards = () => {
  return useQuery(["boards"], fetchBoards);
};

// fetching individual board by id
export const useFetchBoard = (boardId) => {
  return useQuery(["boards", boardId], fetchBoard);
};

// creating new board
export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation(createNewBoad, {
    onSuccess: () => {
      queryClient.invalidateQueries("boards");
    },
  });
};

// Updating board
export const useUpdateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation(updateBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("boards");
    },
  });
};

// deleting board
export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("boards");
    },
  });
};

// create task
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("boards");
    },
  });
};

// create task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("boards");
    },
  });
};

// deleteTask
export const useDeleteTask = (fetch) => {
  const queryClient = useQueryClient();
  return useMutation(deleteTask, {
    onSuccess: () => {
      if (fetch) {
        fetch && queryClient.invalidateQueries("boards");
      }
    },
  });
};
