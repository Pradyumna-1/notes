import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToNote, updateToNote } from "../redux/noteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const noteId = searchParams.get("noteId");

  const dispatch = useDispatch();

  const AllNotes = useSelector((state) => state.note.notes);

  useEffect(() => {
    if (noteId) {
      const note = AllNotes.find((n) => n._id === noteId);
      setTitle(note.title);
      setValue(note.content);
    }
  }, [noteId]);

  function createNote() {
    const note = {
      title: title,
      content: value,
      _id: noteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (noteId) {
      // update
      dispatch(updateToNote(note));
    } else {
      // create
      dispatch(addToNote(note));
    }
    // after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-center pl-4 ">
        <input
          className="p-1 mt-2 rounded-2xl w-[66%] pl-4"
          type="text"
          placeholder="Write your title here.. "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createNote} className="p-2 mt-2 rounded-2xl">
          {noteId ? "Update My Note" : "Create a Note"}
        </button>
      </div>
      <div className="mt-8 flex  justify-center">
        <textarea
          className="p-4 mt-4 bg-blue-200 rounded-2xl min-w-[500px]"
          placeholder="Enter your content..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
