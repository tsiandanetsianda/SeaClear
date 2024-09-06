import React from "react";
import ReactDOMClient from "react-dom/client";
import { CommunityDiscussion } from "./screens/CommunityDiscussion";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);
root.render(<CommunityDiscussion />);
