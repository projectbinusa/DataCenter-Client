import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import PageSidebar from "../../components/PageSidebar";
import "../../style/edit.css";

export default function AddMurid() {
  const navigate = useNavigate();
  const [namaMurid, setNamaMurid] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [agama, setAgama] = useState("");
  const [umur, setUmur] = useState("");
  const [namaOrtu, setNamaOrtu] = useState("");
  const [gender, setGender] = useState("");
  const [kelas, setKelas] = useState("");
  const [noTeleponOrtu, setNoTeleponOrtu] = useState("");

  const addMurid = async (e) => {
    e.preventDefault();

    const add = {
      namaMurid,
      tempatLahir,
      tanggalLahir,
      agama,
      umur,
      namaOrtu,
      gender,
      kelas,
      noTeleponOrtu,
    };

    try {
      await axios.post(
        `http://localhost:8080/api/sekolah/${localStorage.getItem(
          "sekolahId"
        )}/add-siswa`,
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
        navigate("/table");
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

  const batal = () => {
    navigate("/table");
  };
  const hitungUmur = (tanggalLahir) => {
    const today = new Date();
    const birthDate = new Date(tanggalLahir);
    let umur = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      umur--;
    }

    return umur;
  };
  return (
    <>
      <PageSidebar />
      <div className="p-4 sm:ml-64 mt-14">
        <div className="mx-auto max-w-screen-xl">
          <form
            className="mt-10 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add"
            onSubmit={addMurid}
          >
            <p className="text-center text-3xl font-medium mb-7">Add Murid</p>
            <div className="relative">
              <label htmlFor="namaMurid">Nama Murid:</label>
              <input
                id="namaMurid"
                type="text"
                className="w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
                placeholder="Masukan Nama Anda "
                value={namaMurid}
                onChange={(e) => setNamaMurid(e.target.value)}
              />
            </div>

            <div class="grid md:grid-cols-2 md:gap-6">
              <div className="relative">
                <label htmlFor="tempatLahir">Tempat Lahir:</label>
                <input
                  type="text"
                  name="tempatlahir"
                  id="tempatlahir"
                  className="w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
                  placeholder="Masukan Tempat Lahir Anda "
                  value={tempatLahir}
                  onChange={(e) => setTempatLahir(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="tanggalLahir">Tanggal Lahir:</label>
                <input
                  type="date"
                  name="tanggallahir"
                  id="tanggallahir"
                  className="w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
                  onChange={(e) => {
                    setTanggalLahir(e.target.value);
                    const age = hitungUmur(e.target.value);
                    setUmur(age);
                  }}
                  required
                />
              </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div className="relative">
                <label htmlFor="namaOrtu">Nama Ortu:</label>
                <input
                  type="text"
                  name="namaortu"
                  id="namaortu"
                  className="w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
                  placeholder="Masukan Nama Ortu Anda "
                  value={namaOrtu}
                  onChange={(e) => setNamaOrtu(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="noTeleponOrtu">No Telepon Ortu:</label>
                <input
                  type="number"
                  name="noteleponortu"
                  id="noteleponortu"
                  className="w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1"
                  placeholder="Masukan No Telepon Ortu Anda "
                  value={noTeleponOrtu}
                  onChange={(e) => setNoTeleponOrtu(e.target.value)}
                  required
                />
              </div>
            </div>
            <div class="grid md:grid-cols-2 md:gap-6">
              <div className="relative">
                <label htmlFor="agama">Agama:</label>
                <select
                  className="relative w-full border-gray-200 p-3 text-sm focus:z-10 block bg-white overflow-hidden rounded-md border  shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  value={agama}
                  onChange={(e) => setAgama(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Pilih Agama
                  </option>
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katholik">Katholik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Khonghucu">Khonghucu</option>
                </select>
                {/* Add label for Agama if needed */}
              </div>

              <div className="relative">
                <label htmlFor="kelas">Kelas:</label>
                <select
                  className="relative w-full border-gray-200 p-3 text-sm focus:z-10 block bg-white overflow-hidden rounded-md border  shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Pilih Kelas
                  </option>
                  <option value="X">X</option>
                  <option value="XI">XI</option>
                  <option value="XII">XII</option>
                </select>
                {/* Add label for Kelas if needed */}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 text-center">
              <div className="relative">
                <input
                  autoComplete="off"
                  className="group peer sr-only"
                  type="radio"
                  id="laki-laki"
                  name="gender"
                  value="Laki-Laki"
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                <label
                  htmlFor="laki-laki"
                  className="relative block bg-white overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer rounded-lg border p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
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
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div className="relative">
                <input
                  autoComplete="off"
                  className="group peer sr-only"
                  type="radio"
                  id="perempuan"
                  name="gender"
                  value="Perempuan"
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                <label
                  htmlFor="perempuan"
                  className="relative block bg-white overflow-hidden rounded-md border border-gray-200 cursor-pointer rounded-lg p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
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
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <br />

            <div className="flex justify-between">
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
    </>
  );
}
