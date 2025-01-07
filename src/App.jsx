import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import ViewNotes from "./components/ViewNotes";
import DayNightToggle from "./components/ColorSwitcher/DayNightToggle";

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
      path: "/notes/:id",
      element: (
        <div>
          <Navbar />
          <ViewNotes />
        </div>
      ),
    },
  ]);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <DayNightToggle />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
