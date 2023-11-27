// DetailGuru.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import PageSidebar from "../../components/PageSidebar";
import { useParams } from "react-router-dom";
import defaultProfilePicture from "../../assets/User.png";

export default function DetailMurid() {
  const param = useParams();
  const [namaMurid, setNamaMurid] = useState("");
  const [extrakulikuler, setExtrakulikuler] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [agama, setAgama] = useState("");
  const [umur, setUmur] = useState("");
  const [gender, setGender] = useState("");
  const [namaOrtu, setNamaOrtu] = useState("");
  const [noTeleponOrtu, setNoTeleponOrtu] = useState("");
  const [kelas, setKelas] = useState("");
  //   const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/siswa/${param.id}`)
      .then((response) => {
        const dataSiswa = response.data;
        setNamaMurid(dataSiswa.namaMurid);
        setExtrakulikuler(dataSiswa.extrakulikuler);
        setTempatLahir(dataSiswa.tempatLahir);
        setTanggalLahir(dataSiswa.tanggalLahir);
        setGender(dataSiswa.gender);
        setAgama(dataSiswa.agama);
        setUmur(dataSiswa.umur);
        setNamaOrtu(dataSiswa.namaOrtu);
        setNoTeleponOrtu(dataSiswa.noTeleponOrtu);
        setKelas(dataSiswa.kelas);
      })
      .catch((error) => {
        alert("Terjadi kesalahan Sir! " + error);
      });
  }, [param.id]);
  function formatTanggal(tanggal) {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const formattedDate = new Date(tanggal);

    return formattedDate.toLocaleDateString("id-ID", options);
  }
  return (
    <>
      <PageSidebar />
      <div className="mx-auto min-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 min-h-screen max-h-screen mt-16 p-4 sm:ml-64">
        <div className="mx-auto max-w-3xl flex items-center space-x-4">
          {/* Left Card - Foto Profil */}
          <div className="bg-white p-8 shadow-md rounded-md w-1/3 h-[317px]">
            <div className="flex items-center justify-center mb-6">
              <img
                src={defaultProfilePicture}
                alt="Profile"
                className="rounded-full w-40 h-40 object-cover"
              />
            </div>
            <div className=" text-center pb-2">
              <p className="mt-1 text-md font-bold text-gray-900">
                {namaMurid}
              </p>
            </div>

            <div className=" text-center pb-2">
              <p className="mt-1 text-md font-bold text-gray-900">
                {tempatLahir}, {formatTanggal(tanggalLahir)}
              </p>
            </div>
          </div>
          {/* Right Card - Detail Murid */}
          <div className="bg-white p-8 shadow-md rounded-md w-2/3">
            <div className="flex items-center border-b border-gray-200 pb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 w-1/3">
                Agama
              </label>
              <p className="mt-1 text-md font-bold text-gray-900">{agama}</p>
            </div>

            <div className="flex items-center border-b border-gray-200 pb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 w-1/3">
                Gender
              </label>
              <p className="mt-1 text-md font-bold text-gray-900">{gender}</p>
            </div>

           <div className="flex items-center border-b border-gray-200 pb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 w-1/3">
                Umur
              </label>
              <p className="mt-1 text-md font-bold text-gray-900">{umur}</p>
            </div>
           <div className="flex items-center border-b border-gray-200 pb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 w-1/3">
                Kelas
              </label>
              <p className="mt-1 text-md font-bold text-gray-900">{kelas}</p>
            </div>
           <div className="flex items-center border-b border-gray-200 pb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 w-1/3">
                Extrakulikuler
              </label>
              <p className="mt-1 text-md font-bold text-gray-900">{extrakulikuler}</p>
            </div>
           <div className="flex items-center border-b border-gray-200 pb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 w-1/3">
                Nama Ortu
              </label>
              <p className="mt-1 text-md font-bold text-gray-900">{namaOrtu}</p>
            </div>

           <div className="flex items-center border-b border-gray-200 pb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 w-1/3">
                No Telepon Ortu
              </label>
              <p className="mt-1 text-md font-bold text-gray-900">
                {noTeleponOrtu}
              </p>
            </div>

            <div className="flex justify-end">
              <a href={`/edit-siswa/${param.id}`}>
                <button
                  className="z-20 block rounded-full border-2 border-white bg-blue-100 p-2 text-blue-700 text-sm transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50"
                  type="button"
                >
                  Edit Data Murid
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
