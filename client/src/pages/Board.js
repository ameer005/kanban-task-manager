import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Column from "../components/Column/Column";
import BoardModal from "../components/Modals/BoardModal";

const Board = () => {
  const [showBoardModal, setShowBoardModal] = useState(false);
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
    <main className="flex gap-8 md:gap-5 w-full sidebar-h  px-8 md:px-5 py-6 overflow-scroll scrollbar-big">
      {renderColumnsList()}
      <div
        onClick={() => setShowBoardModal(true)}
        className="flex items-center justify-center h-[75vh] bg-colorPrimaryLight/40 rounded-md min-w-[18rem] mt-7 text-colorMediumGray
      ut-animation hover:text-colorpurple cursor-pointer"
      >
        <h3 className="text-2xl font-bold ">+ New Column</h3>
      </div>

      {showBoardModal && (
        <BoardModal
          isNew={false}
          setShowBoardModal={setShowBoardModal}
          board={board}
        />
      )}
    </main>
  );
};

export default Board;
