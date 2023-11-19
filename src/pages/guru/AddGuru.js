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
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Nama"
                  value={nama_guru}
                  onChange={(e) => setNamaGuru(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="relative">
                  <label
                    for="tempatlahir"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    id="tempatlahir"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Tempat Lahir"
                    value={tempat_lahir}
                    onChange={(e) => setTempatLahir(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <label
                    for="tanggallahir"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    id="tanggallahir"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Tanggal Lahir"
                    value={tanggal_lahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="relative">
                  <label
                    for="notelepon"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    No Telepon
                  </label>
                  <input
                    type="text"
                    id="notelepon"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="No Telepon"
                    value={no_telepon}
                    onChange={(e) => setNoTelepon(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <label
                    for="gelarPendidikan"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gelar Pendidikan
                  </label>
                  <select
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    id="gelarPendidikan"
                    value={gelar_pendidikan}
                    onChange={(e) => setGelarPendidikan(e.target.value)}
                    required
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
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="relative">
                  <label
                    for="statusKawin"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status Kawin
                  </label>
                  <select
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    id="statusKawin"
                    name="statusKawin"
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
                </div>

                <div className="relative">
                  <label
                    for="agama"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Agama
                  </label>
                  <select
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    id="agama"
                    name="agama"
                    value={agama}
                    onChange={(e) => setAgama(e.target.value)}
                  >
                    <option value="" disabled>
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
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 text-center">
                <label
                  for="gender"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left col-span-2"
                >
                  Gender
                </label>
                <div className="relative mt-[-20px]">
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

                <div className="relative mt-[-20px]">
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
