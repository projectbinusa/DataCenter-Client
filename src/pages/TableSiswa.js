import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import NavComp from "../components/NavComp";
import Chart from "react-apexcharts";
import "../style/table.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export default function Table() {
  const [siswa, setSiswa] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [namaSiswa, setNamaSiswa] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [gender, setGender] = useState("");
  const [excel, setExcel] = useState("");
  const [agama, setAgama] = useState();
  const [modal, setModal] = useState(false);
  const [state, setState] = useState({
    options: {
      labels: ["Perempuan", "Laki-laki"],
      colors: ["lightpink", "lightblue"],
    },
    series: [0, 0],
  });

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

  const [religi, setReligi] = useState({
    options: {
      labels: [
        "Islam",
        "Kristen",
        "Katholik",
        "Hindu",
        "Buddha",
        "Khonghucu",
        "Non",
      ],
      colors: [
        "#00ff00",
        "#b50595",
        "#9c9c9c",
        "#ff1500",
        "#0015ff",
        "#fffb03",
        "#000000",
      ],
    },
    series: [0, 0, 0, 0, 0, 0, 0],
  });

  const data = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/sekolah/" +
          localStorage.getItem("sekolahId") +
          "/siswa"
      );
      setSiswa(response.data);
      const totalPerempuan = response.data.filter(
        (x) => x.gender === "Perempuan"
      ).length;
      setState({
        ...state,
        series: [totalPerempuan, response.data.length - totalPerempuan],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const dta = async () => {
    try {
      const respon = await axios.get(
        "http://localhost:8080/api/sekolah/" +
          localStorage.getItem("sekolahId") +
          "/siswa"
      );
      setSiswa(respon.data);
      const islam = respon.data.filter((r) => r.agama === "Islam").length;
      const kristen = respon.data.filter((r) => r.agama === "Kristen").length;
      const katholik = respon.data.filter((r) => r.agama === "Katholik").length;
      const hindu = respon.data.filter((r) => r.agama === "Hindu").length;
      const buddha = respon.data.filter((r) => r.agama === "Buddha").length;
      const khonghucu = respon.data.filter(
        (r) => r.agama === "Khonghucu"
      ).length;
      const non = respon.data.filter((r) => r.agama === "Non").length;
      setReligi({
        ...religi,
        series: [islam, kristen, katholik, hindu, buddha, khonghucu, non],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    data();
    dta();
  }, []);

  const addSiswa = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      await Swal.fire({
        title: "Yakin Ingin Menambahkan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "tambahkan",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(
            `http://localhost:8080/api/sekolah/${localStorage.getItem(
              "sekolahId"
            )}/add-siswa`,
            {
              namaSiswa: namaSiswa,
              tanggalLahir: tanggalLahir,
              tempatLahir: tempatLahir,
              agama: agama,
              gender: gender,
            }
          );
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Berhasil Menambahkan!",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getAll = async () => {
    await axios
      .get(
        "http://localhost:8080/api/sekolah/" +
          localStorage.getItem("sekolahId") +
          "/siswa"
      )
      .then((res) => {
        setSiswa(res.data);
      });
  };

  const deleteSiswa = async (id) => {
    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data siswa ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8080/api/siswa/" + id).then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Berhasil Menghapus!!",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        });
      }
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  const download = async () => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, download it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          url:
            "http://localhost:8080/api/excel/download/" +
            localStorage.getItem("sekolahId"),
          method: "GET",
          responseType: "blob",
        }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "data-siswa.xlsx");
          document.body.appendChild(fileLink);

          fileLink.click();
        });
        Swal.fire("Download!", "Your file has been download.", "success");
      }
    });
  };

  const downloadFormat = async () => {
    await Swal.fire({
      title: "Yakin ingin mendownload?",
      text: "Ini adalah file format excel untuk mengimport data siswa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0b409c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, download!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          url: "http://localhost:8080/api/excel/download/",
          method: "GET",
          responseType: "blob",
        }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "format-excel.xlsx");
          document.body.appendChild(fileLink);

          fileLink.click();
        });
        Swal.fire("Download!", "File berhasil di download.", "success");
      }
    });
  };

  const importExcel = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", excel);

    await axios
      .post(
        "http://localhost:8080/api/excel/upload/user/" +
          localStorage.getItem("sekolahId"),
        formData
      )
      .then(() => {
        Swal.fire("Sukses!", " berhasil ditambahkan.", "success");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const male = {
    backgroundColor: "lightblue",
  };
  const female = {
    backgroundColor: "lightpink",
  };

  return (
    <>
      <NavComp />
      <div className="">
            <div className="flex justify-center gap-x-14 my-10">
              <div className="pie rounded-2xl p-1 shadow-xl">
                <div className="rounded-xl bg-white p-1">
                  <div className="pie rounded-xl p-1">
                    <p className="text-white text-2xl">Gender</p>
                  </div>
                  <div className="m-5">
                    <Chart
                      options={state.options}
                      series={state.series}
                      type="pie"
                      width="380"
                      className="text-left"
                    />
                  </div>
                </div>
              </div>
              <div className="pie rounded-2xl p-1 shadow-xl">
                <div className="rounded-xl bg-white p-1">
                  <div className="pie rounded-xl p-1">
                    <p className="text-white text-2xl">Agama</p>
                  </div>
                  <div className="m-5">
                    <Chart
                      options={religi.options}
                      series={religi.series}
                      type="pie"
                      width="380"
                      className="text-left"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-2 rounded-xl shadow-md p-5 m-5">
              <div className="p-5">
                <div className="tombol flex justify-center gap-3 mt-6">
                  <button
                    className="text-white add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    Tambah Data Siswa
                  </button>

                  <button
                    className="text-white add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModal(true)}
                  >
                    Import Data
                  </button>
                  <button
                    className="text-white add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={download}
                  >
                    Download Data
                  </button>
                </div>
              </div>
              <div className="p-5 pt-1">
                <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 p-5">
                  <table
                    className="min-w-full divide-gray-200 text-center p-5"
                    id="example"
                  >
                    <thead className="th-add">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          No
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          Nama Siswa
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          Tempat Lahir
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          Tanggal Lahir
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          Agama
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          Gender
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {siswa.map((val, idx) => {
                        return (
                          <tr key={idx}>
                            <td className="sticky border-blue-300 left-0 py-2">
                              {idx + 1}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {val.namaSiswa}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {val.tempatLahir}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {val.tanggalLahir}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2">
                              <strong className="rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700">
                                {val.agama}
                              </strong>
                            </td>
                            <td className="whitespace-nowrap px-4 py-2">
                              <strong
                                className="rounded px-3 py-1.5 text-xs font-medium"
                                style={
                                  val.gender === "Laki-Laki" ? male : female
                                }
                              >
                                {val.gender}
                              </strong>
                            </td>
                            <td className="whitespace-nowrap text-ceter py-2">
                              <div className="flex items-center -space-x-4 hover:space-x-1">
                                <a href={"/edit-siswa/" + val.id}>
                                  <button
                                    className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50"
                                    type="button"
                                  >
                                    <svg
                                      className="h-4 w-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                      />
                                    </svg>
                                  </button>
                                </a>
                                <button
                                  className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                                  type="button"
                                  onClick={() => deleteSiswa(val.id)}
                                >
                                  <svg
                                    className="h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {/* {siswa.map((data, idx) => (
                                ))} */}
                    </tbody>
                  </table>
                </div>
                {showModal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-1 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                              Tambah Siswa
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 opacity-5 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}
                            >
                              <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            <form
                              action=""
                              className="space-y-4"
                              onSubmit={addSiswa}
                            >
                              <div>
                                <label className="sr-only" for="name">
                                  Nama
                                </label>
                                <input
                                  className="w-full rounded-lg border p-3 text-sm"
                                  placeholder="Nama Siswa"
                                  type="text"
                                  id="name"
                                  value={namaSiswa}
                                  onChange={(e) => setNamaSiswa(e.target.value)}
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                  <label className="sr-only">
                                    Tempat Lahir
                                  </label>
                                  <input
                                    className="w-full rounded-lg border p-3 text-sm"
                                    placeholder="Tempat Lahir"
                                    type="text"
                                    required
                                    value={tempatLahir}
                                    onChange={(e) =>
                                      setTempatLahir(e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="sr-only" for="phone">
                                    Tanggal Lahir
                                  </label>
                                  <input
                                    className="w-full rounded-lg border p-3 text-sm"
                                    type="date"
                                    value={tanggalLahir}
                                    onChange={(e) =>
                                      setTanggalLahir(e.target.value)
                                    }
                                    required
                                  />
                                </div>
                              </div>
                              <div>
                                <select
                                  className="relative w-full rounded-lg border p-2.5 text-sm focus:z-10"
                                  aria-label="agama"
                                  onChange={(e) => setAgama(e.target.value)}
                                  value={agama}
                                >
                                  <option selected disabled>
                                    Agama
                                  </option>
                                  <option value="Islam">Islam</option>
                                  <option value="Kristen">Kristen</option>
                                  <option value="Katholik">Katholik</option>
                                  <option value="Hindu">Hindu</option>
                                  <option value="Buddha">Buddha</option>
                                  <option value="Khonghucu">Khonghucu</option>
                                  <option value="Non">Non</option>
                                </select>
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                <div className="relative">
                                  <input
                                    className="group peer hidden"
                                    type="radio"
                                    name="shippingOption"
                                    id="next_day_alt"
                                    value="Laki-Laki"
                                    onChange={(e) => setGender(e.target.value)}
                                  />
                                  <label
                                    className="block cursor-pointer rounded-lg bg-blue border border-gray-100 p-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                    for="next_day_alt"
                                  >
                                    <span> Laki-Laki </span>
                                  </label>
                                  <svg
                                    className="absolute top-4 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div className="relative">
                                  <input
                                    className="group peer hidden"
                                    type="radio"
                                    name="shippingOption"
                                    id="perempuan"
                                    value="Perempuan"
                                    onChange={(e) => setGender(e.target.value)}
                                  />
                                  <label
                                    className="block cursor-pointer rounded-lg bg-blue border border-gray-100 p-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                    for="perempuan"
                                  >
                                    <span> Perempuan </span>
                                  </label>
                                  <svg
                                    className="absolute top-4 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex items-center gap-5 justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                  className="text-white bg-red-700 font-bold uppercase px-6 py-3 rounded-md text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setShowModal(false)}
                                >
                                  Batal
                                </button>
                                <button
                                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="submit"
                                >
                                  Tambahkan
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

                {modal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-1 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                              Import Data
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
                              action=""
                              className="space-y-4 p-3"
                              onSubmit={importExcel}
                            >
                              <div>
                                <p className="m-5 text-lg font-medium">
                                  download file dibawah untuk menginput data
                                  siswa anda. (format sudah tertulis)
                                </p>
                                <button
                                  className="text-white add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={downloadFormat}
                                >
                                  Download File
                                </button>
                              </div>
                              <div className="py-3">
                                <p className="m-5 text-lg font-medium">
                                  jika sudah menginputkan data siswa ke dalam
                                  file yang sudah anda download tadi,
                                  selanjutnya bisa anda importkan dengan menekan
                                  tombol dibawah:
                                </p>
                                <input
                                  type="file"
                                  accept=".xlsx"
                                  onChange={(e) => setExcel(e.target.files[0])}
                                  className="border-2 rounded-md p-3"
                                />
                              </div>
                              <div className="flex items-center justify-end gap-5 p-3 border-t border-solid border-slate-200 rounded-b">
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
                                  Import
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
            </div>
      </div>
    </>
  );
}
