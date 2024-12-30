import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromNote } from "../redux/noteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Calendar,
  Copy,
  ExternalLink,
  Eye,
  PencilLine,
  Trash2,
} from "lucide-react";
import { FormatDate } from "../utils/formatDate";

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
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search Input */}
        <div className="w-full flex gap-3 px-4 py-2 rounded-[0.3rem] border border-[rgba(128,121,121,0.3)] mt-6">
          <input
            className="focus:outline-none w-full bg-transparent"
            type="search"
            placeholder="Search note here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* All Notes Section */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="text-4xl font-bold text-center border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Notes
          </h2>

          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredData.length > 0 ? (
              filteredData.map((note) => {
                return (
                  <div
                    className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
                    key={note?._id}
                  >
                    {/* Note Title and Content */}
                    <div className="w-[50%] flex flex-col space-y-3">
                      <p className="text-4xl font-semibold">{note?.title}</p>
                      <p className="font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                        {note.content}
                      </p>
                    </div>

                    {/* Button Group */}
                    <div className="flex flex-col gap-y-4 sm:items-end">
                      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                        {/* Edit Button */}
                        <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500">
                          <Link to={`/?noteId=${note?._id}`}>
                            <PencilLine
                              className="text-black group-hover:text-blue-500"
                              size={20}
                            />
                          </Link>
                        </button>

                        {/* View Button */}
                        <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-orange-500">
                          <Link to={`/notes/${note?._id}`}>
                            <Eye
                              className="text-black group-hover:text-orange-500"
                              size={20}
                            />
                          </Link>
                        </button>

                        {/* Delete Button */}
                        <button
                          className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-pink-500"
                          onClick={() => handleDelete(note?._id)}
                        >
                          <Trash2
                            className="text-black group-hover:text-pink-500"
                            size={20}
                          />
                        </button>

                        {/* Copy Button */}
                        <button
                          className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-green-500"
                          onClick={() => {
                            navigator.clipboard.writeText(note?.content);
                            toast.success("Copied to clipboard");
                          }}
                        >
                          <Copy
                            className="text-black group-hover:text-green-500"
                            size={20}
                          />
                        </button>

                        {/* Share Button */}
                        <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-fuchsia-500">
                          <ExternalLink className="text-black group-hover:text-fuchsia-500" size={20} />
                        </button>
                      </div>

                      {/* Date */}
                      <div className="gap-x-2 flex">
                        <Calendar className="text-black" size={20} />
                        {FormatDate(note.createdAt)}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-2xl text-center w-full text-chileanFire-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
