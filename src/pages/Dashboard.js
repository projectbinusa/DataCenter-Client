import React from "react";
import Sidebar from "../components/Sidebar";
import "../style/dash.css";

export default function Dashboard() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <main className="s-layout__content">home admin</main>
      </div>
    </div>
  );
}
