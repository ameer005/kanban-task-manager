import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchBoards,
  fetchBoard,
  createNewBoad,
  updateBoard,
  deleteBoard,
} from "./boardServices";

// fetching all boards
export const useFetchBoards = () => {
  return useQuery(["boards"], fetchBoards);
};

// fetching individual board by id
export const useFetchBoard = (boardId) => {
  return useQuery(["board", boardId], fetchBoard);
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
