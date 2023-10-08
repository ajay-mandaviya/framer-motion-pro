import React, { useState } from "react";
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Interactions from "./pages/Interactions";
import Shuffle from "./pages/Shuffle";
import RadialGradient from "./pages/RadialGradient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Interactions />,
  },
  {
    path: "/shuffle",
    element: <Shuffle />,
  },
  {
    path: "/gradient",
    element: <RadialGradient />,
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
