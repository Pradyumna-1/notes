import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  // notes: localStorage.getItem("notes")
  //   ? JSON.parse(localStorage.getItem("note"))
  //   : [],

  // I have changes here because I was not getting the data

  notes: (() => {
    const storedNotes = localStorage.getItem("notes");
    try {
      return storedNotes ? JSON.parse(storedNotes) : []; // Parse safely, or return an empty array
    } catch (error) {
      console.error("Error parsing notes from localStorage:", error); // Log errors
      return [];
    }
  })(),
};
const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addToNote: (state, action) => {
      const note = action.payload;
      state.notes.push(note);
      localStorage.setItem("notes", JSON.stringify(state.notes));
      toast("Note Added successfully 🙂");
    },
    updateToNote: (state, action) => {},
    resetToNote: (state, action) => {},
    removeFromNote: (state, action) => {},
  },
});
export const { addToNote, updateToNote, resetToNote, removeFromNote } =
  noteSlice.actions;
export default noteSlice.reducer;
