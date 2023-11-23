import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavComp from "../../components/NavComp";
import Swal from "sweetalert2";
import "../../style/edit.css";
import PageSidebar from "../../components/PageSidebar";

export default function UpdateGelar() {
  const gelarPendidikanId = localStorage.getItem("gelarPendidikanId");
  const [namaGelar, seNamaGelar] = useState("");

  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/gelarPendidikan/${gelarPendidikanId}`)
      .then((response) => {
        const dataGelar = response.data;
        seNamaGelar(dataGelar.namaGelar);

        setStatus(dataGelar.status);
      })
      .catch((error) => {
        alert("Terjadi kesalahan Sir! " + error);
      });
  }, []);

  const nameChangeHandler = (event) => {
    seNamaGelar(event.target.value);
  };

  const statusChangeHandler = (event) => {
    setStatus(event.target.value);
  };

  const submitActionHandler = async (event) => {
    event.preventDefault();

    await axios
      .put(`http://localhost:8080/api/gelarPendidikan/${gelarPendidikanId}` , {
        namaGelar: namaGelar,

        status: status,
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Success!!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/gelar");
      })
      .catch((error) => {
        alert("Terjadi kesalahan: " + error);
      });
  };

  const batal = () => {
    navigate("/gelar");
  };

  return (
    <>
      <div>
        <PageSidebar />
        <div className="mx-auto min-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 min-h-screen max-h-screen p-4 sm:ml-64">
          <div className="mx-auto max-w-3xl">
            <form
              action=""
              className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add"
              onSubmit={submitActionHandler}
            >
                <center>

              <p className="text-3xl font-medium mb-7">Edit Gelar Pendidikan</p>
                </center>

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
                    value={namaGelar}
                    onChange={nameChangeHandler}
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
                    id="status"
                    name="status"
                    value={status}
                    onChange={statusChangeHandler}
                  >
                    <option value="" disabled>
                      Status
                    </option>
                    <option value="Aktif">Aktif</option>
                    <option value="Non Aktif">Non Aktif</option>
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
      </div>
    </>
  );
}
