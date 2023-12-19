import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

export default function AddMurid() {
  const param = useParams();
  const [namaMurid, setNamaMurid] = useState("");
  const [extrakulikuler, setExtrakulikuler] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [agama, setAgama] = useState("");
  const [umur, setUmur] = useState("");
  const [namaOrtu, setNamaOrtu] = useState("");
  const [gender, setGender] = useState("");
  const [kelas, setKelas] = useState("");
  const [noTeleponOrtu, setNoTeleponOrtu] = useState("");
  const [kelas_option, setKelasOption] = useState([]);
  const [extra_option, setExtraOption] = useState([]);

  const addMurid = async (e) => {
    e.preventDefault();

    const add = {
      namaMurid,
      extrakulikuler,
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
        `http://localhost:8080/api/sekolah/${param.id}/add-siswa`,
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
        window.location.href = "/murid/" + param.id;
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
    window.location.href = "/table/" + param.id;
  };
  useEffect(() => {
    const getAllKelas = async () => {
      await axios
        .get("http://localhost:8080/api/kelas/" + param.id + "/kelas")
        .then((res) => {
          setKelasOption(res.data);
        });
    };
    getAllKelas();
  }, [param.id]);

  useEffect(() => {
    const getAllExtra = async () => {
      await axios
        .get("http://localhost:8080/api/extra/" + param.id + "/extra")
        .then((res) => {
          setExtraOption(res.data);
        });
    };
    getAllExtra();
  }, [param.id]);

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
      <div>
        <Sidebar />
        <div className="p-4 sm:ml-64 mt-14">
          <div className="mx-auto max-w-screen-xl">
            <form
              className="mt-10 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add"
              onSubmit={addMurid}
            >
              <p className="text-center text-3xl font-medium mb-7">
                Tambah Murid
              </p>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative">
                  <label>Nama Murid:</label>
                  <input
                    id="namaMurid"
                    type="text"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukan Nama Anda "
                    value={namaMurid}
                    onChange={(e) => setNamaMurid(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <label>Extrakulikuler:</label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={extrakulikuler}
                    onChange={(e) => setExtrakulikuler(e.target.value)}
                  >
                    <option value="" disabled>
                      Pilih Extrakulikuler
                    </option>
                    {extra_option.map((val, index) => {
                      if (val.status === "Aktif") {
                        return (
                          <option key={index} value={val.namaExtra}>
                            {val.namaExtra}
                          </option>
                        );
                      }
                      return null;
                    })}
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative">
                  <label>Tempat Lahir:</label>
                  <input
                    type="text"
                    name="tempatlahir"
                    id="tempatlahir"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukan Tempat Lahir Anda "
                    value={tempatLahir}
                    onChange={(e) => setTempatLahir(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <label>Tanggal Lahir:</label>
                  <input
                    type="date"
                    name="tanggallahir"
                    id="tanggallahir"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    onChange={(e) => {
                      setTanggalLahir(e.target.value);
                      const age = hitungUmur(e.target.value);
                      setUmur(age);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative">
                  <label>Nama Ortu:</label>
                  <input
                    type="text"
                    name="namaortu"
                    id="namaortu"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukan Nama Ortu Anda "
                    value={namaOrtu}
                    onChange={(e) => setNamaOrtu(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <label>No Telepon Ortu:</label>
                  <input
                    type="number"
                    name="noteleponortu"
                    id="noteleponortu"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukan No Telepon Ortu Anda "
                    value={noTeleponOrtu}
                    onChange={(e) => setNoTeleponOrtu(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative">
                  <label>Agama:</label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                  <label>Kelas:</label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                  >
                    <option value="" disabled>
                      Pilih Kelas
                    </option>
                    {kelas_option.map((val, index) => {
                      if (val.status === "Aktif") {
                        return (
                          <option key={index} value={val.namaKelas}>
                            {val.namaKelas}
                          </option>
                        );
                      }
                      return null;
                    })}
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
                  <label className="relative block bg-white overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer rounded-lg border p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500">
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
                  <label className="relative block bg-white overflow-hidden rounded-md border border-gray-200 cursor-pointer rounded-lg p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500">
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
