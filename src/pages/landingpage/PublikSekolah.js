import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import AOS from "aos";
import PageSidebar from "../../components/PageSidebar";
import logo from "../../assets/school-icon.png";
import { useParams, Link } from "react-router-dom";
import PageNavbar from "../../components/PageNavbar";
import Logo from "../../assets/logo.png";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faMedal,
  faSchool,
  faUserFriends,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

AOS.init({ duration: 1750, once: true });
const api = "http://localhost:8080/api/sekolah";

export default function PublikSekolah() {
  const [namaSekolah, setNamaSekolah] = useState("");
  const [informasiSekolah, setInformasiSekolah] = useState("");
  const [teleponSekolah, setTeleponSekolah] = useState("");
  const [alamatSekolah, setAlamatSekolah] = useState("");
  const [emailSekolah, setEmailSekolah] = useState("");
  const [akreditasiSekolah, setAkreditasiSekolah] = useState("");
  const [visiMisi, setVisiMisi] = useState("");
  const [numSiswa, setNumSiswa] = useState("");
  const [numGuru, setNumGuru] = useState("");
  const [numKelas, setNumKelas] = useState("");
  const [status, setStatus] = useState("");
  const userId = localStorage.getItem("userId");
  const [UserId, setUserId] = useState("");
  const [guru, setGuru] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [kelas_option, setKelasOption] = useState([]);
  const [extra_option, setExtraOption] = useState([]);

  const param = useParams();

  const [state, setState] = useState({
    options: {
      labels: ["Wanita", "Pria"],
      colors: ["lightpink", "lightblue"],
    },
    series: [],
  });

  const [religiGuru, setReligiGuru] = useState({
    options: {
      plotOptions: {
        bar: {
          borderRadius: 15,
        },
      },
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
        "http://localhost:8080/api/guru/" + param.id + "/guru"
      );
      setGuru(response.data);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respon = await axios.get(
          "http://localhost:8080/api/sekolah/" + param.id + "/siswa"
        );
        setSiswa(respon.data);

        const agamaCounts = {
          Islam: 0,
          Kristen: 0,
          Katholik: 0,
          Hindu: 0,
          Buddha: 0,
          Khonghucu: 0,
          Non: 0,
        };

        // Menghitung jumlah guru berdasarkan agama
        respon.data.forEach((r) => {
          agamaCounts[r.agama]++;
        });

        // Mendapatkan labels yang memiliki jumlah guru lebih dari 0
        const labelsWithCount = Object.keys(agamaCounts).filter(
          (agama) => agamaCounts[agama] > 0
        );

        // Update state dengan labels yang memiliki data
        setReligiMurid({
          ...religiMurid,
          options: {
            ...religiMurid.options,
            labels: labelsWithCount,
          },
          series: labelsWithCount.map((agama) => agamaCounts[agama]),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respon = await axios.get(
          "http://localhost:8080/api/guru/" + param.id + "/guru"
        );
        setGuru(respon.data);

        const agamaCounts = {
          Islam: 0,
          Kristen: 0,
          Katholik: 0,
          Hindu: 0,
          Buddha: 0,
          Khonghucu: 0,
          Non: 0,
        };

        // Menghitung jumlah guru berdasarkan agama
        respon.data.forEach((r) => {
          agamaCounts[r.agama]++;
        });

        // Mendapatkan labels yang memiliki jumlah guru lebih dari 0
        const labelsWithCount = Object.keys(agamaCounts).filter(
          (agama) => agamaCounts[agama] > 0
        );

        // Update state dengan labels yang memiliki data
        setReligiGuru({
          ...religiGuru,
          options: {
            ...religiGuru.options,
            labels: labelsWithCount,
          },
          series: labelsWithCount.map((agama) => agamaCounts[agama]),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [gelar, setGelar] = useState({
    options: {
      plotOptions: {
        bar: {
          borderRadius: 10,
        },
      },
      labels: [],
      colors: [
        "#0015ff",
        "#0056ff",
        "#0087ff",
        "#00b8ff",
        "#00eaff",
        "#66ffcc",
        "#0099cc",
      ],
    },
    series: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gelarResponse = await axios.get(
          `http://localhost:8080/api/gelarPendidikan/${param.id}/gelarPendidikan`
        );
        const gelarData = gelarResponse.data;

        const guruResponse = await axios.get(
          `http://localhost:8080/api/guru/${param.id}/guru`
        );
        const guruData = guruResponse.data;

        const gelarCounts = {};
        guruData.forEach((r) => {
          gelarCounts[r.gelarPendidikan] = 0;
        });

        guruData.forEach((r) => {
          gelarCounts[r.gelarPendidikan]++;
        });

        const labelsWithCount = Object.keys(gelarCounts).filter(
          (gelarPendidikan) => gelarCounts[gelarPendidikan] > 0
        );

        setGelar({
          ...gelar,
          options: {
            ...gelar.options,
            labels: labelsWithCount,
          },
          series: labelsWithCount.map(
            (gelarPendidikan) => gelarCounts[gelarPendidikan]
          ),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getPublikSekolah = async () => {
    try {
      const response = await axios.get(`${api}/${param.id}`);

      const resData = response.data;
      setNamaSekolah(resData.namaSekolah);
      setInformasiSekolah(resData.informasiSekolah);
      setTeleponSekolah(resData.teleponSekolah);
      setEmailSekolah(resData.emailSekolah);
      setAkreditasiSekolah(resData.akreditasiSekolah);
      setStatus(resData.status);
      setVisiMisi(resData.visiMisi);
    } catch (error) {
      console.log(error);
    }
  };

  const [statee, setStatee] = useState({
    options: {
      labels: ["Wanita", "Pria"],
      colors: ["lightpink", "lightblue"],
    },
    series: [],
  });

  const [religiMurid, setReligiMurid] = useState({
    options: {
      plotOptions: {
        bar: {
          borderRadius: 15,
        },
      },
      labels: ["Islam", "Kristen", "Katholik", "Hindu", "Buddha", "Khonghucu"],
      colors: [
        "#00ff00",
        "#b50595",
        "#9c9c9c",
        "#ff1500",
        "#0015ff",
        "#fffb03",
      ],
    },
    series: [0, 0, 0, 0, 0, 0, 0],
  });
  const [kelas, setKelas] = useState({
    options: {
      plotOptions: {
        bar: {
          borderRadius: 10,
        },
      },
      labels: [],
      colors: [
        "#0015ff",
        "#0056ff",
        "#0087ff",
        "#00b8ff",
        "#00eaff",
        "#66ffcc",
        "#0099cc",
      ],
    },
    series: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const kelasResponse = await axios.get(
          `http://localhost:8080/api/kelas/${param.id}/kelas`
        );
        const kelasData = kelasResponse.data;

        const muridResponse = await axios.get(
          `http://localhost:8080/api/sekolah/${param.id}/siswa`
        );
        const muridData = muridResponse.data;

        const kelasCounts = {};
        muridData.forEach((r) => {
          kelasCounts[r.kelas] = 0;
        });

        muridData.forEach((r) => {
          kelasCounts[r.kelas]++;
        });

        const labelsWithCount = Object.keys(kelasCounts).filter(
          (kelas) => kelasCounts[kelas] > 0
        );

        setKelas({
          ...kelas,
          options: {
            ...kelas.options,
            labels: labelsWithCount,
          },
          series: labelsWithCount.map((kelas) => kelasCounts[kelas]),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const gendersiswa = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/sekolah/" + param.id + "/siswa"
      );
      setSiswa(response.data);
      const totalPerempuan = response.data.filter(
        (x) => x.gender === "Perempuan"
      ).length;
      setStatee({
        ...statee,
        series: [totalPerempuan, response.data.length - totalPerempuan],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const kelass = async () => {
    try {
      const respon = await axios.get(
        "http://localhost:8080/api/sekolah/" + param.id + "/siswa"
      );
      setSiswa(respon.data);
      const X = respon.data.filter((r) => r.kelas === "X").length;
      const XI = respon.data.filter((r) => r.kelas === "XI").length;
      const XII = respon.data.filter((r) => r.kelas === "XII").length;
      setKelas({
        ...kelas,
        series: [X, XI, XII],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllGuru = async () => {
    await axios
      .get(
        "http://localhost:8080/api/guru/" +
          localStorage.getItem("sekolahId") +
          "/guru"
      )
      .then((res) => {
        setGuru(res.data);
      });
  };

  const getAllMurid = async () => {
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

  const getAllKelas = async () => {
    await axios
      .get("http://localhost:8080/api/kelas/" + param.id + "/kelas")
      .then((res) => {
        setKelasOption(res.data);
      });
  };

  const getAllExtra = async () => {
    await axios
      .get("http://localhost:8080/api/extra/" + param.id + "/extra")
      .then((res) => {
        setExtraOption(res.data);
      });
  };

  useEffect(() => {
    data();
    kelass();
    getPublikSekolah();
    gendersiswa();
    getAllGuru();
    getAllMurid();
    getAllKelas();
    getAllExtra();
  }, []);

  const totalGuruIcon = (
    <FontAwesomeIcon
      icon={faChalkboardUser}
      className="text-4xl text-black-600 mr-4"
    />
  );

  const muridIcon = (
    <FontAwesomeIcon icon={faUsers} className="text-4xl text-black-600 mr-4" />
  );
  const kelasIcon = (
    <FontAwesomeIcon icon={faSchool} className="text-4xl text-black-600 mr-4" />
  );
  const extraIcon = (
    <FontAwesomeIcon icon={faMedal} className="text-4xl text-black-600 mr-4" />
  );

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

            <div class="flex items-center lg:order-2">
              <a
                href="/login"
                class=" text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </a>
              <a
                href="/registrasi"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Sign Up
              </a>
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  class="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="bg-gray-900 min-h-screen">
        <div className="p-4 md:mx-20 sm:ml-64 mt-16 ">
          <div data-aos="fade-up">
            <section className="bg-gray-800">
              <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="max-w-screen-md mb-8 lg:mb-16">
                  <div
                    className="max-w-screen-md mb-8 lg:mb-16"
                    style={{ position: "relative" }}
                  >
                    {/* <center>
                      <img
                        src={logo}
                        alt=""
                        style={{
                          height: "70px",
                          width: "120px",
                          position: "absolute",
                          top: "50%",
                          right: 0,
                          transform: "translateY(-50%)",
                          margin: "5px",
                        }}
                        className=""
                      />
                    </center> */}
                    <div style={{ paddingRight: "100px" }}>
                      <h2 className="mb-4 text-4xl font-extrabold text-white uppercase px-3">
                        Ini Adalah Informasi Sekolah {namaSekolah}
                      </h2>
                    </div>
                    <div className="text-white p-5 md:p-3">
                      <p className="font-bold text-2xl">
                        TERAKREDITASI {akreditasiSekolah}
                      </p>
                      <h2 className="mb-4 text-2xl font-bold text-white">
                        VISI MISI <i>{namaSekolah} </i>
                      </h2>
                      <p className=" sm:text-xl text-gray-300">
                        {visiMisi !== null
                          ? visiMisi
                          : " Belum mengisi Visi Misi"}
                      </p>
                      <p>Status:{status}</p>
                      <p>{informasiSekolah}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 px-4 md:grid-cols-4 gap-4">
                  <div className="rounded-xl bg-gray-300 p-1 flex">
                    <div className="rounded-xl p-4 h-[120px] flex items-center">
                      <div className="flex items-start">
                        <div className="self-start">
                          {" "}
                          {/* Tambahkan class self-start untuk ikon */}
                          {totalGuruIcon}
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-lg text-black">Total Guru</p>
                        <p className="text-xl font-bold text-black">
                          {guru.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-gray-300 p-1 flex">
                    <div className="rounded-xl p-4 h-[120px] flex items-center">
                      <div className="flex items-start">
                        <div className="self-start">
                          {" "}
                          {/* Tambahkan class self-start untuk ikon */}
                          {muridIcon}
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-lg text-black">Total Murid</p>
                        <p className="text-xl font-bold text-black">
                          {siswa.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-gray-300 p-1 flex">
                    <div className="rounded-xl p-4 h-[120px] flex items-center">
                      <div className="flex items-start">
                        <div className="self-start">
                          {" "}
                          {/* Tambahkan class self-start untuk ikon */}
                          {kelasIcon}
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-lg text-black">Total Kelas</p>
                        <p className="text-xl font-bold text-black">
                          {kelas_option.length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-gray-300 p-1 flex">
                    <div className="rounded-xl p-4 h-[120px] flex items-center">
                      <div className="flex items-start">
                        <div className="self-start">
                          {" "}
                          {/* Tambahkan class self-start untuk ikon */}
                          {extraIcon}
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-lg text-black">Total Extra</p>
                        <p className="text-xl font-bold text-black">
                          {extra_option.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="min-h-[700px] max-h-[700px]">
                    {" "}
                    <div data-aos="fade-right">
                      <div className="rounded-2xl p-4 shadow-xl w-full h-[40%]">
                        <div className="rounded-xl bg-gray-300 p-1">
                          <div className="m-5 overflow-hidden overflow-x-auto">
                            {guru.length === 0 ? (
                              <div>belum ada data</div>
                            ) : (
                              <Chart
                                options={state.options}
                                series={state.series}
                                type="donut"
                                width="300"
                                className="text-left"
                              />
                            )}
                            <div className="rounded-xl text-left p-1">
                              <p className="text-black text-md font-bold">
                                Gender Guru
                              </p>
                              <p className="text-black text-xs">
                                Menampilkan presentase gender guru
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-aos="fade-right">
                      <div className="rounded-2xl p-4 shadow-xl w-full h-[40%]">
                        <div className="rounded-xl bg-gray-300 p-1 h-[270px]">
                          <div className="m-5 overflow-hidden overflow-x-auto">
                            {guru.length === 0 ? (
                              <div>belum ada data</div>
                            ) : (
                              <Chart
                                options={kelas.options}
                                series={kelas.series}
                                type="donut"
                                width="305"
                                className="text-left"
                              />
                            )}
                            <div className="rounded-xl text-left p-1">
                              <p className="text-black text-md font-bold">
                                Kelas
                              </p>
                              <p className="text-black text-xs">
                                Menampilkan presentase kelas
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="min-h-[400px] max-h-[400px]">
                    {" "}
                    <div data-aos="fade-right">
                      <div className="rounded-2xl p-4 shadow-xl w-full h-[40%]">
                        <div className="rounded-xl bg-gray-300 p-1">
                          <div className="m-5 overflow-hidden overflow-x-auto">
                            <Chart
                              type="donut"
                              width="300"
                              className="text-center"
                              options={statee.options}
                              series={statee.series}
                            />
                            <div className="rounded-xl text-left p-1">
                              <p className="text-black text-md font-bold">
                                Gender Murid
                              </p>
                              <p className="text-black text-xs">
                                Menampilkan presentase gender murid
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-aos="fade-right">
                      <div className="rounded-2xl p-4 shadow-xl w-full h-[40%]">
                        <div className="rounded-xl bg-gray-300 p-1">
                          <div className="m-5 overflow-hidden overflow-x-auto">
                            <Chart
                              type="donut"
                              width="300"
                              className="text-center"
                              options={gelar.options}
                              series={gelar.series}
                            />
                            <div className="rounded-xl text-left p-1">
                              <p className="text-black text-md font-bold">
                                Gelar Guru
                              </p>
                              <p className="text-black text-xs">
                                Menampilkan presentase gelar guru
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="min-h-[700px] max-h-[700px]">
                    <div data-aos="fade-left">
                      <div className="rounded-2xl p-4 shadow-xl w-full ">
                        <div className="rounded-xl bg-gray-300 p-1 ">
                          <div className="m-5 overflow-hidden overflow-x-auto">
                            {guru.length === 0 ? (
                              <div>belum ada data</div>
                            ) : (
                              <Chart
                                options={religiGuru.options}
                                series={[{ data: religiGuru.series }]}
                                type="bar"
                                width="255"
                                className="text-left"
                              />
                            )}
                            <div className="rounded-xl text-left p-1">
                              <p className="text-black text-md font-bold">
                                Agama Guru
                              </p>
                              <p className="text-black text-xs">
                                Menampilkan total agama guru
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div data-aos="fade-left">
                      <div className="rounded-2xl p-4 shadow-xl w-full ">
                        <div className="rounded-xl bg-gray-300 p-1 ">
                          <div className="m-5 overflow-hidden overflow-x-auto">
                            {siswa.length === 0 ? (
                              <div>belum ada data</div>
                            ) : (
                              <Chart
                                options={religiMurid.options}
                                series={[{ data: religiMurid.series }]}
                                type="bar"
                                width="255"
                                className="text-left"
                              />
                            )}
                            <div className="rounded-xl text-left p-1">
                              <p className="text-black text-md font-bold">
                                Agama Murid
                              </p>
                              <p className="text-black text-xs">
                                Menampilkan presentase agama murid
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-white p-5 md:p-3">
                  <i style={{ fontSize: "1.5em" }} className="p-2 md:p-1">
                    Contact
                  </i>
                  <p style={{ fontSize: "1em" }} className="p-2 md:p-1">
                    <svg
                      className="w-4 h-4 inline-block mr-2"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                    </svg>
                    {emailSekolah}
                  </p>
                  <p style={{ fontSize: "1em" }} className="p-2 md:p-1">
                    <svg
                      className="w-4 h-4 inline-block mr-2"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                    </svg>
                    {teleponSekolah}
                  </p>
                </div>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 "> */}
                {/* First Column */}
                {/* <div className="divide-solid p-4">
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                      <svg
                        className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-8 384V352h16V480c0 17.7 14.3 32 32 32s32-14.3 32-32V192h56 64 16c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64H576V256H384V224H320v48c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H368c-26.5 0-48 21.5-48 48v80H243.1 177.1c-33.7 0-64.9 17.7-82.3 46.6l-58.3 97c-9.1 15.1-4.2 34.8 10.9 43.9s34.8 4.2 43.9-10.9L120 256.9V480c0 17.7 14.3 32 32 32s32-14.3 32-32z" />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">GURU</h3>
                    <p className="text-gray-300 dark:text-gray-400 flex justify-between items-center">
                      <span>{numGuru !== null ? numGuru : "0"} Guru</span>
                    </p>
                  </div> */}

                {/* Second Column */}
                {/* <div className="divide-solid p-4">
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                      <svg
                        className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                        fill="currentColor"
                        viewBox="0 0 448 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />{" "}
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">MURID</h3>{" "}
                    <p className="text-gray-300 dark:text-gray-400 flex justify-between items-center">
                      <span>{numSiswa !== null ? numSiswa : "0"} Murid</span>
                    </p>
                  </div> */}

                {/* Third Column */}
                {/* <div className="divide-solid p-4">
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                      <svg
                        className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                        fill="currentColor"
                        viewBox="0 0 576 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M96 64c0-35.3 28.7-64 64-64H416c35.3 0 64 28.7 64 64V448h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H432 144 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96V64zM384 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">Kelas</h3>
                    <p className="text-gray-300 dark:text-gray-400 flex justify-between items-center">
                      {numKelas} Kelas
                    </p>
                  </div> */}
                {/* <div className="divide-solid p-4">
                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                      <svg
                        className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                        fill="currentColor"
                        viewBox="0 0 384 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M80 0C44.7 0 16 28.7 16 64V448c0 35.3 28.7 64 64 64H304c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H80zm80 432h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />{" "}
                      </svg>
                    </div>
                    <h4 className="mb-2 text-xl font-bold text-white flex ">
                      CONTACT
                    </h4>

                    <div className="relative text-gray-300 dark:text-gray-400">
                      <p style={{ fontSize: "0.6em" }} className="pr-20">
                        <svg
                          className="w-4 h-4 inline-block mr-2"
                          fill="currentColor"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                        </svg>
                        {emailSekolah}
                      </p>
                      <p style={{ fontSize: "0.6em" }} className="pr-20">
                        <svg
                          className="w-4 h-4 inline-block mr-2"
                          fill="currentColor"
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                        </svg>
                        {teleponSekolah}
                      </p>
                    </div>
                  </div> */}
                {/* </div> */}
              </div>
            </section>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
