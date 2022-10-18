import React, { useState } from "react";
import "../css/registrasi.css";
import logo from "../assets/dc-logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Registrasi() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [namaSekolah, setNamaSekolah] = useState("")
  const [alamatSekolah, setAlamatSekolah] = useState("")
  const [teleponSekolah, setTeleponSekolah] = useState("")

  const navigate = useNavigate()

  const register = async (e) => {
    e.preventDefault();
    
    const data = {
      email: email,
      password: password,
      namaSekolah: namaSekolah,
      alamatSekolah: alamatSekolah,
      teleponSekolah: teleponSekolah
    }    

    try {
      await axios.post("http://localhost:8080/api/register", data);
      Swal.fire({
        icon: 'success',
        title: 'Sukses!',
        text: 'Registrasi telah berhasil!',
      })
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <div className="sec-reg">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <div className="img-reg">
                <img
                  src={logo}
                  alt=""
                  style={{ width: "370px", height: "220px" }}
                />
              </div>
            </div>
            <div className="rounded-lg shadow-lg lg:col-span-3 lg:p-12 body-reg p-10">
              <form
                action=""
                className="mt-6 mb-0 space-y-4 mx-2"
                onSubmit={register}
              >
                <div className="pb-3">
                  <p className="text-2xl font-medium pb-2">Create A New Account</p>
                  <p className="text-sm">
                    fill the field in the bottom to registration
                  </p>
                </div>

                <div className="pb-1">
                  <div className="relative text-black">
                    <input
                      type="text"
                      id="nama-sekolah"
                      className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm"
                      placeholder="Nama Sekolah"
                      value={namaSekolah}
                      onChange={(e) => setNamaSekolah(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <div className="relative text-black">
                      <input
                        type="email"
                        id="email"
                        className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative text-black">
                      <input
                        type="password"
                        id="password"
                        className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative text-black">
                      <input
                        type="text"
                        id="alamat-sekolah"
                        className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm"
                        placeholder="Alamat Sekolah"
                        value={alamatSekolah}
                        onChange={(e) => setAlamatSekolah(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative text-black">
                      <input
                        type="number"
                        id="no-sekolah"
                        className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm"
                        placeholder="No. Telp Sekolah"
                        value={teleponSekolah} 
                        onChange={(e) => setTeleponSekolah(e.target.value)}
                      />
                    </div>
                  </div>

                </div>


                <div className="flex justify-center p-2">
                  <button
                    type="submit"
                    className="button-log block w-32 rounded-lg px-5 py-3 text-sm font-medium text-white"
                  >
                    Registrasi
                  </button>
                </div>

                <p className="text-center text-sm">
                  No account?
                  <a className="underline mx-1" href="/login">
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
