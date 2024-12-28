import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import AllNotes from "./components/AllNotes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <Home />
        </div>
      ),
    },
    {
      path: "/notes",
      element: (
        <div>
          <Navbar />
          <Notes />
        </div>
      ),
    },

    {
      path: "/notes:id",
      element: (
        <div>
          <Navbar />

          <AllNotes />
        </div>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
