import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Column from "../components/Column/Column";

const Board = () => {
  const { id } = useParams();
  const board = useSelector((state) =>
    state.board.fetchAllBoards.boardsList.find((el) => el._id === id)
  );

  const renderColumnsList = () => {
    return board?.columns.map((column) => {
      return <Column key={column._id} data={column} />;
    });
  };

  return (
    <main className="flex gap-8 w-full px-8 py-6 ">{renderColumnsList()}</main>
  );
};

export default Board;
