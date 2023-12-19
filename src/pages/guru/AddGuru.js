import React, { useEffect, useState } from "react";
import PageSidebar from "../../components/PageSidebar";
import axios from "axios";
import Swal from "sweetalert2";

export default function TableGuru() {
  const [nama_guru, setNamaGuru] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [agama, setAgama] = useState("");
  const [no_telepon, setNoTelepon] = useState("");
  const [gender, setGender] = useState("");
  const [gelar_pendidikan, setGelarPendidikan] = useState("");
  const [status_kawin, setStatusKawin] = useState("");
  const [gelar_option, setGelarOption] = useState([]);

  const addGuru = async (e) => {
    e.preventDefault();

    const add = {
      namaGuru: nama_guru,
      tempatLahir: tempat_lahir,
      tanggalLahir: tanggal_lahir,
      agama: agama,
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
        window.location.href = "/table-guru";
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
  const getAll = async () => {
    await axios
      .get(
        "http://localhost:8080/api/gelarPendidikan/" +
          localStorage.getItem("sekolahId") +
          "/gelarPendidikan"
      )
      .then((res) => {
        setGelarOption(res.data);
      });
  };
  const batal = () => {
    window.location.href = "/table-guru";
  };
  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <div>
        <PageSidebar />
        <div className="p-4 sm:ml-64 mt-14">
          <div className="mx-auto max-w-screen-xl">
            <form
              className="mt-10 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add"
              onSubmit={addGuru}
            >
              <p className="text-center text-3xl font-medium mb-7">
                Tambah Guru
              </p>

              <div className="relative mt-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Masukan Nama Guru"
                  value={nama_guru}
                  onChange={(e) => setNamaGuru(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    id="tempatlahir"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukan Tempat Lahir"
                    value={tempat_lahir}
                    onChange={(e) => setTempatLahir(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    id="tanggallahir"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Tanggal Lahir"
                    value={tanggal_lahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    No Telepon
                  </label>
                  <input
                    type="text"
                    id="notelepon"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Masukan No Telepon"
                    value={no_telepon}
                    onChange={(e) => setNoTelepon(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Gelar Pendidikan
                  </label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    id="gelarPendidikan"
                    value={gelar_pendidikan}
                    onChange={(e) => setGelarPendidikan(e.target.value)}
                  >
                    <option value="" disabled>
                      Gelar Pendidikan
                    </option>
                    {gelar_option.map((val, i) => {
                      // Tambahkan kondisi untuk memeriksa status aktif atau non-aktif
                      if (val.status === "Aktif") {
                        return (
                          <option key={i} value={val.namaGelar}>
                            {val.namaGelar}
                          </option>
                        );
                      }
                      return null; // Tidak menambahkan opsi jika status non-aktif
                    })}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Status Kawin
                  </label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Agama
                  </label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                <label className="block mb-2 text-sm font-medium text-gray-900  text-left col-span-2">
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

                  <label className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer rounded-lg border p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500">
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

                  <label className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 cursor-pointer rounded-lg p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500">
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
