import React, { useState } from "react";
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Interactions from "./pages/Interactions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Interactions />,
  },
]);
function App() {
  const [count, setCount] = useState(0);

  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
