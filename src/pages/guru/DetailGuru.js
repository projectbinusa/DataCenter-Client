// DetailGuru.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import PageSidebar from "../../components/PageSidebar";
import { useParams } from "react-router-dom";
import NoProfile from "../../assets/User.png";

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
  const [image, setImage] = useState("");

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
        setImage(dataGuru.image);
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
        <h1 className="text-center text-3xl font-semibold text-gray-900 mb-8">
          Informasi Detail Guru
        </h1>
        <div className="grid md:grid-cols-2 gap-3">
          <section className="bg-white p-8 shadow-md rounded-md mb-4 md:mb-0">
            <div className="flex items-center justify-center mb-6">
              <img
                src={image === null ? NoProfile : image}
                alt="Foto Profil"
                className="rounded-full w-40 h-40 object-cover"
              />
            </div>
            <div className="text-center pb-2">
              <p className="mt-1 text-md font-bold text-gray-900">{namaGuru}</p>
            </div>
            {tanggalLahir && (
              <div className="text-center pb-2">
                <p className="mt-1 text-md font-bold text-gray-900">
                  {tempatLahir}, {formatTanggal(tanggalLahir)}
                </p>
              </div>
            )}
          </section>
          <section className="bg-white p-8 shadow-md rounded-md">
            <div className="grid grid-cols-5 mb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2">
                Agama
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900">
                {agama}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2">
                Umur
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900">
                {umur}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2">
                Gender
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900">
                {gender}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2">
                No Telepon
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900">
                {noTelepon}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-2">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2">
                Gelar Pendidikan
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900">
                {gelarPendidikan}
              </p>
            </div>
            <div className="grid grid-cols-5">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2">
                Status Kawin
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900">
                {statusKawin}
              </p>
            </div>
            <div className="flex justify-end mt-7">
              <a href={`/edit-guru/${param.id}`}>
                <button
                  className="z-20 block rounded-full border-2 border-white bg-blue-100 p-2 text-blue-700 text-sm transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50"
                  type="button"
                >
                  Edit Data Guru
                </button>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
