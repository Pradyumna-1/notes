// import { Copy } from "lucide-react";
// import React from "react";
// import { useSelector } from "react-redux";

// import { useParams } from "react-router-dom";
// const ViewNotes = () => {
//   const { id } = useParams();
//   const AllNotes = useSelector((state) => state.note.notes);

//   const note = AllNotes.find((n) => n._id === id);

//   return (

//     <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
//       <div className="flex flex-col gap-y-5 items-start">
//         <input
//           type="text"
//           placeholder="Title"
//           value={note.title}
//           disabled
//           className="w-full text-black border border-[rgba(128,121,121,0.3)] rounded-md p-2 bg-opacity-10 backdrop-blur-2xl"
//         />
//         <div
//           className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
//         >
//           <div
//             className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
//           >
//             <div className="w-full flex gap-x-[6px] items-center select-none group" />

//             {/* Circle and copy btn */}
//             <div
//               className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
//             >
//               {/* Copy button */}
//               <button
//                 className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
//                 onClick={() => {
//                   navigator.clipboard.writeText(note.content);
//                   toast.success("Copied to Clipboard");
//                 }}
//               >
//                 <Copy className="group-hover:text-sucess-500" size={20} />
//               </button>
//             </div>
//           </div>

//           {/* TextArea */}
//           <textarea
//             value={note.content}
//             disabled
//             placeholder="Write Your Content Here...."
//             className="w-full p-3 bg-blue-200 rounded-2xl focus-visible:ring-0  bg-opacity-10 backdrop-blur-2xl"
//             style={{
//               caretColor: "#000",
//             }}
//             rows={20}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewNotes;

import { Copy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ViewNotes = () => {
  const { id } = useParams();
  const allNotes = useSelector((state) => state.note.notes);
  const [note, setNote] = useState(null);

  useEffect(() => {
    // Try to find note in Redux state first
    let foundNote = allNotes.find((n) => n._id === id);

    if (!foundNote) {
      // If not found, check localStorage
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      foundNote = savedNotes.find((n) => n._id === id);
    }

    setNote(foundNote);
  }, [id, allNotes]);

  if (!note) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h2 className="text-red-500 text-2xl font-semibold">Note not found!</h2>
      </div>
    );
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          disabled
          className="w-full text-black border border-[rgba(128,121,121,0.3)] rounded-md p-2 bg-opacity-10 backdrop-blur-2xl"
        />
        <div className="w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl">
          <div className="w-full flex items-center justify-between px-4 py-2 border-b border-[rgba(128,121,121,0.3)]">
            {/* Copy button */}
            <button
              className="flex justify-center items-center transition-all duration-300 ease-in-out group"
              onClick={() => {
                navigator.clipboard.writeText(note.content);
                toast.success("Copied to Clipboard");
              }}
            >
              <Copy className="group-hover:text-green-500" size={20} />
            </button>
          </div>

          {/* TextArea */}
          <textarea
            value={note.content}
            disabled
            placeholder="Write Your Content Here...."
            className="w-full p-3 bg-blue-200 rounded-2xl focus-visible:ring-0 bg-opacity-10 backdrop-blur-2xl"
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
