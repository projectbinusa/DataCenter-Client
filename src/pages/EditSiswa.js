import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavComp from "../components/NavComp";
import Swal from "sweetalert2";
import "../style/edit.css";

export default function EditSiswa() {
  const param = useParams();
  const [namaSiswa, setNamaSiswa] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [gender, setGender] = useState("");
  const [agama, setAgama] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/siswa/" + param.id)
      .then((response) => {
        const dataSiswa = response.data;
        setNamaSiswa(dataSiswa.namaSiswa);
        setTempatLahir(dataSiswa.tempatLahir);
        setTanggalLahir(dataSiswa.tanggalLahir);
        setGender(dataSiswa.gender);
        setAgama(dataSiswa.agama);
      })
      .catch((error) => {
        alert("Terjadi kesalahan Sir! " + error);
      });
  }, []);

  const nameChangeHandler = (event) => {
    setNamaSiswa(event.target.value);
  };

  const tempatChangeHandler = (event) => {
    setTempatLahir(event.target.value);
  };

  const tanggalChangeHandler = (event) => {
    setTanggalLahir(event.target.value);
  };

  const genderChangeHandler = (event) => {
    setGender(event.target.value);
  };
  const agamaChangeHandler = (event) => {
    setAgama(event.target.value);
  };

  const submitActionHandler = async (event) => {
    event.preventDefault();

    await axios
      .put("http://localhost:8080/api/siswa/" + param.id, {
        namaSiswa: namaSiswa,
        tempatLahir: tempatLahir,
        tanggalLahir: tanggalLahir,
        gender: gender,
        agama: agama,
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Success!!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/table");
      })
      .catch((error) => {
        alert("Terjadi kesalahan: " + error);
      });
  };

  return (
    <div>
      <div className="sticky top-0">
        <NavComp />
      </div>
      <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg">
          <form
            action=""
            class="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add"
            onSubmit={submitActionHandler}
          >
            <p class="text-3xl font-medium mb-7">Edit User</p>

            <div class="relative mt-3">
              <label
                for="nama"
                class="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              >
                <input
                  type="text"
                  id="nama"
                  placeholder="Nama"
                  class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  value={namaSiswa}
                  onChange={nameChangeHandler}
                />

                <span class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                  Nama
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 gap-5 text-center sm:grid-cols-2">
              <div class="relative mt-3">
                <label
                  for="tempatLahir"
                  class="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <input
                    type="text"
                    id="tempatLahir"
                    placeholder="Tempat Lahir"
                    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    value={tempatLahir}
                    onChange={tempatChangeHandler}
                  />

                  <span class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                    Tempat Lahir
                  </span>
                </label>
              </div>
              <div class="relative mt-3">
                <label
                  for="tanggalLahir"
                  class="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <input
                    type="text"
                    id="tanggalLahir"
                    placeholder="Tanggal Lahir"
                    class="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    value={tanggalLahir}
                    onChange={tanggalChangeHandler}
                  />

                  <span class="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                    Tanggal Lahir
                  </span>
                </label>
              </div>
            </div>

            <div class="relative mt-3">
              <label class="sr-only" for="agama">
                Agama
              </label>

              <select
                class="relative w-full border-gray-200 p-3 text-sm focus:z-10 block bg-white overflow-hidden rounded-md border  shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                id="agama"
                name="agama"
                autocomplete="agama-name"
                onChange={agamaChangeHandler}
              >
                <option selected disabled>
                  Agama
                </option>
                <option onChange={agamaChangeHandler}>Islam</option>
                <option onChange={agamaChangeHandler}>Kristen</option>
                <option onChange={agamaChangeHandler}>Katholik</option>
                <option onChange={agamaChangeHandler}>Hindu</option>
                <option onChange={agamaChangeHandler}>Buddha</option>
                <option onChange={agamaChangeHandler}>Konghuchu</option>
                <option onChange={agamaChangeHandler}>none</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-5 text-center">
              <div class="relative mt-3">
                <input
                  class="group peer hidden"
                  type="radio"
                  name="shippingOption"
                  value="Laki"
                  id="Laki"
                  onChange={genderChangeHandler}
                />

                <label
                  class=" relative block bg-white overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer rounded-lg border p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                  for="Laki"
                >
                  <span> Laki-Laki </span>
                </label>

                <svg
                  class="absolute top-3 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <div class="relative mt-3">
                <input
                  class="group peer hidden"
                  type="radio"
                  name="shippingOption"
                  value="Perempuan"
                  id="Perempuan"
                  onChange={genderChangeHandler}
                />

                <label
                  class=" relative block bg-white overflow-hidden rounded-md border border-gray-200 cursor-pointer rounded-lg p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                  for="Perempuan"
                >
                  <span> Perempuan </span>
                </label>

                <svg
                  class="absolute top-3 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Save
            </button>
          </form>
        </div>
      </div>{" "}
    </div>
  );
}
