import React, { useEffect, useState } from "react";
import axios from "axios";
import PageSidebar from "../../components/PageSidebar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Label, Textarea } from "flowbite-react";

export default function EditSekolah() {
  const userId = localStorage.getItem("userId");
  const sekolahId = localStorage.getItem("sekolahId");
  const [namaSekolah, setNamaSekolah] = useState("");
  const [informasiSekolah, setInformasiSekolah] = useState("");
  const [emailSekolah, setEmailSekolah] = useState("");
  const [alamatSekolah, setAlamatSekolah] = useState("");
  const [teleponSekolah, setTeleponSekolah] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [sekolah, setSekolah] = useState({
    namaSekolah: "",
    alamatSekolah: "",
    emailSekolah: "",
    teleponSekolah: "",
    status: "",
    informasiSekolah: "",
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/${userId}/sekolah`)
      .then((response) => {
        const dataSekolah = response.data;
        setNamaSekolah(dataSekolah.namaSekolah);
        setInformasiSekolah(dataSekolah.informasiSekolah);
        setEmailSekolah(dataSekolah.emailSekolah);
        setAlamatSekolah(dataSekolah.alamatSekolah);
        setTeleponSekolah(dataSekolah.teleponSekolah);
        setStatus(dataSekolah.status);
        setImage(dataSekolah.image);
      })
      .catch((error) => {
        Swal.fire({
          icon: "warning",
          text: "Gagal Mengambil Data",
        });
      });
  }, [userId]);

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

  const handleImageChange = (event) => {
    setSekolah({
      ...sekolah,
      image: event.target.files[0],
    });
  };
  const submitActionHandler = async (event) => {
    event.preventDefault();

    await axios
      .put(`http://localhost:8080/api/sekolah/${sekolahId} `, {
        namaSekolah: namaSekolah,
        alamatSekolah: alamatSekolah,
        emailSekolah: emailSekolah,
        teleponSekolah: teleponSekolah,
        status: status,
        informasiSekolah: informasiSekolah,
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Success!!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = "/info-sekolah";
      })
      .catch((error) => {
        Swal.fire({
            position:"center",
            icon:"warning",
            title:"Gagal Merubah Data "  ,

        })
      });
  };
  
  const batal = () => {
    Swal.fire({
      icon: "error",
      text: "Batal Mengubah Data",
      timer: 1000,
    });
    setTimeout(() => {
      window.location.href = "/info-sekolah";
    }, 1000);
  };

  return (
    <div>
      <PageSidebar />
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

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="relative mt-3">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                >
                  Nama Sekolah
                </label>
                <input
                  type="text"
                  id="name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nama Sekolah"
                  value={namaSekolah}
                  onChange={(e) => nameChangeHandler(e)}
                  required
                />
              </div>

              <div className="relative">
                <label
                  for="alamatSekolah"
                  class="block mb-3  text-sm font-medium text-gray-900 dark:text-dark"
                >
                  <p className="p-1">Alamat Sekolah</p>
                </label>
                <input
                  type="text"
                  id="alamatSekolah"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Alamat Sekolah"
                  value={alamatSekolah}
                  onChange={(e) => alamatChangeHandler(e)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="relative">
                <label
                  for="emailSekolah"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                >
                  Email Sekolah
                </label>
                <input
                  type="text"
                  id="emailSekolah"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Email Sekolah"
                  value={emailSekolah}
                  onChange={(e) => emailChangeHandler(e)}
                  required
                />
              </div>
              <div className="relative">
                <label
                  for="nomerSekolah"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                >
                  Nomer Sekolah{" "}
                </label>
                <input
                  type="number"
                  id="nomerSekolah"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nomer Sekolah"
                  value={teleponSekolah}
                  onChange={(e) => teleponChangeHandler(e)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="relative">
                <label
                  for="image"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                >
                  Logo Sekolah{" "}
                </label>
                <input
                  type="file"
                  id="image"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Logo Sekolah"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="relative">
                <label
                  for="status"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                >
                  Status
                </label>
                <select
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            <div className="grid grid-cols-1 gap-1  text-center sm:grid-cols-1">
              <div className="relative">
                <div className="max-w-md mx-auto">
                  {" "}
                  <div className="mb-2 block">
                    <Label
                      htmlFor="informasiSekolah"
                      value="Informasi Sekolah"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                    />
                  </div>
                  <Textarea
                    id="informasiSekolah"
                    placeholder="Tinggalakan Informasi..."
                    value={informasiSekolah}
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
