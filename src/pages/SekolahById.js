import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import "../style/table.css";
import $ from "jquery";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserFriends } from "@fortawesome/free-solid-svg-icons";

export default function SekolahById() {
  const param = useParams();
  const [namaSekolah, setNamaSekolah] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [guru, setGuru] = useState([]);
  const [kelass, setKelass] = useState([]);
  const [extraa, setExtraa] = useState([]);
  const [gelarr, setGelarr] = useState([]);
  const [namaSiswa] = useState("");
  const [tempatLahir] = useState("");
  const [tanggalLahir] = useState("");
  const [agama] = useState("");
  const [gender] = useState("");

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

  const [state, setState] = useState({
    options: {
      labels: ["Perempuan", "Laki-Laki"],
      colors: ["lightpink", "lightblue"],
    },
    series: [],
  });

  const [statee, setStatee] = useState({
    options: {
      labels: ["Perempuan", "Laki-laki"],
      colors: ["lightpink", "lightblue"],
    },
    series: [0, 0],
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

  const [religi, setReligi] = useState({
    options: {
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

  const [extra, setExtra] = useState({
    options: {
      plotOptions: {
        bar: {
          borderRadius: 10,
        },
      },
      labels: ["", "", "", "", "", "", ""],
      colors: [
        "#fffb03",
        "#00ff00",
        "#b50595",
        "#9c9c9c",
        "#ff1500",
        "#0015ff",
      ],
    },
    series: [0, 0, 0, 0, 0, 0, 0],
  });

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

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

  const genderSiswa = async () => {
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

  const genderGuru = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/guru/" + param.id + "/guru"
      );
      setGuru(response.data);
      const totalPerempuan = response.data.filter(
        (x) => x.gender === "Perempuan"
      ).length;
      setStatee({
        ...state,
        series: [totalPerempuan, response.data.length - totalPerempuan],
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
  const getAllGuru = async () => {
    await axios
      .get("http://localhost:8080/api/guru/" + param.id + "/guru")
      .then((res) => {
        setGuru(res.data);
      });
  };

  const getAllKelas = async () => {
    await axios
      .get(`http://localhost:8080/api/kelas/${param.id}/kelas`)
      .then((res) => {
        setKelass(res.data);
      });
  };

  const getAllExtra = async () => {
    await axios
      .get(`http://localhost:8080/api/extra/${param.id}/extra`)
      .then((res) => {
        setExtraa(res.data);
      });
  };

  const getAllGelar = async () => {
    await axios
      .get(
        `http://localhost:8080/api/gelarPendidikan/${param.id}/gelarPendidikan`
      )
      .then((res) => {
        setGelarr(res.data);
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

  useEffect(() => {
    genderSiswa();
    genderGuru();
    getAllMurid();
    getAllGuru();
    getAllKelas();
    getAllExtra();
    getAllGelar();
    getNamaSekolah();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/sekolah/" + param.id + "/siswa"
        );
        setSiswa(response.data);

        // Menghitung jumlah siswa berdasarkan agama
        const agamaCounts = {
          Islam: 0,
          Kristen: 0,
          Katholik: 0,
          Hindu: 0,
          Buddha: 0,
          Khonghucu: 0,
        };

        response.data.forEach((student) => {
          // Asumsikan 'agama' adalah atribut yang menyimpan agama siswa dalam respons dari API
          agamaCounts[student.agama]++;
        });

        // Mendapatkan labels yang memiliki jumlah siswa lebih dari 0
        const labelsWithCount = Object.keys(agamaCounts).filter(
          (agama) => agamaCounts[agama] > 0
        );

        // Update state dengan labels yang memiliki data
        setReligi({
          ...religi,
          options: {
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
  const [kelas, setKelas] = useState({
    options: {
      plotOptions: {
        bar: {
          borderRadius: 10,
        },
      },
      labels: [],
      colors: [
        "#0099cc",
        "#0015ff",
        "#0056ff",
        "#0087ff",
        "#00b8ff",
        "#00eaff",
        "#66ffcc",
      ],
    },
    series: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const kelasResponse = await axios.get(
          "http://localhost:8080/api/kelas/" + param.id + "/kelas"
        );
        const kelasData = kelasResponse.data;

        const muridResponse = await axios.get(
          "http://localhost:8080/api/sekolah/" + param.id + "/siswa"
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const muridResponse = await axios.get(
          "http://localhost:8080/api/sekolah/" + param.id + "/siswa"
        );
        const muridData = muridResponse.data;

        const extrakulikulerCounts = {};

        muridData.forEach((student) => {
          extrakulikulerCounts[student.extrakulikuler] = 0;
        });

        muridData.forEach((student) => {
          extrakulikulerCounts[student.extrakulikuler]++;
        });

        const labelsWithCount = Object.keys(extrakulikulerCounts).filter(
          (extrakulikuler) => extrakulikulerCounts[extrakulikuler] > 0
        );

        setExtra({
          ...extra,
          options: {
            ...extra.options,
            labels: labelsWithCount,
          },
          series: labelsWithCount.map(
            (extrakulikuler) => extrakulikulerCounts[extrakulikuler]
          ),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="md:px-14 sm:ml-64 mt-24">
          <div className="bg-white pl-3 pr-1 py-4 rounded-xl shadow-xl">
            <div className="text-md md:text-4xl text-black font-extrabold md:font-extrabold my-3 text-center font-mono">
              Data Sekolah {namaSekolah.namaSekolah}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14">
              {/* Total Murid */}
              <a href={"/murid/" + param.id}>
                <div className="rounded-xl bg-white p-4 h-[120px] text-center flex items-center shadow-md border border-blue-500 border-2">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="text-4xl text-blue-600 mr-4"
                  />
                  <div className="text-left">
                    <p className="font-bold mb-1 text-gray-800">Total Murid</p>
                    <h1 className="text-3xl font-bold text-blue-700">
                      {siswa.length}
                    </h1>
                  </div>
                </div>
              </a>

              {/* Total Guru */}
              <a href={"/guru/" + param.id}>
                <div className="rounded-xl bg-white p-4 h-[120px] text-center flex items-center shadow-md border border-blue-500 border-2">
                  <FontAwesomeIcon
                    icon={faUserFriends}
                    className="text-4xl text-blue-600 mr-4"
                  />
                  <div className="text-left">
                    <p className="font-bold mb-1 text-gray-800">Total Guru</p>
                    <h1 className="text-3xl font-bold text-blue-700">
                      {guru.length}
                    </h1>
                  </div>
                </div>
              </a>

              {/* Total Kelas */}
              <a href={"/kelas/" + param.id}>
                <div className="rounded-xl bg-white p-4 h-[120px] text-center flex items-center shadow-md border border-blue-500 border-2">
                  <FontAwesomeIcon
                    icon={faUserFriends}
                    className="text-4xl text-blue-600 mr-4"
                  />
                  <div className="text-left">
                    <p className="font-bold mb-1 text-gray-800">Total Kelas</p>
                    <h1 className="text-3xl font-bold text-blue-700">
                      {kelass.length}
                    </h1>
                  </div>
                </div>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {/* Total Extra */}
              <a href={"/extra/" + param.id}>
                <div className="rounded-xl bg-white p-4 h-[120px] text-center flex items-center shadow-md border border-blue-500 border-2">
                  <FontAwesomeIcon
                    icon={faUserFriends}
                    className="text-4xl text-blue-600 mr-4"
                  />
                  <div className="text-left">
                    <p className="font-bold mb-1 text-gray-800">Total Extra</p>
                    <h1 className="text-3xl font-bold text-blue-700">
                      {extraa.length}
                    </h1>
                  </div>
                </div>
              </a>

              {/* Total Gelar */}
              <a href={"/gelar/" + param.id}>
                <div className="rounded-xl bg-white p-4 h-[120px] text-center flex items-center shadow-md border border-blue-500 border-2">
                  <FontAwesomeIcon
                    icon={faUserFriends}
                    className="text-4xl text-blue-600 mr-4"
                  />
                  <div className="text-left">
                    <p className="font-bold mb-1 text-gray-800">Total Gelar</p>
                    <h1 className="text-3xl font-bold text-blue-700">
                      {gelarr.length}
                    </h1>
                  </div>
                </div>
              </a>

              {/* Info Sekolah */}
              <a href={"/info-sekolah/" + param.id}>
                <div className="rounded-xl bg-white p-4 h-[120px] text-center flex items-center shadow-md border border-blue-500 border-2">
                  <FontAwesomeIcon
                    icon={faUserFriends}
                    className="text-4xl text-blue-600 mr-4"
                  />
                  <div className="text-left">
                    <p className="font-bold mb-1 text-xl text-gray-800">
                      Info Sekolah
                    </p>
                  </div>
                </div>
              </a>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-5 mt-10 mb-5">
              {/* Diagram Gender */}
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
                          <p className="text-black text-md font-bold">Gender</p>
                          <p className="text-black text-xs ">
                            Menampilkan presentase gender murid
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center md:flex-1">
                <div data-aos="fade-right">
                  <div className="rounded-2xl p-1 shadow-2xl w-full md:w-[490px] h-[330px]">
                    <div className="rounded-xl bg-white p-1  h-[320px]">
                      <div className="m-5 overflow-hidden overflow-x-auto">
                        {guru.length === 0 ? (
                          <div>belum ada data</div>
                        ) : (
                          <Chart
                            options={statee.options}
                            series={statee.series}
                            type="donut"
                            width="355"
                            className="text-left"
                          />
                        )}
                        <div className=" rounded-xl text-left p-1">
                          <p className="text-black text-md font-bold">Gender</p>
                          <p className="text-black text-xs ">
                            Menampilkan presentase gender guru
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-5 my-5">
              {/* Diagram Agama */}
              <div className="text-center md:flex-1">
                <div data-aos="fade-left">
                  <div className="rounded-2xl p-1 shadow-2xl w-full md:w-[490px] h-[360px]">
                    <div className="rounded-xl bg-white p-1 h-[350px]">
                      <div className="m-5 overflow-hidden overflow-x-auto">
                        {siswa.length === 0 ? (
                          <div>belum ada data</div>
                        ) : (
                          <Chart
                            options={religi.options}
                            series={[{ data: religi.series }]}
                            type="bar"
                            width="400"
                            className="text-left"
                          />
                        )}
                        <div className=" rounded-xl text-left p-1">
                          <p className="text-black text-md font-bold">Agama</p>
                          <p className="text-black text-xs ">
                            Menampilkan total agama murid
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center md:flex-1">
                <div data-aos="fade-left">
                  <div className="rounded-2xl p-1 shadow-2xl w-full md:w-[490px] h-[360px]">
                    <div className="rounded-xl bg-white p-1 h-[350px]">
                      <div className="m-5 overflow-hidden overflow-x-auto">
                        {guru.length === 0 ? (
                          <div>belum ada data</div>
                        ) : (
                          <Chart
                            options={religiGuru.options}
                            series={[{ data: religiGuru.series }]}
                            type="bar"
                            width="400"
                            className="text-left"
                          />
                        )}
                        <div className=" rounded-xl text-left p-1">
                          <p className="text-black text-md font-bold">Agama</p>
                          <p className="text-black text-xs ">
                            Menampilkan total agama guru
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-5 my-5">
              {/* Diagram Extra */}
              <div className="text-center md:flex-1">
                <div data-aos="fade-left">
                  <div className="rounded-2xl p-1 shadow-2xl w-full md:w-[490px] h-[360px]">
                    <div className="rounded-xl bg-white p-1 h-[350px]">
                      <div className="m-5 overflow-hidden overflow-x-auto">
                        {siswa.length === 0 ? (
                          <div>belum ada data</div>
                        ) : (
                          <Chart
                            options={extra.options}
                            series={[{ data: extra.series }]}
                            type="bar"
                            width="400"
                            className="text-left"
                          />
                        )}
                        <div className=" rounded-xl text-left p-1">
                          <p className="text-black text-md font-bold">
                            Extrakulikuler
                          </p>
                          <p className="text-black text-xs ">
                            Menampilkan total extrakulikuler murid
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Diagram Gelar */}
              <div className="text-center md:flex-1">
                <div data-aos="fade-right">
                  <div className="rounded-2xl p-1 shadow-2xl w-full md:w-[490px] h-[360px]">
                    <div className="rounded-xl bg-white p-1 h-[350px]">
                      <div className="m-5 overflow-hidden overflow-x-auto">
                        {guru.length === 0 ? (
                          <div>belum ada data</div>
                        ) : (
                          <Chart
                            type="bar"
                            width="400"
                            className="text-center"
                            options={gelar.options}
                            series={[{ data: gelar.series }]}
                          />
                        )}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
