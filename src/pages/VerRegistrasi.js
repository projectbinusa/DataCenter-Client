import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

export default function VerRegistrasi() {
  const [email, setEmail] = useState([]);
  const [modal, setModal] = useState(false);
  const form = useRef();

  const getAll = async () => {
    await axios.get(`http://localhost:8080/api/users`).then((res) => {
      setEmail(res.data);
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_xj8ktpc",
        "template_bg5lshe",
        form.current,
        "BA_w1mVa2FDtDhetB"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("send");
        },
        (error) => {
          console.log(error.text);
          console.log("eror");
        }
      );
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="flex my-20">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
            <div className="p-5 bg-white">
              <div className="flex justify-between">
                <div className="grid grid-cols-1 md:flex gap-3 mt-6">
                  <span className="floath-left text-white w-auto add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Verifikasi Sekolah
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => setModal(true)}
                    className="text-white  bg-blue-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                  >
                    Kirim Pemberitahuan
                  </button>
                </div>
              </div>
              <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 p-5">
                <table
                  className="min-w-full divide-gray-200 text-center p-5"
                  id="example"
                  data-aos="zoom-in"
                >
                  <thead className="th-add">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        No
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Nama Sekolah
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Email
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Status
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {email.map((val, idx) => {
                      if (val.role === 'admin') {
                      return (
                        <tr key={idx}>
                          <td className="border-blue-300 left-0 py-2">
                            {idx + 1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {val.email}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {val.email}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {val.status !== null &&
                            val.status === "Diterima" ? (
                              <>Diterima</>
                            ) : val.status === null ? (
                              <>Belum Diterima</>
                            ) : (
                              <>NonAktif</>
                            )}
                          </td>
                          <td className="whitespace-nowrap text-ceter py-2">
                            {val.status !== null &&
                            val.status === "Diterima" ? (
                              <button
                                className="text-white bg-gray-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                // onClick={() => handleStatusChange("Diterima")}
                              >
                                Non Aktifkan
                              </button>
                            ) : val.status === null ? (
                              <>
                                <button
                                  className="text-white bg-green-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                  // onClick={() => handleStatusChange("Diterima")}
                                >
                                  Terima
                                </button>
                                <button
                                  className="text-white bg-red-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                  // onClick={() => handleStatusChange("Ditolak")}
                                >
                                  Tolak
                                </button>
                              </>
                            ) : (
                              <button
                                className="text-white bg-purple-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                                // onClick={() => handleStatusChange("Diterima")}
                              >
                                Aktifkan
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                      
                    }else {
                      // If the role is not 'admin', return null or an empty fragment
                      return null;
                    }
                  })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
        {modal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-1 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Kirim Pemberitahuan
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 opacity-20 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setModal(false)}
                    >
                      <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative flex-auto">
                    <form
                      ref={form}
                      onSubmit={sendEmail}
                      className="space-y-4 p-3"
                    >
                      <div>
                        <div className="grid md:grid-cols-1 md:gap-6">
                          <div className="relative">
                            <label htmlFor="tempatLahir">Kirim Ke</label>
                            <input
                              type="email"
                              name="email_from"
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                              placeholder="Masukan Tempat Lahir Anda "
                              required
                            />
                          </div>
                          <div className="relative">
                            <label htmlFor="tanggalLahir">Isi Pesan</label>
                            <input
                              type="textarea"
                              name="message"
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-5 p-3 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-white bg-red-700 font-bold uppercase px-6 py-3.5 rounded-md text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setModal(false)}
                        >
                          Batal
                        </button>
                        <button
                          className="bg-gradient-to-r from-[#0b409c] to-[#10316b] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Kirim
                        </button>
                      </div>
                    </form>
                  </div>
                  {/*footer*/}
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
}
