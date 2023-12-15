import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { useNavigate, useParams } from "react-router-dom";
import "../style/table.css";
import $ from "jquery";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

export default function MuridById() {
  const param = useParams();
  const [namaSekolah, setNamaSekolah] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [namaMurid, setNamaMurid] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [agama, setAgama] = useState("");
  const [gender, setGender] = useState("");
  const [excel, setExcel] = useState("");
  const [isChecked, setIsChecked] = useState("");

  const navigate = useNavigate();

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
            `http://localhost:8080/api/sekolah/${param.id}/add-siswa`,
            {
              namaMurid: namaMurid,
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

  const deleteSiswa = async (id) => {
    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data siswa ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
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

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

  const [state, setState] = useState({
    options: {
      labels: ["Perempuan", "Laki-laki"],
      colors: ["lightpink", "lightblue"],
    },
    series: [0, 0],
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
        "#007bff", // Blue
        "#3399ff", // Light Blue
        "#0056b3", // Dark Blue
        "#66a3ff", // Sky Blue
        "#003366", // Navy Blue
        "#99c2ff", // Baby Blue
        "#004080", // Royal Blue
        "#b3d9ff", // Ice Blue
      ],
    },
    series: [0, 0, 0, 0, 0, 0, 0],
  });

  const data = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/sekolah/" + param.id + "/siswa"
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
        "http://localhost:8080/api/sekolah/" + param.id + "/siswa"
      );
      setSiswa(respon.data);
      const islam = respon.data.filter((r) => r.agama === "Islam").length;
      const kristen = respon.data.filter((r) => r.agama === "Kristen").length;
      const katholik = respon.data.filter((r) => r.agama === "Katholik").length;
      const hindu = respon.data.filter((r) => r.agama === "Hindu").length;
      const budha = respon.data.filter((r) => r.agama === "Buddha").length;
      const khonghucu = respon.data.filter(
        (r) => r.agama === "Konghuchu"
      ).length;
      const none = respon.data.filter((r) => r.agama === "Non").length;
      setReligi({
        ...religi,
        series: [islam, kristen, katholik, hindu, budha, khonghucu, none],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMurid = () => {
    axios
      .get("http://localhost:8080/api/sekolah/" + param.id + "/siswa/")
      .then((response) => {
        setSiswa(response.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan " + error);
      });
  };

  const getNamaSekolah = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/sekolah/" + param.id
      );
      setNamaSekolah(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const download = async () => {
    await Swal.fire({
      title: "Anda yakin?",
      text: "Anda yakin untuk mendownload data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, download!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          url: "http://localhost:8080/api/excel/download/" + param.id,
          method: "GET",
          responseType: "blob",
        }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "data-murid.xlsx");
          document.body.appendChild(fileLink);

          fileLink.click();
        });
        Swal.fire("Download!", "File berhasil di download.", "success");
      }
    });
  };

  const downloadFormat = async () => {
    await Swal.fire({
      title: "Yakin ingin mendownload?",
      text: "Ini adalah file format excel untuk mengimport data guru",
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
        "http://localhost:8080/api/excel/upload/siswa/" + param.id,
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

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setIsChecked([...isChecked, value]);
    } else {
      setIsChecked(isChecked.filter((e) => e !== value));
    }
  };

  const alldelete = async () => {
    if (isChecked.length !== 0) {
      await Swal.fire({
        title: "Anda yakin?",
        text: "Yakin ingin menghapus data murid ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `http://localhost:8080/api/siswa?ids=` + isChecked.toString()
            )
            .then(() => {
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
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Tidak ada data yang dipilih",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    data();
    dta();
    getAllMurid();
    getNamaSekolah();
  }, []);

  const male = {
    backgroundColor: "lightblue",
  };
  const female = {
    backgroundColor: "lightpink",
  };

  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex justify-center mt-20">
          <main className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
            <div className="bg-white pl-3 pr-1 py-4 rounded-xl shadow-xl">
              <div className="text-md md:text-4xl text-black font-extrabold md:font-extrabold my-3 text-center font-mono">
                Data Murid Sekolah {namaSekolah.namaSekolah}
              </div>
              {/* diagram pie start*/}
              <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-5 ">
                {/* diagram gender start */}
                <div className="text-center md:flex-1">
                  <div data-aos="fade-right">
                    <div className="rounded-2xl p-1 shadow-2xl w-full md:w-[490px] h-[330px]">
                      <div className="rounded-xl bg-white p-1  h-[320px]">
                        <div className="m-5 overflow-hidden overflow-x-auto">
                          {siswa.length === 0 ? (
                            <div>belum ada data</div>
                          ) : (
                            <Chart
                              options={state.options}
                              series={state.series}
                              type="donut"
                              width="355"
                              className="text-left"
                            />
                          )}
                          <div className=" rounded-xl text-left p-1">
                            <p className="text-black text-md font-bold">
                              Gender
                            </p>
                            <p className="text-black text-xs ">
                              Menampilkan presentase gender murid
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* diagram gender end */}

                {/* diagram agama start */}
                <div className="text-center md:flex-1">
                  <div data-aos="fade-left">
                    <div className="rounded-2xl p-1 shadow-2xl w-full md:w-[490px] h-[330px]">
                      <div className="rounded-xl bg-white p-1 h-[320px]">
                        <div className="m-5 overflow-hidden overflow-x-auto">
                          {siswa.length === 0 ? (
                            <div>belum ada data</div>
                          ) : (
                            <Chart
                              options={religi.options}
                              series={religi.series}
                              type="donut"
                              width="355"
                              className="text-left"
                            />
                          )}
                          <div className=" rounded-xl text-left p-1">
                            <p className="text-black text-md font-bold">
                              Agama
                            </p>
                            <p className="text-black text-xs ">
                              Menampilkan total agama murid
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* diagram agama end */}
              </div>
              {/* diagram pie end */}

              <div className="">
                {/* tombol import export dan add start */}
                <div className="grid justify-center">
                  <div className="grid grid-cols-1 md:flex gap-3 mt-6">
                    {siswa.length === 0 ? (
                      <></>
                    ) : (
                      <button
                        className="text-white w-56 add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={download}
                      >
                        Download Data
                      </button>
                    )}
                    <a href={"/tambah-siswa-sekolah/" + param.id}>
                      <button
                        className="text-white w-56 add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Tambah Data Murid
                      </button>
                    </a>

                    <button
                      className="text-white w-56 add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModal(true)}
                    >
                      Import Data
                    </button>
                  </div>
                </div>
                {/* tombol import export dan add end */}

                {/* tabel guru start */}
                <div className="p-5 pt-1">
                  <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 p-5">
                    <table
                      className="min-w-full divide-gray-200 text-center p-5"
                      id="example"
                    >
                      <thead className="th-add">
                        <tr>
                          <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                            Pilih
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                            No
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                            Nama Murid
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                            Agama
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                            Gender
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                            Kelas
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-left">
                        {siswa.map((val, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="inset-y-0 left-0 bg-white px-4 py-2">
                                <label
                                  className="sr-only"
                                  htmlFor={`Row${idx + 1}`}
                                >
                                  checkbox
                                </label>
                                <input
                                  className="h-5 w-5 rounded border-gray-200"
                                  type="checkbox"
                                  id="Row1"
                                  value={val.id}
                                  checked={val.isChecked}
                                  onChange={(e) => handlecheckbox(e)}
                                />
                              </td>
                              <td className="border-blue-300 left-0 py-2">
                                {idx + 1}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {val.namaMurid}
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
                              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {val.kelas}
                              </td>
                              <td className="whitespace-nowrap text-ceter py-2">
                                <div className="flex items-center -space-x-4 hover:space-x-1">
                                  <a
                                    href={
                                      "/edit-siswa-sekolah/" +
                                      val.id +
                                      "/" +
                                      param.id
                                    }
                                  >
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
                      </tbody>
                    </table>
                    {siswa.length !== 0 ? (
                      <div className="grid justify-center md:justify-start">
                        <button
                          className="text-red-700 bg-red-100 active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                          type="button"
                          onClick={alldelete}
                        >
                          Hapus yang dipilih
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {/* tabel murid end */}

                {/* modal tambah murid start */}
                {showModal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-1 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                              Tambah murid
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
                                <label className="sr-only" htmlFor="name">
                                  Nama
                                </label>
                                <input
                                  autoComplete="off"
                                  className="w-full rounded-lg border p-3 text-sm"
                                  placeholder="Nama murid"
                                  type="text"
                                  id="name"
                                  value={namaMurid}
                                  onChange={(e) => setNamaMurid(e.target.value)}
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                  <label className="sr-only">
                                    Tempat Lahir
                                  </label>
                                  <input
                                    autoComplete="off"
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
                                  <label className="sr-only" htmlFor="phone">
                                    Tanggal Lahir
                                  </label>
                                  <input
                                    autoComplete="off"
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
                                  defaultValue="Agama"
                                >
                                  <option value="Agama" disabled>
                                    Agama
                                  </option>
                                  <option defaultValue="Islam">Islam</option>
                                  <option defaultValue="Kristen">
                                    Kristen
                                  </option>
                                  <option defaultValue="Katholik">
                                    Katholik
                                  </option>
                                  <option defaultValue="Hindu">Hindu</option>
                                  <option defaultValue="Buddha">Buddha</option>
                                  <option defaultValue="Khonghucu">
                                    Khonghucu
                                  </option>
                                  <option defaultValue="Non">Non</option>
                                </select>{" "}
                              </div>
                              <div className="grid grid-cols-2 gap-8">
                                <div className="relative">
                                  <input
                                    autoComplete="off"
                                    className="group peer hidden"
                                    type="radio"
                                    name="shippingOption"
                                    id="next_day_alt"
                                    value="Laki-Laki"
                                    onChange={(e) => setGender(e.target.value)}
                                  />
                                  <label
                                    className="block cursor-pointer rounded-lg bg-blue border border-gray-100 p-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                    htmlFor="next_day_alt"
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
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div className="relative">
                                  <input
                                    autoComplete="off"
                                    className="group peer hidden"
                                    type="radio"
                                    name="shippingOption"
                                    id="perempuan"
                                    value="Perempuan"
                                    onChange={(e) => setGender(e.target.value)}
                                  />
                                  <label
                                    className="block cursor-pointer rounded-lg bg-blue border border-gray-100 p-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                    htmlFor="perempuan"
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
                                      clipRule="evenodd"
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
                {/* modal tambah guru end */}

                {/* modal import dan download format data start */}
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
                                  guru anda. (format sudah tertulis)
                                </p>
                                <button
                                  className="text-white add-guru active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={downloadFormat}
                                >
                                  Download File
                                </button>
                              </div>
                              <div className="py-3">
                                <p className="text-lg font-medium mt-5">
                                  nb: file excel tidak boleh ada kolom yang
                                  blank
                                </p>
                                <p className="mb-5 text-lg font-medium">
                                  jika sudah menginputkan data murid ke dalam
                                  file yang sudah anda download tadi,
                                  selanjutnya bisa anda importkan dengan menekan
                                  tombol dibawah:
                                </p>
                                <input
                                  autoComplete="off"
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

                {/* modal import dan download format data end */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
