import React, { useState } from "react";
import BoardModal from "../components/Modals/BoardModal";

const HomePage = () => {
  const [showBoardModal, setShowBoardModal] = useState(false);

  return (
    <main className="flex flex-col justify-center items-center sidebar-h w-full">
      <h3 className="text-colorMediumGray text-lg font-bold mb-5">
        Choose the board that you want to see or create a new one.
      </h3>

      <button
        onClick={() => setShowBoardModal(true)}
        className="btn-primary w-full max-w-[10rem] text-base"
      >
        + Add New Board
      </button>

      {showBoardModal && (
        <BoardModal isNew={true} setShowBoardModal={setShowBoardModal} />
      )}
    </main>
  );
};

export default HomePage;
