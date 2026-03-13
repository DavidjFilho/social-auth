import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import { router } from "./app/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
