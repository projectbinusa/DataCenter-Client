import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Aos from "aos";
import "../../style/table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PageSidebar from "../../components/PageSidebar";
import Swal from "sweetalert2";

export default function TambahGelar() {
  const userId = localStorage.getItem("userId");
  const sekolahId = localStorage.getItem("sekolahId");
  const kelasId = localStorage.getItem("kelasId");
  const navigate = useNavigate();
  const [nama_gelar, setNamaGelar] = useState("");
  const [status, setStatus] = useState("");
  const batal = () => {
    navigate("/gelar");
  };
  const TambahGelar = async (e) => {
    e.preventDefault();

    const add = {
      namaGelar: nama_gelar,
      status: status,
       
    };

    try {
      await axios.post(
        `http://localhost:8080/api/gelarPendidikan/${sekolahId}/add-gelarPendidikan`,
        add
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/gelar");
      }, 1500);
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: "Mohon coba lagi",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    < >
      <PageSidebar />
      <div className="flex my-20">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
          <form
              action=""
              className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add"
              onSubmit={TambahGelar}
            >
              <p className="text-3xl font-medium mb-7">Tambah  Gelar</p>

            

               

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="relative ">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama Gelar
                </label>
                <input
                  type="text"
                  id="name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Nama Gelar"
                  value={nama_gelar}
                  onChange={(e) => setNamaGelar(e.target.value)}
                  required
                />
              </div>
                <div className="relative">
                  <label
                    for=" "
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status  
                  </label>
                  <select
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    id="gelar "
                    name=" gelar"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="" disabled>
                      Status  
                    </option>
                    
                    <option value="Aktif">Aktif</option>
                    <option value="Non Aktif">Non aktif</option>
                  </select>
                </div>

               
              </div>
 

              <div className="flex justify-between p-5">
                <button
                  type="button"
                  onClick={batal}
                  className="block w-24 rounded-lg text-black outline outline-red-500 py-3 text-sm font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="block w-24 rounded-lg text-black outline outline-[#0b409c] py-3 text-sm font-medium"
                >
                  Simpan
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}
