import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Label, Textarea } from "flowbite-react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";

export default function EditSekolah() {
  const param = useParams();
  const [namaSekolah, setNamaSekolah] = useState("");
  const [informasiSekolah, setInformasiSekolah] = useState("");
  const [emailSekolah, setEmailSekolah] = useState("");
  const [alamatSekolah, setAlamatSekolah] = useState("");
  const [teleponSekolah, setTeleponSekolah] = useState("");
  const [akreditasiSekolah, setAkreditasiSekolah] = useState("");
  const [misi, setMisi] = useState("");
  const [visi, setVisi] = useState("");
  const [status, setStatus] = useState("");
  const [setImage] = "";

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/${param.id_user}/sekolah`)
      .then((response) => {
        const dataSekolah = response.data;
        setNamaSekolah(dataSekolah.namaSekolah);
        setInformasiSekolah(dataSekolah.informasiSekolah);
        setEmailSekolah(dataSekolah.emailSekolah);
        setAlamatSekolah(dataSekolah.alamatSekolah);
        setTeleponSekolah(dataSekolah.teleponSekolah);
        setStatus(dataSekolah.status);
        setAkreditasiSekolah(dataSekolah.akreditasiSekolah);
        setMisi(dataSekolah.misi);
        setVisi(dataSekolah.visi);
        setImage(dataSekolah.image);
      })
      .catch((error) => {
        Swal.fire({
          icon: "warning",
          text: "Gagal Mengambil Data",
        });
      });
  }, [param.id_user]);

  const nameChangeHandler = (event) => {
    setNamaSekolah(event.target.value);
  };
  const informasiChangeHandler = (event) => {
    setInformasiSekolah(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmailSekolah(event.target.value);
  };
  const alamatChangeHandler = (event) => {
    setAlamatSekolah(event.target.value);
  };
  const teleponChangeHandler = (event) => {
    setTeleponSekolah(event.target.value);
  };
  const statusChange = (event) => {
    setStatus(event.target.value);
  };
  const akreditasiCHange = (event) => {
    setAkreditasiSekolah(event.target.value);
  };
  const MisiChange = (event) => {
    setMisi(event.target.value);
  };
  const VisiChange = (event) => {
    setVisi(event.target.value);
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
      .put(
        `http://localhost:8080/api/sekolah/${param.id_sekolah}/upload-image`,
        formData
      )
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
      .put(`http://localhost:8080/api/sekolah/${param.id_sekolah} `, {
        namaSekolah: namaSekolah,
        alamatSekolah: alamatSekolah,
        emailSekolah: emailSekolah,
        teleponSekolah: teleponSekolah,
        status: status,
        informasiSekolah: informasiSekolah,
        akreditasiSekolah: akreditasiSekolah,
        misi: misi,
        visi: visi,
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Success!!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = "/info-sekolah/" + param.id_sekolah;
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Gagal Merubah Data ",
        });
      });
  };

  const batal = () => {
    window.location.href = "/info-sekolah/" + param.id_sekolah;
  };

  return (
    <div>
      <Sidebar />
      {/* isi */}
      <div className="p-4 sm:ml-64 mt-12">
        <div className="mx-auto max-w-screen-xl">
          <form
            className="mt-10 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add"
            onSubmit={submitActionHandler}
          >
            <center>
              <p className="text-3xl font-medium mb-7 object-obtain">
                Edit Sekolah
              </p>
            </center>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                  Logo Sekolah
                </label>
                <input
                  type="file"
                  id="image"
                  placeholder="Logo Sekolah"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ width: "80%" }}
                />
                <span className="block text-gray-600 text-xs p-3 dark:text-gray-600 ">
                  *file akan di upload terlebih dahulu{" "}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="relative mt-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                  Nama Sekolah
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nama Sekolah"
                  value={namaSekolah}
                  onChange={(e) => nameChangeHandler(e)}
                  required
                />
              </div>

              <div className="relative">
                <label className="block mb-3  text-sm font-medium text-gray-900 dark:text-dark">
                  <p className="p-1">Alamat Sekolah</p>
                </label>
                <input
                  type="text"
                  id="alamatSekolah"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Alamat Sekolah"
                  value={alamatSekolah}
                  onChange={(e) => alamatChangeHandler(e)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="relative mt-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                  Akreditasi Sekolah
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="   Akreditasi Sekolah"
                  value={akreditasiSekolah}
                  onChange={(e) => akreditasiCHange(e)}
                  required
                />
              </div>

              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                  Status
                </label>
                <select
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  id="status"
                  name="status"
                  value={status}
                  onChange={(e) => statusChange(e)}
                >
                  <option value="" disabled>
                    Status
                  </option>
                  <option value="Negeri">Negeri</option>
                  <option value="Swasta">Swasta</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                  Email Sekolah
                </label>
                <input
                  type="text"
                  id="emailSekolah"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Email Sekolah"
                  value={emailSekolah}
                  onChange={(e) => emailChangeHandler(e)}
                  required
                />
              </div>
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">
                  Nomer Sekolah{" "}
                </label>
                <input
                  type="number"
                  id="nomerSekolah"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nomer Sekolah"
                  value={teleponSekolah}
                  onChange={(e) => teleponChangeHandler(e)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 p-2">
              <div className="relative">
                <div className="max-w-md mx-auto">
                  {" "}
                  <div className="mb-2 block">
                    <Label
                      value="Misi Sekolah"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                    />
                  </div>
                  <Textarea
                    id="misiSekolah"
                    placeholder=" "
                    value={misi === null ? "Belum Mengisi Misi Sekolah" : misi}
                    onChange={(e) => MisiChange(e)}
                    className="overflow-y-auto relative block bg-white text-dark overflow-hidden rounded-md border border-gray-200  px-3 pt-3 shadow-sm dark:bg-white  dark:text-dark"
                    required
                    rows={12}
                  />
                </div>
              </div>
              <div className="relative">
                <div className="max-w-md mx-auto">
                  {" "}
                  <div className="mb-2 block">
                    <Label
                      value="Visi Sekolah"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                    />
                  </div>
                  <Textarea
                    id="visi"
                    placeholder="Visi Sekolah"
                    value={visi === null ? "Belum Mengisi Visi Sekolah " : visi}
                    onChange={(e) => VisiChange(e)}
                    className="overflow-y-auto relative block bg-white text-dark overflow-hidden rounded-md border border-gray-200  px-3 pt-3 shadow-sm dark:bg-white  dark:text-dark"
                    required
                    rows={12}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-1 p-2">
              <div className="relative">
                <div className="max-w-md mx-auto">
                  {" "}
                  <div className="mb-2 block">
                    <Label
                      value="Informasi Sekolah"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                    />
                  </div>
                  <Textarea
                    id="informasiSekolah"
                    placeholder="Tinggalakan Informasi..."
                    value={
                      informasiSekolah === null
                        ? "Belum Mengisi Informasi "
                        : informasiSekolah
                    }
                    onChange={(e) => informasiChangeHandler(e)}
                    className="overflow-y-auto relative block bg-white text-dark overflow-hidden rounded-md border border-gray-200  px-3 pt-3 shadow-sm dark:bg-white  dark:text-dark"
                    required
                    rows={12}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between p-5">
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
  );
}
