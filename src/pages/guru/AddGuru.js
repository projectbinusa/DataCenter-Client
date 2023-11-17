import React, { useState } from "react";
import PageSidebar from "../../components/PageSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function TableGuru() {
  const navigate = useNavigate();
  const [nama_guru, setNamaGuru] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [agama, setAgama] = useState("");
  const [umur, setUmur] = useState("");
  const [no_telepon, setNoTelepon] = useState("");
  const [gender, setGender] = useState("");
  const [gelar_pendidikan, setGelarPendidikan] = useState("");
  const [status_kawin, setStatusKawin] = useState("");

  const addGuru = async (e) => {
    e.preventDefault();

    const add = {
      namaGuru: nama_guru,
      tempatLahir: tempat_lahir,
      tanggalLahir: tanggal_lahir,
      agama: agama,
      umur: umur,
      noTelepon: no_telepon,
      gender: gender,
      gelarPendidikan: gelar_pendidikan,
      statusKawin: status_kawin,
    };

    try {
      await axios.post(
        `http://localhost:8080/api/guru/${localStorage.getItem(
          "sekolahId"
        )}/add-guru`,
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
        navigate("/table-guru");
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
    navigate("/table-guru");
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
              onSubmit={addGuru}
            >
              <p className="text-3xl font-medium mb-7">Add Guru</p>

              <div className="relative mt-3">
                <label
                  htmlFor="nama"
                  className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <input
                    autoComplete="off"
                    type="text"
                    id="nama"
                    placeholder="Nama Guru"
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    value={nama_guru}
                    onChange={(e) => setNamaGuru(e.target.value)}
                  />

                  <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                    Nama
                  </span>
                </label>
              </div>

              <div className="relative mt-3">
                <label
                  htmlFor="umur"
                  className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                  <input
                    autoComplete="off"
                    type="text"
                    id="umur"
                    placeholder="Umur"
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    value={umur}
                    onChange={(e) => setUmur(e.target.value)}
                  />

                  <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                    Umur
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-5 text-center sm:grid-cols-2">
                <div className="relative">
                  <label
                    htmlFor="tempatLahir"
                    className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      autoComplete="off"
                      type="text"
                      id="tempatLahir"
                      placeholder="Tempat Lahir"
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      value={tempat_lahir}
                      onChange={(e) => setTempatLahir(e.target.value)}
                    />

                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Tempat Lahir
                    </span>
                  </label>
                </div>
                <div className="relative">
                  <label
                    htmlFor="tanggalLahir"
                    className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      autoComplete="off"
                      type="date"
                      id="tanggalLahir"
                      placeholder="Tanggal Lahir"
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      value={tanggal_lahir}
                      onChange={(e) => setTanggalLahir(e.target.value)}
                    />

                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Tanggal Lahir
                    </span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 text-center sm:grid-cols-2">
                <div className="relative">
                  <label
                    htmlFor="notelepon"
                    className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <input
                      autoComplete="off"
                      type="text"
                      id="notelepon"
                      placeholder="No Telepon"
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      value={no_telepon}
                      onChange={(e) => setNoTelepon(e.target.value)}
                    />

                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      No Telepon
                    </span>
                  </label>
                </div>

                <div className="relative">
                  <label
                    htmlFor="gelar"
                    className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <select
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      id="gelar"
                      name="gelarPendidikan"
                      autoComplete="gelarPendidikan"
                      value={gelar_pendidikan}
                      onChange={(e) => setGelarPendidikan(e.target.value)}
                    >
                      <option value="" disabled>
                        Gelar Pendidikan
                      </option>
                      <option value="S.Ag">S.Ag</option>
                      <option value="S.Sos">S.Sos</option>
                      <option value="S.Ikom">S.Ikom</option>
                      <option value="S.Pd">S.Pd</option>
                      <option value="S.T">S.T</option>
                      <option value="S.Kom">S.Kom</option>
                      <option value="S.Si">S.Si</option>
                      <option value="S.Mat">S.Mat</option>
                      <option value="S.Pd.I">S.Pd.I</option>
                      <option value="S.S">S.S</option>
                      <option value="S.Sn">S.Sn</option>
                      {/* Add more options as needed */}
                    </select>
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Gelar Pendidikan
                    </span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 text-center sm:grid-cols-2">
                <div className="relative">
                  <label
                    htmlFor="statusKawin"
                    className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <select
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      id="statusKawin"
                      name="statusKawin"
                      autoComplete="statusKawin"
                      value={status_kawin}
                      onChange={(e) => setStatusKawin(e.target.value)}
                    >
                      <option value="" disabled>
                        Status Kawin
                      </option>
                      <option value="Belum Menikah">Belum Menikah</option>
                      <option value="Menikah">Menikah</option>
                      <option value="Cerai">Cerai</option>
                    </select>
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Status Kawin
                    </span>
                  </label>
                </div>

                <div className="relative">
                  <label
                    htmlFor="agama"
                    className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                  >
                    <select
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      id="agama"
                      name="agama"
                      autoComplete="agama-name"
                      onChange={(e) => setAgama(e.target.value)}
                    >
                      <option value="Agama" disabled>
                        Agama
                      </option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katholik">Katholik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Khonghucu">Khonghucu</option>
                      <option value="Non">Non</option>
                    </select>
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Agama
                    </span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 text-center">
                <div className="relative">
                  <input
                    autoComplete="off"
                    className="group peer hidden"
                    type="radio"
                    name="shippingOption"
                    value="Laki-Laki"
                    id="Laki"
                    onChange={(e) => setGender(e.target.value)}
                  />

                  <label
                    className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer rounded-lg border p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                    htmlFor="Laki"
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
                    className="group peer hidden"
                    type="radio"
                    name="shippingOption"
                    value="Perempuan"
                    id="Perempuan"
                    onChange={(e) => setGender(e.target.value)}
                  />

                  <label
                    className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 cursor-pointer rounded-lg p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                    htmlFor="Perempuan"
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
