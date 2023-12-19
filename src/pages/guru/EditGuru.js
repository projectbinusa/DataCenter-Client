import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../../style/edit.css";
import PageSidebar from "../../components/PageSidebar";

export default function EditGuru() {
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
  const [gelar_option, setGelarOption] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/guru/" + param.id)
      .then((response) => {
        const dataGuru = response.data;
        setNamaGuru(dataGuru.namaGuru);
        setTempatLahir(dataGuru.tempatLahir);
        setTanggalLahir(dataGuru.tanggalLahir);
        setGender(dataGuru.gender);
        setAgama(dataGuru.agama);
        setUmur(dataGuru.umur);
        setNoTelepon(dataGuru.noTelepon);
        setGelarPendidikan(dataGuru.gelarPendidikan);
        setStatusKawin(dataGuru.statusKawin);
        setImage(dataGuru.image);
      })
      .catch((error) => {
        alert("Terjadi kesalahan Sir! " + error);
      });
  }, []);

  const nameChangeHandler = (event) => {
    setNamaGuru(event.target.value);
  };

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
  const umurChangeHandler = (event) => {
    setUmur(event.target.value);
  };
  const noChangeHandler = (event) => {
    setNoTelepon(event.target.value);
  };
  const gelarChangeHandler = (event) => {
    setGelarPendidikan(event.target.value);
  };
  const statusChangeHandler = (event) => {
    setStatusKawin(event.target.value);
  };
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];

    if (!imageFile.type.match("image.*")) {
      Swal.fire({
        icon: "warning",
        text: "Format gambar tidak didukung",
      });
      return;
    }

    if (imageFile.size > 1000000) {
      Swal.fire({
        icon: "warning",
        text: "Ukuran gambar terlalu besar",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    let timerInterval;

    Swal.fire({
      title: "Sedang Mengupload File",
      icon: "Loading",
      timer: 2000,
      timerProgressBar: true,

      willClose: () => {
        clearInterval(timerInterval);
      },
    });

    axios
      .put(`http://localhost:8080/api/guru/${param.id}/upload-image`, formData)
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Gambar berhasil diupload",
        });
        setImage(URL.createObjectURL(imageFile));
      })
      .catch((error) => {
        Swal.fire({
          icon: "warning",
          text: "Gagal mengupload gambar",
        });
      });
  };

  const submitActionHandler = async (event) => {
    event.preventDefault();

    await axios
      .put("http://localhost:8080/api/guru/" + param.id, {
        namaGuru: namaGuru,
        tempatLahir: tempatLahir,
        tanggalLahir: tanggalLahir,
        agama: agama,
        umur: umur,
        noTelepon: noTelepon,
        gender: gender,
        gelarPendidikan: gelarPendidikan,
        statusKawin: statusKawin,
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Success!!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = "/table-guru";
      })
      .catch((error) => {
        alert("Terjadi kesalahan: " + error);
      });
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
              onSubmit={submitActionHandler}
            >
              <p className="text-center text-3xl font-medium mb-7">Edit Guru</p>

              <div className="relative mt-3">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Nama"
                  value={namaGuru}
                  onChange={nameChangeHandler}
                  required
                />
              </div>
              <div className="relative mt-3">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Foto Guru
                </label>
                <input
                  type="file"
                  id="image"
                  placeholder="Foto Guru"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ width: "80%" }}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="relative">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    id="tempatlahir"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Tempat Lahir"
                    value={tempatLahir}
                    onChange={tempatChangeHandler}
                    required
                  />
                </div>

                <div className="relative">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    id="tanggallahir"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Tanggal Lahir"
                    value={tanggalLahir}
                    onChange={tanggalChangeHandler}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="relative">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    No Telepon
                  </label>
                  <input
                    type="text"
                    id="notelepon"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="No Telepon"
                    value={noTelepon}
                    onChange={noChangeHandler}
                    required
                  />
                </div>

                <div className="relative">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Gelar Pendidikan
                  </label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    id="gelar"
                    name="gelarPendidikan"
                    value={gelarPendidikan}
                    onChange={gelarChangeHandler}
                    required
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
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Status Kawin
                  </label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    id="statusKawin"
                    name="statusKawin"
                    value={statusKawin}
                    onChange={statusChangeHandler}
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Agama
                  </label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    id="agama"
                    name="agama"
                    autoComplete="agama-name"
                    value={agama}
                    onChange={agamaChangeHandler}
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
                  className="block mb-2 text-sm font-medium text-gray-900  text-left col-span-2"
                >
                  Gender
                </label>
                <div className="relative mt-[-20px]">
                  <input
                    autoComplete="off"
                    className="group peer hidden "
                    type="radio"
                    name="shippingOption"
                    value="Laki-Laki"
                    id="Laki"
                    onChange={genderChangeHandler}
                  />

                  <label
                    className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer rounded-lg border p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
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
                    onChange={genderChangeHandler}
                  />

                  <label
                    className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 cursor-pointer rounded-lg p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
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
