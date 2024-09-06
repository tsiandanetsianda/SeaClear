import React from "react";
import ReactDOMClient from "react-dom/client";
import { BeachDetails } from "./screens/BeachDetails";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<BeachDetails />);
