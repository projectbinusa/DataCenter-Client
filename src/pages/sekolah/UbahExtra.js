import axios from "axios";
import React, { useState, useEffect } from "react";
import {   useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../../style/edit.css";
import PageSidebar from "../../components/PageSidebar";

export default function UbahKelas() {
  const [namaExtra, setNamaExtra] = useState("");
  const [status, setStatus] = useState("");
  const param = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/extra/ ` + param.id)
      .then((response) => {
        const dataExtra = response.data;
        setNamaExtra(dataExtra.namaExtra);
        setStatus(dataExtra.status);
      })
      .catch((error) => {
        alert("Terjadi kesalahan Sir! " + error);
      });
  }, [param]);

  const nameChangeHandler = (event) => {
    setNamaExtra(event.target.value);
  };

  const statusChangeHandler = (event) => {
    setStatus(event.target.value);
  };

  const submitActionHandler = async (event) => {
    try {
      event.preventDefault();
      await axios.put(`http://localhost:8080/api/extra/` + param.id, {
        namaExtra: namaExtra,
        status: status,
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Edit Success!!",
        showConfirmButton: false,
        timer: 1500,
      });

      window.location.href = "/extra";
    } catch (error) {
      console.error("Terjadi kesalahan:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat menyimpan perubahan!",
      });
    }
  };

  const batal = () => {
    window.location.href = "/extra";
  };

  return (
    <>
      <PageSidebar />
      <div className="p-4 sm:ml-64 mt-14">
        <div className="mx-auto max-w-screen-xl">
          <form
            className="mt-10 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add"
            onSubmit={submitActionHandler}
          >
            <p className="text-center text-3xl font-medium mb-7">Edit Extra</p>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative">
                <label>Nama Extra</label>
                <input
                  id="namaExtra"
                  type="text"
                  className="w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
                  placeholder="  Nama  Extra "
                  value={namaExtra}
                  onChange={nameChangeHandler}
                />
              </div>
              <div className="relative">
                <label>Status</label>
                <select
                  name="status"
                  id="status"
                  className="w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
                  value={status}
                  onChange={statusChangeHandler}
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
