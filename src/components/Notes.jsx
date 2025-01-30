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
  Pencil,
  PencilIcon,
  PencilLine,
  Share2,
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

  const handleShare = async (note) => {
    const shareData = {
      title: note.title,
      text: note.content,
      url: `${window.location.origin}/notes/${note._id}`,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Share your notes ");
      } catch (error) {
        console.error("Error sharing:", error);
        toast.error("Error sharing the note.");
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search input */}
        <div className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(128,121,121,0.3)]  mt-6">
          <input
            className="focus:outline-none w-full bg-transparent"
            type="search"
            placeholder="Search your note here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* All Notes */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="text-center font-bold text-4xl  border-b pb-4">
            All Notes
          </h2>

          <div className="flex flex-col gap-y-5 px-2 pt-4 w-full ">
            {filteredData.length > 0 ? (
              filteredData.map((note) => {
                return (
                  <div
                    className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
                    key={note?._id}
                  >
                    {/* Description */}
                    <div className="w-[50%] flex flex-col space-y-3 ">
                      <p className="text-4xl font-semibold ">{note?.title}</p>
                      <p className="font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                        {note.content}
                      </p>
                    </div>

                    {/* For button  */}

                    <div className="flex flex-col gap-y-4 sm:items-end">
                      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                        <button className="p-2 rounded-[0.2rem]  border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500">
                          <Link to={`/?noteId=${note?._id}`}>
                            <PencilLine
                              className=" group-hover:text-blue-500"
                              size={20}
                            />
                          </Link>
                        </button>
                        {/* View Button */}
                        <button className="p-2 rounded-[0.2rem]  border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                          <Link to={`/notes/${note?._id}`}>
                            <Eye
                              className=" group-hover:text-orange-500"
                              size={20}
                            />
                          </Link>
                        </button>
                        {/* Delete button */}
                        <button
                          className="p-2 rounded-[0.2rem]  border border-[#c7c7c7]  hover:bg-transparent group hover:border-rose-500"
                          onClick={() => handleDelete(note?._id)}
                        >
                          <Trash2
                            className="
                      
                             group-hover:text-rose-600"
                            size={20}
                          />
                        </button>

                        {/* Coppy button */}
                        <button
                          className="p-2 rounded-[0.2rem]  border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                          onClick={() => {
                            navigator.clipboard.writeText(note?.content);
                            toast.success("Copied to clipboard");
                          }}
                        >
                    
                          <Copy
                            className=" group-hover:text-green-500"
                            size={20}
                          />
                        </button>
{/* Share Button  */}
                        <button className="p-2 rounded-[0.2rem]  border border-[#c7c7c7]  hover:bg-transparent group hover:border-fuchsia-500">
                          <ExternalLink
                            className=" group-hover:text-fuchsia-500"
                            onClick={() => handleShare(note)}
                          />
                        </button>
                      </div>
                      {/* Date  */}
                      <div className="gap-x-2 flex">
                        <Calendar className="" size={20} />
                        {FormatDate(note.createdAt)}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-2xl text-center w-full text-chileanFire-500 text-red-400">
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
