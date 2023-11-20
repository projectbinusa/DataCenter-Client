import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import PageSidebar from "../../components/PageSidebar";
import { useNavigate, useParams } from "react-router-dom";
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
  const statusChangeHandler = (event) => {
    setStatus(event.target.value);
  };
 
  const submitActionHandler = async (event) => {
    event.preventDefault();
  
   
    try {
      await axios.put(`http://localhost:8080/api/sekolah/${sekolahId}`, {
        namaSekolah: namaSekolah,
        alamatSekolah: alamatSekolah,
        emailSekolah: emailSekolah,
        teleponSekolah: teleponSekolah,
        status: status,
        informasiSekolah: informasiSekolah,
      });
  
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Edit Success!!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setTimeout(() => {
           
          navigate("/info-sekolah");
        }, 1000)   });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Gagal Merubah Data ",
      });
    }
  };
  

  const batal = () => {
    Swal.fire({
      icon:"error",
      text:"Batal Mengubah Data",
      timer:1000,

    });
    setTimeout(() => {
           
      navigate("/info-sekolah");
    }, 1000)  
  };

  return (
    <div>
      <PageSidebar />
      <div className="p-4 sm:ml-64 mt-16">
        <div data-aos="fade-up">
          <section className="bg-gray-50 dark:bg-gray-800">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
              <p className="text-3xl font-medium justify-center text-center ">
                Update Data Sekolah
              </p>
              <form action="" onSubmit={submitActionHandler}>
                <div className="grid grid-cols-1 gap-5 text-center sm:grid-cols-2 p-5">
                  <div className="relative p-5">
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Nama Sekolah
                    </span>
                    <label
                      htmlFor="nama_sekolah"
                      className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        autoComplete="off"
                        type="text"
                        id="nama_sekolah"
                        placeholder="Nama Sekolah"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        value={namaSekolah}
                        onChange={nameChangeHandler}
                      />
                    </label>
                  </div>
                  <div className="relative p-5">
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Alamat Sekolah
                    </span>
                    <label
                      htmlFor="teleponSekoalah"
                      className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        autoComplete="off"
                        type="text"
                        id="alamat_sekolah"
                        placeholder="Telepon Sekolah"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        value={alamatSekolah}
                        onChange={alamatChangeHandler}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 text-center sm:grid-cols-2 p-5">
                  <div className="relative p-5">
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Email Sekolah
                    </span>
                    <label
                      htmlFor="informasisekolah"
                      className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        autoComplete="off"
                        type="text"
                        id="email"
                        placeholder="Email Sekolah"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        value={emailSekolah}
                        onChange={emailChangeHandler}
                      />
                    </label>
                  </div>
                  <div className="relative p-5">
                    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Telepon Sekolah
                    </span>
                    <label
                      htmlFor="teleponSekoalah"
                      className="relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        autoComplete="off"
                        type="number"
                        id="telepon_sekoalah"
                        placeholder="Telepon Sekolah"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        value={teleponSekolah}
                        onChange={teleponChangeHandler}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-1 text-center sm:grid-cols-1">
                  <div className="relative">
                    <div className="max-w-md mx-auto">
                      {" "}
                      {/* Center the container */}
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
                        onChange={informasiChangeHandler}
                        className="overflow-y-auto relative block bg-white overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        required
                        rows={12}
                      />
                      <p className="absolute text-xs"></p>
                    </div>
                  </div>
                </div>

 

                <div className="flex justify-between p-3 ">
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
          </section>
        </div>
      </div>
    </div>
  );
}
