import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavComp from '../components/NavComp';
import Swal from "sweetalert2"
import "../style/edit.css"

export default function EditSiswa() {
  const param = useParams();
  const [namaSiswa, setNamaSiswa] = useState("")
  const [tempatLahir, setTempatLahir] = useState("")
  const [tanggalLahir, setTanggalLahir] = useState("")
  const [gender, setGender] = useState("")
  const [agama, setAgama] = useState("")

  const navigate = useNavigate()


  useEffect(() => {
    axios.get("http://localhost:8080/api/siswa/" + param.id).then((response) => {
      const dataSiswa = response.data;
      setNamaSiswa(dataSiswa.namaSiswa);
      setTempatLahir(dataSiswa.tempatLahir);
      setTanggalLahir(dataSiswa.tanggalLahir);
      setGender(dataSiswa.gender);
      setAgama(dataSiswa.agama);
    }).catch(error => {
      alert("Terjadi kesalahan Sir! " + error);
    });
  }, []);

  const nameChangeHandler = (event) => {
    setNamaSiswa(event.target.value);
  }

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

    await axios.put("http://localhost:8080/api/siswa/" + param.id, {
      namaSiswa: namaSiswa,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      gender: gender,
      agama: agama
    }).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Edit Success!!',
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/table")
    }).catch(error => {
      alert("Terjadi kesalahan: " + error);
    })
  };



  return (
    <div>
      <div className="sticky top-0">
        <NavComp />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <form onSubmit={submitActionHandler}
            action=""
            className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add"
          >
            <p className="text-2xl font-medium">Edit User</p>

            <div className="relative mt-1">
              <label
                for="nama"
                className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              >
                <input
                  value={namaSiswa}
                  onChange={nameChangeHandler}
                  type="text"
                  id="nama"
                  placeholder="Nama"
                  className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                  Nama
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
              <div className="relative mt-1">
                <label
                  for="tempatLahir"
                  className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <input
                    value={tempatLahir}
                    onChange={tempatChangeHandler}
                    type="text"
                    id="tempatLahir"
                    placeholder="Tempat Lahir"
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                    Tempat Lahir
                  </span>
                </label>
              </div>
              <div className="relative mt-1">
                <label
                  for="tanggalLahir"
                  className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <input
                    value={tanggalLahir}
                    onChange={tanggalChangeHandler}
                    type="text"
                    id="tanggalLahir"
                    placeholder="Tanggal Lahir"
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  />

                  <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                    Tanggal Lahir
                  </span>
                </label>
              </div>
            </div>

            <div className="relative mt-1">
              <label className="sr-only" for="agama">
                Agama
              </label>

              <select
                className="relative w-full rounded-t-lg border-gray-200 p-2.5 text-sm focus:z-10"
                aria-label='agama'
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

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="relative">
                <input
                  className="group peer hidden"
                  type="radio"
                  name="shippingOption"
                  value="Laki-Laki"
                  id="Laki-Laki"
                  onChange={genderChangeHandler}
                />

                <label
                  className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer rounded-lg border p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                  for="Laki-Laki"
                >
                  <span> Laki-Laki </span>
                </label>

                <svg
                  className="absolute top-3 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100"
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

              <div className="relative">
                <input
                  className="group peer hidden"
                  type="radio"
                  name="shippingOption"
                  value="Perempuan"
                  id="Perempuan"
                  onChange={genderChangeHandler}
                />

                <label
                  className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 cursor-pointer rounded-lg p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                  for="Perempuan"
                >
                  <span> Perempuan </span>
                </label>

                <svg
                  className="absolute top-3 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100"
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
            <div className="flex mt-2 justify-between">
           
              <a
              className="group relative inline-block text-sm font-medium text-red-600 focus:outline-none focus:ring active:text-red-500"
              href="/table"
            >
              <span className="absolute inset-0 border border-current"></span>
              <span
                className="block border border-current bg-white px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
              >
                Batal
              </span>
            </a>
            <button className="button-edit" type="submit">
                <a
                  className="group relative inline-block text-sm font-medium text-red-600 focus:outline-none focus:ring active:text-red-500"
                  
                >
                  <span className="absolute inset-0 border border-current"></span>
                  <span
                    className="block border border-current bg-white px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
                  >
                    Simpan
                  </span>
                </a>
              </button>
            </div>
         
          </form>
        </div>
      </div>
    </div>
  )
}

