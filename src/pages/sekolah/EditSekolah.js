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
 

  const imageChangeHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  
  const submitActionHandler = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("namaSekolah", namaSekolah);
      formData.append("alamatSekolah", alamatSekolah);
      formData.append("emailSekolah", emailSekolah);
      formData.append("teleponSekolah", teleponSekolah);
      formData.append("status", status);
      formData.append("informasiSekolah", informasiSekolah);
      formData.append("image", image); // Append the selected file
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.put(`http://localhost:8080/api/sekolah/${sekolahId}`, formData ,config);
  
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Edit Success!!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setTimeout(() => {
          navigate("/info-sekolah");
        }, 1000);
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Gagal Merubah Data" + error,
      });
    }
  };
  

  const batal = () => {
    Swal.fire({
      icon: "error",
      text: "Batal Mengubah Data",
      timer: 1000,
    });
    setTimeout(() => {
      navigate("/info-sekolah");
    }, 1000);
  };

  return (
    <div>
      <PageSidebar />
      <div className="p-4 sm:ml-62 mt-16">
        <div data-aos="fade-up">
        <div className="mx-auto min-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 min-h-screen max-h-screen p-4 sm:ml-64">
          <div className="mx-auto max-w-3xl">
          <form
              action=""
              className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl form-add"
              onSubmit={submitActionHandler}
            >
              <center>

              <p className="text-3xl font-medium mb-7 object-obtain">Edit Sekolah</p>
              </center>

        
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="relative mt-3">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama Sekolah
                </label>
                <input
                  type="text"
                  id="name"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  placeholder="Nama Sekolah" 
                  value={namaSekolah}
                  onChange={(e) => nameChangeHandler(e)}
                  required
                />
              </div>

                <div className="relative">
                  <label
                    for="alamatSekolah"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                  Alamat Sekolah
                  </label>
                  <input
                    type="text"
                    id="alamatSekolah"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email Sekolah
                  </label>
                  <input
                    type="text"
                    id="emailSekolah"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Email Sekolah"
                    value={emailSekolah}
                    onChange={(e) => emailChangeHandler(e)}
                    required
                  />
                </div>
                <div className="relative">
                  <label
                    for="nomerSekolah"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
Nomer Sekolah                  </label>
                  <input
                    type="number"
                    id="nomerSekolah"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
Logo Sekolah                  </label>
                  <input
                    type="file"
                    id="image"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Logo Sekolah"
                    onChange={(e) =>  imageChangeHandler(e)}
                     
                  />
                </div>
                <div className="relative">
                  <label
                    for="status"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status  
                  </label>
                  <select
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
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
                        />
                      </div>
                      <Textarea
                        id="informasiSekolah"
                        placeholder="Leave a comment..."
                        value={informasiSekolah}
                        onChange={(e) =>  informasiChangeHandler(e)}
                        className="overflow-y-auto relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        required
                        rows={12}
                      />
                      <p className="absolute text-xs"></p>
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
      </div>
    </div>
  );
}
