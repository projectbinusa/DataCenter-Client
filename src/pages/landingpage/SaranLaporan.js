import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import Logo from "../../assets/logo.png";
import { Label, Textarea } from "flowbite-react";

export default function SaranLaporan() {
  const [email, setEmail] = useState("");
  const [laporan, setlaporan] = useState("");
  const form = useRef();

  const batal = () => {
    window.location.href = "/";
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ypgq52e",
        "template_0omakp4",
        form.current,
        "BA_w1mVa2FDtDhetB"
      )
      .then(
        (result) => {
          if (result) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Berhasil Dikirim",
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.href = "/Saran";
          }
        },
        (error) => {
          if (error) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Gagal Dikirim",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      );
  };
  return (
    <div className="bg-gray-900">
      <header>
        <nav className="border-gray-800 px-4 lg:px-6 py-2.5 bg-gray-800">
          <div className="flex items-center lg:order-2 md:flex justify-between flex-grow">
            <a href="/" className="flex items-center">
              <img
                src={Logo}
                className="mr-3 h-6 sm:h-9"
                alt="The Data Center"
              />
              <span className="self-center text-sm font-semibold whitespace-nowrap text-white">
                THE DATA CENTER
              </span>
            </a>

            <div className="flex items-center lg:order-2">
              <a
                href="/login"
                className=" text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Masuk
              </a>
              <a
                href="/registrasi"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Daftar
              </a>
            </div>
          </div>
        </nav>
      </header>
      <div className="bg-gray-900 min-h-screen">
        <div className="p-4 md:mx-20 sm:ml-64 mt-16 ">
          <div data-aos="fade-up">
            <div className="grid md:grid-cols-3 grid-cols-2 w-full bg-white rounded-t-lg py-3">
              <div className="col-span-2 md:order-first order-last">
                <h2 className="mt-5 md:text-4xl text-2xl font-extrabold text-black uppercase px-3">
                  Saran atau Laporan
                </h2>

              </div>
            </div>
          </div>
          <section className="bg-gray-800">
            <div className="py-8 px-4 mx-auto max-w-screen-xl">
              <div className=" mb-8 lg:mb-16">
                <div className="p-1">
                <form
                      ref={form}
                      onSubmit={sendEmail}
                      className="space-y-4 p-3"
                    >
                  <div className="relative">
                    <label htmlFor="tempatLahir">Kirim Ke</label>
                    <input
                      id="email_admin"
                      type="email"
                      name="email_from"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value="datacenter950@gmail.com"
                      disabled
                    />
                  </div>
                    <div className="relative mt-3">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-white "
                      >
                        Nama
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        name="user_name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Masukan Nama Anda"

                      />
                    </div>
                    <div className="relative mt-3">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-white "
                      >
                        Email
                      </label>
                      <input
                        autoComplete="off"
                        type="email"
                        name="email_user"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Masukan Email Anda"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  
                  <div className="relative mt-10">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white "
                    >
                      Saran atau Laporan
                    </label>
                    {" "}
                    <Textarea
                     name="message"
                      placeholder="Masukan Saran atau Laporan"
                      onChange={(e) => setlaporan(e)}
                      className="overflow-y-auto relative block bg-white text-dark overflow-hidden rounded-md border border-gray-200  px-3 pt-3 shadow-sm dark:bg-white  dark:text-dark"
                      required
                      rows={6}
                    />
                  </div>

                  <div className="flex justify-between p-5">
                    <button
                      type="button"
                      onClick={batal}
                      className="block w-24 rounded-lg text-white outline outline-[#555555] py-3 text-sm font-medium"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="block w-24 rounded-lg text-white outline outline-[#33cc33] py-3 text-sm font-medium"
                    >
                      Kirim
                    </button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>{" "}
      </div>
    </div>
  );
}