import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToNote, resetToNote, updateToNote } from "../redux/noteSlice";
import { Copy, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

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
    // <div>
    //   <div className="flex flex-row gap-7 place-content-center pl-4 ">
    //     <input
    //       className="p-1 mt-2 rounded-2xl w-[66%] pl-4"
    //       type="text"
    //       placeholder="Write your title here.. "
    //       value={title}
    //       onChange={(e) => setTitle(e.target.value)}
    //     />
    //     <button onClick={createNote} className="p-2 mt-2 rounded-2xl">
    //       {noteId ? "Update My Note" : "Create a Note"}
    //     </button>
    //   </div>
    //   <div className="mt-8 flex  justify-center">
    //     <textarea
    //       className="p-4 mt-4 bg-blue-200 rounded-2xl min-w-[500px]"
    //       placeholder="Enter your content..."
    //       value={value}
    //       onChange={(e) => setValue(e.target.value)}
    //       rows={20}
    //     />
    //   </div>
    // </div>

    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 b">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // Dynamic width based on whether noteId is present
            className={`${
              noteId ? "w-[80%]" : "w-[85%]"
            } border rounded-md p-2  dark:bg-gray-800 text-black dark:text-white `}
          />
       

   
          <button
            className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={createNote}
          >
            {noteId ? "Update Note" : "Create Note"}
          </button>

          {noteId && (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={resetToNote}
            >
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full  rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden" />
            </div>
            {/* Circle and copy btn */}
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              {/*Copy  button */}
              <button
                className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy className="group-hover:text-sucess-500" size={20} />
              </button>
            </div>
          </div>

          {/* TextArea */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Your Content Here...."
            // className="w-full p-3 "
            className="w-full p-3 bg-white dark:bg-gray-800 text-black dark:text-white"
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
