import React, { useState } from "react";
import PageSidebar from "../../components/PageSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function TableMurid() {
  const navigate = useNavigate();
  const [nama_murid, setNamaMurid] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [agama, setAgama] = useState("");
  const [umur, setUmur] = useState("");
  const [nama_ortu, setNamaOrtu] = useState("");
  const [gender, setGender] = useState("");
  const [kelas, setKelas] = useState("");
  const [no_telepon_ortu, setNoTeleponOrtu] = useState("");

  const addMurid = async (e) => {
    e.preventDefault();

    const add = {
      namaMurid: nama_murid,
      tempatLahir: tempat_lahir,
      tanggalLahir: tanggal_lahir,
      agama: agama,
      umur: umur,
      namaOrtu: nama_ortu,
      gender: gender,
      kelas: kelas,
      noTeleponOrtu: no_telepon_ortu,
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
  return (
    <>
      <PageSidebar />
      <div className="p-4 sm:ml-64 mt-14">
        <div className="border-2 rounded-xl shadow-md p-5 m-5 bg-transparent">
          {" "}
          <p className="text-3xl font-bold mb-5 text-center">Add Murid</p>
          <div className="p-5">
            <form onSubmit={addMurid}>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div className="relative">
                  <label
                    htmlFor="umur"
                    className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      type="text"
                      name="nama"
                      id="namamurid"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      value={nama_murid}
                      onChange={(e) => setNamaMurid(e.target.value)}
                      required
                    />
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Nama Murid
                    </span>
                  </label>
                </div>
                <div className="relative">
                  <label
                    htmlFor="umur"
                    className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      type="number"
                      name="umur"
                      id="umur"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={umur}
                      onChange={(e) => setUmur(e.target.value)}
                      required
                    />
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Umur
                    </span>
                  </label>
                </div>
              </div>
              <br />
              <div class="grid md:grid-cols-2 md:gap-6">
                <div className="relative">
                  <label
                    htmlFor="tempatlahir"
                    className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      type="text"
                      name="tempatlahir"
                      id="tempatlahir"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={tempat_lahir}
                      onChange={(e) => setTempatLahir(e.target.value)}
                      required
                    />
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Tempat Lahir
                    </span>
                  </label>
                </div>
                <div className="relative">
                  <label
                    htmlFor="tanggallahir"
                    className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      type="date"
                      name="tanggallahir"
                      id="tanggallahir"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      value={tanggal_lahir}
                      onChange={(e) => setTanggalLahir(e.target.value)}
                      required
                    />
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Tanggal Lahir
                    </span>
                  </label>
                </div>
              </div>
              <br />
              <div class="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
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

                <div className="relative z-0 w-full mb-6 group">
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
              <div class="grid md:grid-cols-2 md:gap-6">
                <div className="relative">
                  <label
                    htmlFor="namaortu"
                    className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      type="text"
                      name="namaortu"
                      id="namaortu"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      value={nama_ortu}
                      onChange={(e) => setNamaOrtu(e.target.value)}
                      required
                    />
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Nama Ortu
                    </span>
                  </label>
                </div>
                <div className="relative">
                  <label
                    htmlFor="noteleponortu"
                    className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      type="number"
                      name="noteleponortu"
                      id="noteleponortu"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      value={no_telepon_ortu}
                      onChange={(e) => setNoTeleponOrtu(e.target.value)}
                      required
                    />
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      No Telepon Ortu
                    </span>
                  </label>
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
      </div>
    </>
  );
}
