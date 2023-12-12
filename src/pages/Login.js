import React, { useState } from "react";
import "../style/login.css";
import logo from "../assets/dc-logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const { data, status } = await axios.post(
        "http://localhost:8080/api/login",
        {
          email: email,
          password: password,
        }
      );

      if (data.role === "admin") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("sekolahId", data.id);
        localStorage.setItem("kelasId", data.id);
        localStorage.setItem("gelarPendidikanId", data.id);
        localStorage.setItem("extraId", data.id);
        if (status === "Diterima") {
          Swal.fire({
            icon: "success",
            title: "Berhasil masuk",
           });
          navigate("/dash");
        } else {
          Swal.fire({
            icon: "success",
            title: "Berhasil masuk",
           });
          navigate("/dash");
        }
      } else if (data.role === "super admin") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("sekolahId", data.id);
        localStorage.setItem("kelasId", data.id);
        localStorage.setItem("gelarPendidikanId", data.id);
        localStorage.setItem("extraId", data.id);
        Swal.fire({
          icon: "success",
          title: "Berhasil masuk",
         });
        navigate("/dashboard");
      
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Email atau Password yang Anda masukan salah atau belum dikonfirmasi .",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="sec-log">
      <div className="mx-auto max-w-screen-xl px-4 py-1 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <div className="flex justify-center">
            <img
              src={logo}
              alt=""
              className="w-[270px] h-[165px] md:w-[370px] md:h-[225px]"
            />
          </div>
          <div className="body-log">
            <form
              action=""
              className="mt-6 mb-0 space-y-4 rounded-lg p-8 mx-3 shadow-2xl"
              onSubmit={login}
            >
              <div className="pb-3">
                <p className="text-3xl font-bold pb-2 text-center">
                  Login  
                </p>
                <p className="text-lg text-center" style={{ color: "#718096" }}>
                  Masukkan email dan kata sandi Anda
                </p>
              </div>

              <div className="p-1">
                <div className="relative mt-1 text-black">
                  <input
                    autoComplete="off"
                    type="email"
                    id="email"
                    className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-1 relative">
                <div className="relative mt-1 text-black">
                  <input
                    autoComplete="off"
                    type={passwordType}
                    className="w-full rounded-lg border-gray-200 py-4 px-3 text-sm shadow-sm pr-12"
                    placeholder="Kata Sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  >
                    {passwordType === "password" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-eye-slash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-center p-2">
                <button
                  type="submit"
                  className="button-log block w-32 rounded-lg px-5 py-3 text-sm font-medium text-white"
                >
                  Masuk
                </button>
              </div>

              <p className="text-center text-sm">
                Tidak punya akun?
                <a className="underline mx-1" href="/registrasi">
                  Daftar
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
