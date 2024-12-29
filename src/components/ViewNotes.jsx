import React from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
const ViewNotes = () => {
  const { id } = useParams();
  const AllNotes = useSelector((state) => state.note.notes);

  const note = AllNotes.filter((n) => n._id === id);

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-center pl-4 ">
        <input
          className="p-1 mt-2 rounded-2xl w-[66%] pl-4"
          type="text"
          placeholder="Write your title here.. "
          value={note.title}
          onChange={(e) => setTitle(e.target.value)}
          disabled
        />
      </div>
      <div className="mt-8 flex  justify-center">
        <textarea
          className="p-4 mt-4 bg-blue-200 rounded-2xl min-w-[500px]"
          placeholder="Enter your content..."
          value={note.content}
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          disabled
        />
      </div>
    </div>
  );
};

export default ViewNotes;
