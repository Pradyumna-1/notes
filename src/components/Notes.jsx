import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromNote } from "../redux/noteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Notes = () => {
  const notes = useSelector((state) => state.note.notes);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const filteredData = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(noteId) {
    dispatch(removeFromNote(noteId));
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5 bg-slate-400"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((note) => {
            return (
              <div className="border" key={note?._id}>
                <div>{note.title}</div>
                <div>{note.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button>
                  <Link to={`/?noteId=${note?._id}`}>
                  Edit
                  </Link>
                 </button>
                  <button>
                    <Link to={`/notes/${notes?._id}`}>View</Link>
                  </button>
                  <button onClick={() => handleDelete(note?._id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(note?.content);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    Copy
                  </button>

                  {/* I have to do the share button by my self */}
                  <button>Share</button>
                  <div>{note.createdAt}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notes;
