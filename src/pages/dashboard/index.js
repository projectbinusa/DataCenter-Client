import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import AOS from "aos";
import PageSidebar from "../../components/PageSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faGraduationCap,
  faUserFriends,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [guru, setGuru] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const male = {
    backgroundColor: "lightblue",
  };
  const female = {
    backgroundColor: "lightpink",
  };
  const [state, setState] = useState({
    options: {
      labels: ["Wanita", "Pria"],
      colors: ["lightpink", "lightblue"],
    },
    series: [],
  });

  const [statee, setStatee] = useState({
    options: {
      labels: ["Wanita", "Pria"],
      colors: ["lightpink", "lightblue"],
    },
    series: [],
  });

  const [religi, setReligi] = useState({
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respon = await axios.get(
          "http://localhost:8080/api/guru/" +
            localStorage.getItem("sekolahId") +
            "/guru"
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

        setReligi({
          ...religi,
          options: {
            ...religi.options,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respon = await axios.get(
          "http://localhost:8080/api/sekolah/" +
            localStorage.getItem("sekolahId") +
            "/siswa"
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

  const genderGuru = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/guru/" +
          localStorage.getItem("sekolahId") +
          "/guru"
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

  const genderSiswa = async () => {
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
      setStatee({
        ...statee,
        series: [totalPerempuan, response.data.length - totalPerempuan],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAll = async () => {
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

  useEffect(() => {
    genderGuru();
    genderSiswa();
    getAll();
    getAllMurid();
  }, []);

  const totalGuruIcon = (
    <FontAwesomeIcon
      icon={faChalkboardUser}
      className="text-4xl text-black-600 mr-4 "
      style={{ color: "#004bcc" }}
    />
  );
  const rataGuruIcon = (
    <FontAwesomeIcon
      icon={faUserFriends}
      className="text-4xl text-black-600 mr-4"
      style={{ color: "#004bcc" }}
    />
  );

  const muridIcon = (
    <FontAwesomeIcon
      icon={faGraduationCap}
      className="text-4xl text-black-600 mr-4"
      style={{ color: "#004bcc" }}
    />
  );
  const rataMuridIcon = (
    <FontAwesomeIcon
      icon={faUsers}
      className="text-4xl text-black-600 mr-4"
      style={{ color: "#004bcc" }}
    />
  );

  return (
    <div>
      <PageSidebar />
      <div className="flex mt-20">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="rounded-xl bg-white p-1 flex border border-blue-500 border-2">
                <div className="rounded-xl p-4 h-[120px] flex items-center">
                  <div className="flex items-start">
                    <div className="self-start">
                      {" "}
                      {/* Tambahkan class self-start untuk ikon */}
                      {totalGuruIcon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-xl text-black">Total Guru</p>
                    <p className="text-xl font-bold text-black">
                      {guru.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-1 flex border border-blue-500 border-2">
                <div className="rounded-xl p-4 h-[120px] flex items-center">
                  <div className="flex items-start">
                    <div className="self-start">
                      {" "}
                      {/* Tambahkan class self-start untuk ikon */}
                      {muridIcon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-xl text-black">Total Murid</p>
                    <p className="text-xl font-bold text-black">
                      {siswa.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-1 flex border border-blue-500 border-2">
                <div className="rounded-xl p-4 h-[120px] flex items-center">
                  <div className="flex items-start">
                    <div className="self-start">
                      {" "}
                      {/* Tambahkan class self-start untuk ikon */}
                      {rataGuruIcon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-xl text-black">Umur Guru</p>
                    <p className="text-xl font-bold text-black">
                      {/* Calculate average age here */}
                      {guru.length > 0
                        ? (
                            guru.reduce(
                              (sum, { tanggalLahir }) =>
                                sum +
                                (new Date().getFullYear() -
                                  new Date(tanggalLahir).getFullYear()),
                              0
                            ) / guru.length
                          ).toFixed(2)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-1 flex border border-blue-500 border-2">
                <div className="rounded-xl p-4 h-[120px] flex items-center">
                  <div className="flex items-start">
                    <div className="self-start">
                      {" "}
                      {/* Tambahkan class self-start untuk ikon */}
                      {rataMuridIcon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-xl text-black">Umur Murid</p>
                    <p className="text-xl font-bold text-black">
                      {/* Calculate average age here */}
                      {siswa.length > 0
                        ? (
                            siswa.reduce(
                              (sum, { tanggalLahir }) =>
                                sum +
                                (new Date().getFullYear() -
                                  new Date(tanggalLahir).getFullYear()),
                              0
                            ) / siswa.length
                          ).toFixed(2)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-5 mt-5 mb-5">
              {/* Diagram Gender */}
              <div className="text-center md:flex-1">
                <div data-aos="fade-right">
                  <div className="rounded-2xl p-1 shadow-xl w-full md:w-[520px] h-[330px]">
                    <div className="rounded-xl bg-white p-1  h-[320px]">
                      <div className="m-5 overflow-hidden overflow-x-auto">
                        {guru.length === 0 ? (
                          <div>belum ada data</div>
                        ) : (
                          <Chart
                            options={state.options}
                            series={state.series}
                            type="donut"
                            width="370"
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
              {/* Diagram Agama */}
              <div className="text-center md:flex-1">
                <div data-aos="fade-left">
                  <div className="rounded-2xl p-1 shadow-xl w-full md:w-[510px] h-[330px]">
                    <div className="rounded-xl bg-white p-1 h-[320px]">
                      <div className="m-5 overflow-hidden overflow-x-auto">
                        {guru.length === 0 ? (
                          <div>belum ada data</div>
                        ) : (
                          <Chart
                            options={religi.options}
                            series={[{ data: religi.series }]}
                            type="bar"
                            width="370"
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
            <div className="flex flex-col md:flex-row justify-center gap-5 mt-5 mb-5">
              {/* Diagram Gender */}
              <div className="text-center md:flex-1">
                <div data-aos="fade-right">
                  <div className="rounded-2xl p-1 shadow-xl w-full md:w-[520px] h-[330px]">
                    <div className="rounded-xl bg-white p-1  h-[320px]">
                      <div className="m-5 overflow-hidden overflow-x-auto">
                        {guru.length === 0 ? (
                          <div>belum ada data</div>
                        ) : (
                          <Chart
                            options={statee.options}
                            series={statee.series}
                            type="donut"
                            width="370"
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
              {/* Diagram Agama */}
              <div className="text-center md:flex-1">
                <div data-aos="fade-left">
                  <div className="rounded-2xl p-1 shadow-xl w-full md:w-[510px] h-[330px]">
                    <div className="rounded-xl bg-white p-1 h-[320px]">
                      <div className="m-5 overflow-hidden overflow-x-auto">
                        {guru.length === 0 ? (
                          <div>belum ada data</div>
                        ) : (
                          <Chart
                            options={religiMurid.options}
                            series={[{ data: religiMurid.series }]}
                            type="bar"
                            width="370"
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
            </div>
          </main>
        </div>
      </div>
      <div className="flex my-5">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
            <div className="p-5 bg-white">
              <div className="floath-left">
                <div className="grid grid-cols-1 md:flex gap-1 mt-6">
                  <span className="text-black w-56 font-bold uppercase text-xl px-6 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Table Guru
                  </span>
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
                        Nama Guru
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Agama
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Gender
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Gelar Pendidikan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {guru.map((val, idx) => {
                      return (
                        <tr key={idx}>
                          <td className="border-blue-300 left-0 py-2">
                            {idx + 1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {val.namaGuru}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2">
                            <strong className="rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700">
                              {val.agama}
                            </strong>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2">
                            <strong
                              className="rounded px-3 py-1.5 text-xs font-medium"
                              style={val.gender === "Laki-Laki" ? male : female}
                            >
                              {val.gender}
                            </strong>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {val.gelarPendidikan}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="flex my-5">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
            <div className="p-5 bg-white">
              <div className="floath-left">
                <div className="grid grid-cols-1 md:flex gap-1 mt-6">
                  <span className="text-black w-56  font-bold uppercase text-xl px-6 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Table Murid
                  </span>
                </div>
              </div>
              <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 p-5">
                <table
                  className="min-w-full divide-gray-200 text-center p-3"
                  id="example"
                  data-aos="zoom-in"
                >
                  <thead className="th-add">
                    <tr>
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
                    </tr>
                  </thead>
                  <tbody className="">
                    {siswa.map((val, idx) => {
                      return (
                        <tr key={idx}>
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
                              style={val.gender === "Laki-Laki" ? male : female}
                            >
                              {val.gender}
                            </strong>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {val.kelas}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
