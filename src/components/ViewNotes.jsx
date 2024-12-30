import { Copy } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
const ViewNotes = () => {
  const { id } = useParams();
  const AllNotes = useSelector((state) => state.note.notes);

  const note = AllNotes.find((n) => n._id === id);

  return (
    // <div>
    //   <div className="flex flex-row gap-7 place-content-center pl-4 ">
    //     <input
    //       className="p-1 mt-2 rounded-2xl w-[66%] pl-4"
    //       type="text"
    //       placeholder="Write your title here.. "
    //       value={note.title}
    //       onChange={(e) => setTitle(e.target.value)}
    //       disabled
    //     />
    //   </div>
    //   <div className="mt-8 flex  justify-center">
    //     <textarea
    //       className="p-4 mt-4 bg-blue-200 rounded-2xl min-w-[500px]"
    //       placeholder="Enter your content..."
    //       value={note.content}
    //       onChange={(e) => setValue(e.target.value)}
    //       rows={20}
    //       disabled
    //     />
    //   </div>
    // </div>

    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          disabled
          className="w-full text-black border border-[rgba(128,121,121,0.3)] rounded-md p-2 bg-opacity-10 backdrop-blur-2xl"
        />
        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group" />

            {/* Circle and copy btn */}
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              {/* Copy button */}
              <button
                className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(note.content);
                  toast.success("Copied to Clipboard");
                }}
              >
                <Copy className="group-hover:text-sucess-500" size={20} />
              </button>
            </div>
          </div>

          {/* TextArea */}
          <textarea
            value={note.content}
            disabled
            placeholder="Write Your Content Here...."
            className="w-full p-3 bg-blue-200 rounded-2xl focus-visible:ring-0  bg-opacity-10 backdrop-blur-2xl"
            style={{
              caretColor: "#000",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewNotes;

// import React from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// const ViewNotes = () => {
//   const { id } = useParams(); // Get the note ID from the URL params
//   const AllNotes = useSelector((state) => state.note.notes);

//   // Find the note with the given ID
//   const note = AllNotes.find((n) => n._id === id);

//   if (!note) {
//     return <div>Note not found</div>; // Handle if no note is found
//   }

//   return (
//     <div>
//       <div className="flex flex-row gap-7 place-content-center pl-4 ">
//         <input
//           className="p-1 mt-2 rounded-2xl w-[66%] pl-4"
//           type="text"
//           placeholder="Write your title here.. "
//           value={note.title} // Display the note title
//           disabled // Make it uneditable
//         />
//       </div>
//       <div className="mt-8 flex justify-center">
//         <textarea
//           className="p-4 mt-4 bg-blue-200 rounded-2xl min-w-[500px]"
//           placeholder="Enter your content..."
//           value={note.content} // Display the note content
//           disabled // Make it uneditable
//           rows={20}
//         />
//       </div>
//     </div>
//   );
// };

// export default ViewNotes;
