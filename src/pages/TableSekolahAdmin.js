import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import school from "../assets/school-icon.png";
import axios from "axios";
import Swal from "sweetalert2";
import "../style/dash.css";
import { useParams } from "react-router-dom";

export default function TableSekolahAdmin() {
  const param = useParams();
  const [sekolah, setSekolah] = useState([]);

  const getSekolah = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/sekolah");
      setSekolah(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSekolah = async (id) => {
    try {
      await Swal.fire({
        title: "Anda yakin?",
        text: "Yakin ingin menghapus data sekolah ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete("http://localhost:8080/api/sekolah/" + id)
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Berhasil Menghapus!!",
                showConfirmButton: false,
                timer: 1500,
              });
              getSekolah();
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSekolah();
  });

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
                  <div className="border border-[#10316b] rounded-lg hover:shadow-xl">
                    <div className="px-3 py-5">
                      <div className="mb-7">
                        <img
                          src={school}
                          alt="school-icon"
                          className="w-28 h-24"
                        />
                      </div>
                      <h1 className="nama-sekolah text-lg font-semibold">
                        {smp.namaSekolah}
                      </h1>
                      <h4 className="text-sm mb-4">{smp.alamatSekolah}</h4>
                      <div className="grid grid-cols-2 gap-2 mt-6">
                        <button
                          className="text-white w-[100px] bg-red-500 active:bg-slate-300 text-sm py-2 px-5 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => deleteSekolah(smp.id)}
                        >
                          Hapus
                        </button>
                        <a href={"/sekolah/" + smp.id}>
                          <button
                            className="text-white w-[100px] add-siswa active:bg-slate-300 text-sm py-2 px-5 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                            type="button"
                          >
                            Detail
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
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
