import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import school from "../assets/school-icon.png";
import "../style/dash.css";
import axios from "axios";

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
        <div>
          <Sidebar />
        </div>
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
                <a href={"/sekolah/" + smp.id} className="group relative block h-64">
                  <span className="absolute inset-0 border-2 border-dashed border-[#10316b]"></span>

                  <div className="relative h-full transform border-2 border-[#10316b] bg-white transition-transform hover:-translate-x-2 hover:-translate-y-2">
                    <div className="px-8 py-5">
                      <div className="mb-7">
                        <img
                          src={school}
                          alt="school-icon"
                          className="w-28 h-24"
                        />
                      </div>
                      <h1 className="text-sm font-medium mb-4">
                        {smp.namaSekolah}
                      </h1>
                      <h4 className="text-xs">
                        {smp.alamatSekolah}
                      </h4>
                    </div>
                  </div>
                </a>
              </div>
              ))}
              {/* <div>
                <a href="" className="group relative block h-64">
                  <span className="absolute inset-0 border-2 border-dashed border-[#10316b]"></span>

                  <div className="relative h-full transform border-2 border-[#10316b] bg-white transition-transform hover:-translate-x-2 hover:-translate-y-2">
                    <div className="px-8 py-5">
                      <div className="mb-7">
                        <img
                          src={school}
                          alt="school-icon"
                          className="w-28 h-24"
                        />
                      </div>
                      <h1 className="text-sm font-medium mb-2">
                        SMP BINA NUSANTARA
                      </h1>
                      <h4 className="text-sm mb-4">
                        Jl. Kemantren, Kel Wonosari
                      </h4>
                      <p className="text-sm font-semibold">214 siswa</p>
                    </div>
                  </div>
                </a>
              </div>
              <div>
                <a href="" className="group relative block h-64">
                  <span className="absolute inset-0 border-2 border-dashed border-[#10316b]"></span>

                  <div className="relative h-full transform border-2 border-[#10316b] bg-white transition-transform hover:-translate-x-2 hover:-translate-y-2">
                    <div className="px-8 py-5">
                      <div className="mb-7">
                        <img
                          src={school}
                          alt="school-icon"
                          className="w-28 h-24"
                        />
                      </div>
                      <h1 className="text-sm font-medium mb-2">
                        SMP BINA NUSANTARA
                      </h1>
                      <h4 className="text-sm mb-4">
                        Jl. Kemantren, Kel Wonosari
                      </h4>
                      <p className="text-sm font-semibold">214 siswa</p>
                    </div>
                  </div>
                </a>
              </div>
              <div>
                <a href="" className="group relative block h-64">
                  <span className="absolute inset-0 border-2 border-dashed border-[#10316b]"></span>

                  <div className="relative h-full transform border-2 border-[#10316b] bg-white transition-transform hover:-translate-x-2 hover:-translate-y-2">
                    <div className="px-8 py-5">
                      <div className="mb-7">
                        <img
                          src={school}
                          alt="school-icon"
                          className="w-28 h-24"
                        />
                      </div>
                      <h1 className="text-sm font-medium mb-2">
                        SMP BINA NUSANTARA
                      </h1>
                      <h4 className="text-sm mb-4">
                        Jl. Kemantren, Kel Wonosari
                      </h4>
                      <p className="text-sm font-semibold">214 siswa</p>
                    </div>
                  </div>
                </a>
              </div> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
