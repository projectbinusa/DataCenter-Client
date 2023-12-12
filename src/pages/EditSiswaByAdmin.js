import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/edit.css";
import Sidebar from "../components/Sidebar";


export default function EditGuru() {
  const param = useParams();
  const [namaMurid, setNamaMurid] = useState("");
  const [extrakulikuler, setExtrakulikuler] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [agama, setAgama] = useState("");
  const [umur, setUmur] = useState("");
  const [noTeleponOrtu, setNoTeleponOrtu] = useState("");
  const [gender, setGender] = useState("");
  const [namaOrtu, setNamaOrtu] = useState("");
  const [kelas, setKelas] = useState("");
  const [kelas_option, setKelasOption] = useState([]); 
  const [extra_option, setExtraOption] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/siswa/" + param.id)
      .then((response) => {
        const dataSiswa = response.data;
        setNamaMurid(dataSiswa.namaMurid);
        setExtrakulikuler(dataSiswa.extrakulikuler);
        setUmur(dataSiswa.umur);
        setTempatLahir(dataSiswa.tempatLahir);
        setTanggalLahir(dataSiswa.tanggalLahir);
        setKelas(dataSiswa.kelas);
        setAgama(dataSiswa.agama);
        setNamaOrtu(dataSiswa.namaOrtu);
        setNoTeleponOrtu(dataSiswa.noTeleponOrtu);
        setGender(dataSiswa.gender);
      })
      .catch((error) => {
        alert("Terjadi kesalahan Sir! " + error);
      });
  }, []);

  const nameChangeHandler = (event) => {
    setNamaMurid(event.target.value);
  };
  const extraChangeHandler = (event) => {
    setExtrakulikuler(event.target.value);
  };
  const umurChangeHandler = (event) => {
    setUmur(event.target.value);
  };
  const tempatChangeHandler = (event) => {
    setTempatLahir(event.target.value);
  };
  const tanggalChangeHandler = (event) => {
    setTanggalLahir(event.target.value);
    const umur = hitungUmur(event.target.value); // Menghitung umur
    setUmur(umur.toString()); // Memperbarui state umur
  };
  const kelasChangeHandler = (event) => {
    setKelas(event.target.value);
  };
  const agamaChangeHandler = (event) => {
    setAgama(event.target.value);
  };
  const noChangeHandler = (event) => {
    setNoTeleponOrtu(event.target.value);
  };
  const ortuChangeHandler = (event) => {
    setNamaOrtu(event.target.value);
  };
  const genderChangeHandler = (event) => {
    setGender(event.target.value);
  };
  const submitActionHandler = async (event) => {
    event.preventDefault();

    await axios
      .put("http://localhost:8080/api/siswa/" + param.id, {
        namaMurid: namaMurid,
        extrakulikuler: extrakulikuler,
        tempatLahir: tempatLahir,
        tanggalLahir: tanggalLahir,
        agama: agama,
        umur: umur,
        noTeleponOrtu: noTeleponOrtu,
        gender: gender,
        namaOrtu: namaOrtu,
        kelas: kelas,
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Success!!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/table");
      })
      .catch((error) => {
        alert("Terjadi kesalahan: " + error);
      });
  };
  const getAllKelas = async () => { 
    await axios 
      .get( 
        "http://localhost:8080/api/kelas/" + 
        param.id  + 
          "/kelas" 
      ) 
      .then((res) => { 
        setKelasOption(res.data); 
      }); 
  }; 
 
  const getAllExtra = async () => { 
    await axios 
      .get( 
        "http://localhost:8080/api/extra/" + 
        param.id + 
          "/extra" 
      ) 
      .then((res) => { 
        setExtraOption(res.data); 
      }); 
  };
  const batal = () => {
    window.location.href = "/table-siswa";
  };
  useEffect(() => {
    getAllKelas(); 
    getAllExtra();
  }, []);
  // Fungsi untuk menghitung umur dari tanggal lahir
  const hitungUmur = (tanggalLahir) => {
    const dateOfBirth = new Date(tanggalLahir);
    const today = new Date();

    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
    ) {
      age--;
    }

    return age;
  };
  return (
    <>
      <div>
        <Sidebar />
        <div className="p-4 sm:ml-64 mt-14">
          <div className="mx-auto max-w-screen-xl">
            <form
              className="mt-10 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add"
              onSubmit={submitActionHandler}
            >
              <p className="text-center text-3xl font-medium mb-7">
                Edit Murid
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="namaMurid">Nama Murid:</label>
                <input
                  id="namaMurid"
                  type="text"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  value={namaMurid}
                  onChange={nameChangeHandler}
                />
              </div>
              <div className="relative">
                <label htmlFor="extrakulikuler">Extrakulikuler:</label>
                <select
                    id="agama"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={extrakulikuler}
                    onChange={extraChangeHandler}
                  >
                <option value="" disabled>
                    Pilih Extrakulikuler
                    </option>
                    {extra_option.map((val, i) => {
                      // Tambahkan kondisi untuk memeriksa status aktif atau non-aktif
                      if (val.status === "Aktif") {
                        return (
                          <option key={i} value={val.namaExtra}>
                            {val.namaExtra}
                          </option>
                        );
                      }
                      return null; // Tidak menambahkan opsi jika status non-aktif
                    })}
                  </select>
              </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="tempatLahir">Tempat Lahir:</label>
                  <input
                    id="tempatLahir"
                    type="text"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={tempatLahir}
                    onChange={tempatChangeHandler}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="tanggalLahir">Tanggal Lahir:</label>
                  <input
                    id="tanggalLahir"
                    type="date"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={tanggalLahir}
                    onChange={tanggalChangeHandler}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="namaOrtu">Nama Ortu:</label>
                  <input
                    id="namaOrtu"
                    type="text"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={namaOrtu}
                    onChange={ortuChangeHandler}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="noTeleponOrtu">No Telepon Ortu:</label>
                  <input
                    id="noTeleponOrtu"
                    type="text"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={noTeleponOrtu}
                    onChange={noChangeHandler}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="agama">Agama:</label>
                  <select
                    id="agama"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={agama}
                    onChange={agamaChangeHandler}
                  >
                    <option value="Agama" disabled>
                      Agama
                    </option>
                    <option onChange={agamaChangeHandler}>Islam</option>
                    <option onChange={agamaChangeHandler}>Kristen</option>
                    <option onChange={agamaChangeHandler}>Katholik</option>
                    <option onChange={agamaChangeHandler}>Hindu</option>
                    <option onChange={agamaChangeHandler}>Buddha</option>
                    <option onChange={agamaChangeHandler}>Khonghucu</option>
                  </select>
                </div>

                <div className="relative">
                  <label htmlFor="kelas">Kelas:</label>
                  <select
                    id="kelas"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={kelas}
                    onChange={kelasChangeHandler}
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
                    onChange={genderChangeHandler}
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
                    onChange={genderChangeHandler}
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