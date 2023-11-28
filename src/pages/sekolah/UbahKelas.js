import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavComp from "../../components/NavComp";
import Swal from "sweetalert2";
import "../../style/edit.css";
import PageSidebar from "../../components/PageSidebar";

export default function UbahKelas() {
  const kelasId = localStorage.getItem("kelasId");
  const [namaKelas, setNamaKelas] = useState("");

  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/kelas/${kelasId}`)
      .then((response) => {
        const dataKelas = response.data;
        setNamaKelas(dataKelas.namaKelas);

        setStatus(dataKelas.status);
      })
      .catch((error) => {
        alert("Terjadi kesalahan Sir! " + error);
      });
  }, []);

  const nameChangeHandler = (event) => {
    setNamaKelas(event.target.value);
  };

  const statusChangeHandler = (event) => {
    setStatus(event.target.value);
  };

  const submitActionHandler = async (event) => {
    event.preventDefault();
   
  
    await axios
      .put(`http://localhost:8080/api/kelas/${kelasId}`, {
        namaKelas: namaKelas,
        status: status,
      })
      .then(() => {
        // Show a success message using Sweetalert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Success!!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Redirect to the data-kelas page after Sweetalert is closed
          window.location.href = "/data-kelas";
        });
      })
      .catch((error) => {
        // Handle errors by displaying an alert message
        alert("Terjadi kesalahan: " + error);
      })
     
  };
  const batal = () => {
    window.location.href = "/data-kelas";
  };

  return (
    <>
      <div>
        <PageSidebar />
        <div className="p-4 sm:ml-64 mt-14">
          <div className="mx-auto max-w-screen-xl">
            <form
              className="mt-10 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add"
              onSubmit={submitActionHandler}
            >
              <p className="text-center text-3xl font-medium mb-7">
                Edit Kelas
              </p>

              <div class="grid md:grid-cols-2 md:gap-6">
                <div className="relative">
                  <label htmlFor="namaKelas">Nama Kelas</label>
                  <input
                    id="namaKelas"
                    type="text"
                    className="w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
                    placeholder="  Nama  Kelas "
                    value={namaKelas}
                    onChange={nameChangeHandler}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="status">Status</label>
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
