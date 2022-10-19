import axios from "axios";
import React, { useEffect, useState } from "react";
import NavComp from "../components/NavComp";
import "../style/table.css";

export default function TableDinas() {
  const [siswa, setSiswa] = useState([]);
  const [search, setSearch] = useState("");

  const getAllSiswa = async () => {
    await axios
      .get("http://localhost:8080/api/siswa")
      .then((res) => {
        setSiswa(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllSiswa();
  });

  return (
    <>
      <NavComp />
      <div>
        <div className="m-5">
          <div className="border rounded-lg p-3 mb-3 judul-dinas">
            <p className="text-2xl font-medium">
              Data Sekolah Menengah Pertama di Kota Semarang
            </p>
          </div>
          <div className="border shadow-sm rounded-lg p-5">
          <div className="pb-5">
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Cari..."
                  className="w-full rounded-md border-2 p-3 py-2.5 pr-10 hover:shadow-lg shadow-md light:text-white sm:text-sm"
                  onChange={(e) => {setSearch(e.target.value)}}
                />
                <span className="absolute border-sky-200 inset-y-0 right-0 grid w-10 place-content-center ">
                  <button type="button" className="rounded-full p-0.5">
                    <span className="sr-only">Submit</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
            <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 shadow-md">
              <table className="min-w-full divide-gray-200 text-center">
                <thead className="th-add">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      Nama Siswa
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      Tempat Tanggal Lahir
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      Agama
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      Gender
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                      Sekolah
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {siswa
                    .filter((sis) => {
                      if (search === "") {
                        return sis;
                      } else if (
                        sis.namaSiswa
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      )
                        return sis;
                    })
                    .map((sis, key) => {
                      return (
                        <tr key={key}>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {sis.namaSiswa}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {sis.tempatLahir}, {sis.tanggalLahir}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2">
                            {sis.agama}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2">
                            {sis.gender}
                          </td>
                          <td className="whitespace-nowrap text-ceter py-2">
                            {sis.user.namaSekolah}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
