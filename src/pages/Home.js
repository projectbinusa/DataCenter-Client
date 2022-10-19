import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavComp from "../components/NavComp";
import "../css/form.css";

export default function Home() {
  const [sekolah, setSekolah] = useState([])
  const [searchTerm, setsearchTerm] = useState("");


  const getAll = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/useraall")
      setSekolah(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <NavComp />
      <div className="p-5">
        home
    </div>
    </div>
  );
}
