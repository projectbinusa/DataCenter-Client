// DetailGuru.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import PageSidebar from "../../components/PageSidebar";
import { useParams } from "react-router-dom";
import defaultProfilePicture from "../../assets/User.png";

export default function DetailGuru() {
  const param = useParams();
  const [namaGuru, setNamaGuru] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [agama, setAgama] = useState("");
  const [umur, setUmur] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [gender, setGender] = useState("");
  const [gelarPendidikan, setGelarPendidikan] = useState("");
  const [statusKawin, setStatusKawin] = useState("");

  //   const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);

  const hitungUmur = (tanggalLahir) => {
    const today = new Date();
    const birthDate = new Date(tanggalLahir);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/guru/${param.id}`)
      .then((response) => {
        const dataGuru = response.data;
        setNamaGuru(dataGuru.namaGuru);
        setTempatLahir(dataGuru.tempatLahir);
        setTanggalLahir(dataGuru.tanggalLahir);
        setGender(dataGuru.gender);
        setAgama(dataGuru.agama);
        setUmur(hitungUmur(dataGuru.tanggalLahir));
        setNoTelepon(dataGuru.noTelepon);
        setGelarPendidikan(dataGuru.gelarPendidikan);
        setStatusKawin(dataGuru.statusKawin);
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
          <div className="bg-white p-8 shadow-md rounded-md w-1/3 h-[300px]">
            <div className="flex items-center justify-center mb-6">
              <img
                src={defaultProfilePicture}
                alt="Profile"
                className="rounded-full w-40 h-40 object-cover"
              />
            </div>
            <div className=" text-center pb-2">
              <p className="mt-1 text-md font-bold text-gray-900">{namaGuru}</p>
            </div>

            <div className=" text-center pb-2">
              {tanggalLahir && (
                <p className="mt-1 text-md font-bold text-gray-900">
                  {tempatLahir}, {formatTanggal(tanggalLahir)}
                </p>
              )}
            </div>
          </div>
          {/* Right Card - Detail Guru */}
          <div className="bg-white p-8 shadow-md rounded-md w-2/3">
            <div className="flex items-center border-b border-gray-200 pb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 w-1/3">
                Agama
              </label>
              <p className="flex-1 text-md font-bold text-gray-900">{agama}</p>
            </div>

            <div className="flex items-center border-b border-gray-200 pb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 w-1/3">
                Umur
              </label>
              <p className="flex-1 text-md font-bold text-gray-900">{umur}</p>
            </div>

            <div className="flex items-center border-b border-gray-200 pb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 w-1/3">
                Gender
              </label>
              <p className="flex-1 text-md font-bold text-gray-900">{gender}</p>
            </div>

            <div className="flex items-center border-b border-gray-200 pb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 w-1/3">
                No Telepon
              </label>
              <p className="flex-1 text-md font-bold text-gray-900">
                {noTelepon}
              </p>
            </div>

            <div className="flex items-center border-b border-gray-200 pb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 w-1/3">
                Gelar Pendidikan
              </label>
              <p className="flex-1 text-md font-bold text-gray-900">
                {gelarPendidikan}
              </p>
            </div>

            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 pr-2 w-1/3">
                Status Kawin
              </label>
              <p className="flex-1 text-md font-bold text-gray-900">
                {statusKawin}
              </p>
            </div>
            <div className="flex justify-end">
              <a href={`/edit-guru/${param.id}`}>
                <button
                  className="z-20 block rounded-full border-2 border-white bg-blue-100 p-2 text-blue-700 text-sm transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50"
                  type="button"
                >
                  Edit Data Guru
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
