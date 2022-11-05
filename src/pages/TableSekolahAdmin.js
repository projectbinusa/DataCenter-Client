import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import school from "../assets/school-icon.png";
import axios from "axios";
import "../style/dash.css";

export default function TableSekolahAdmin() {
  const [sekolah, setSekolah] = useState([]);


  const getSekolah = async() => {
    try {
      const res = await axios.get("http://localhost:8080/api/sekolah");
      setSekolah(res.data);
    } catch (error) {
      console.log(error);      
    }
  }
  
  useEffect(() => {
    getSekolah();
  })
        
  return (
    <div>
      <div className="flex">
        {/* sidebar start */}
        <div>
          <Sidebar />
        </div>
        {/* sidebar end */}

        {/* content start */}
        <div className="flex justify-center">
          <main className="s-content px-10 py-5">

            <div className="border bg-[#10316b] mb-7 px-16">
              <div className="text-4xl text-white font-semibold my-7">
                Data Sekolah Menengah Pertama di Wilayah Semarang
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
              {sekolah.map((smp) => (
              <div key={smp.id}>
                <a href={"/sekolah/" + smp.id} className="">
                  <div className="border border-[#10316b] rounded-lg hover:shadow-xl">
                    <div className="px-8 py-5">
                      <div className="mb-7">
                        <img
                          src={school}
                          alt="school-icon"
                          className="w-28 h-24"
                        />
                      </div>
                      <h1 className="text-sm font-medium mb-2">
                        {smp.namaSekolah}
                      </h1>
                      <h4 className="text-xs mb-4">
                        {smp.alamatSekolah}
                      </h4>
                      <p className="text-sm text-blue-500">klik untuk melihat detail &rarr;</p>
                    </div>
                  </div>
                </a>
              </div>
              ))}
              
            </div>
          </main>
        </div>
        {/* content end */}

      </div>
    </div>
  );
}
