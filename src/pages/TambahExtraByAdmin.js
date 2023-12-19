import React from "react";
import axios from "axios";
import { useState } from "react";
import "../style/table.css";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";

export default function TambahExtra() {
  const param = useParams();
  const [nama_extra, setNamaExtra] = useState("");
  const [status, setStatus] = useState("");
  const batal = () => {
    window.location.href = "/extra/" + param.id;
  };

  const TambahExtra = async (e) => {
    e.preventDefault();

    const add = {
      namaExtra: nama_extra,
      status: status,
    };

    try {
      await axios.post(
        `http://localhost:8080/api/extra/${param.id}/add-extra`,
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
        window.location.href = "/extra/" + param.id;
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
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64 mt-14">
        <div className="mx-auto max-w-screen-xl">
          <form
            className="mt-10 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add"
            onSubmit={TambahExtra}
          >
            <p className="text-center text-3xl font-medium mb-7">
              Tambah Extra
            </p>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative">
                <label >Nama Extra</label>
                <input
                  id="namaExtra"
                  type="text"
                  className="w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
                  placeholder="  Nama  Extra "
                  value={nama_extra}
                  onChange={(e) => setNamaExtra(e.target.value)}
                />
              </div>
              <div className="relative">
                <label >Status</label>
                <select
                  name="status"
                  id="status"
                  className="w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
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
        </div>
      </div>
    </>
  );
}
