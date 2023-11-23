import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Chart from "react-apexcharts";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../style/table.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

export default function TableGuru() {
  const [guru, setGuru] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [excel, setExcel] = useState("");
  const param = useParams();

  const [state, setState] = useState({
    options: {
      labels: ["Wanita", "Pria"],
      colors: ["lightpink", "lightblue"],
    },
    series: [],
  });

  AOS.init({ duration: 1750, once: true });

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
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

  const [gelar, setGelar] = useState({
    options: {
      plotOptions: {
        bar: {
          borderRadius: 10,
        },
      },
      labels: [
        "S.Ag",
        "S.Sos",
        "S.Ikom",
        "S.Pd",
        "S.T",
        "S.Kom",
        "S.Si",
        "S.Mat",
        "S.Pd.I",
        "S.S",
        "S.Sn",
        "Lainnya",
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

  const [ageData, setAgeData] = useState({
    options: {
      labels: [
        "20-25 tahun",
        "25-30 tahun",
        "30-35 tahun",
        "35-40 tahun",
        "40-45 tahun",
        "45-50 tahun",
        "50-55 tahun",
        "55-60 tahun",
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
    series: [0, 0, 0, 0, 0, 0, 0, 0],
  });

  const dataa = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/guru/" + param.id + "/guru"
      );
      setGuru(response.data);

      // Calculate age ranges
      const now = new Date();
      const ageRanges = [20, 25, 30, 35, 40, 45, 50, 55, 60];
      const ageCounts = Array(ageRanges.length).fill(0);

      response.data.forEach((guru) => {
        const birthDate = new Date(guru.tanggalLahir);
        const age = now.getFullYear() - birthDate.getFullYear();

        // Check if birthday has occurred this year
        const isBirthdayPassed =
          now.getMonth() > birthDate.getMonth() ||
          (now.getMonth() === birthDate.getMonth() &&
            now.getDate() >= birthDate.getDate());

        // Adjust age based on the current month and day
        const adjustedAge = isBirthdayPassed ? age : age - 1;

        for (let i = 0; i < ageRanges.length - 1; i++) {
          if (adjustedAge >= ageRanges[i] && adjustedAge < ageRanges[i + 1]) {
            ageCounts[i]++;
            break;
          }
        }
      });

      setAgeData({
        ...ageData,
        series: ageCounts,
      });
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respon = await axios.get(
          "http://localhost:8080/api/guru/" + param.id + "/guru"
        );
        setGuru(respon.data);

        const gelarCounts = {
          "S.Ag": 0,
          "S.Sos": 0,
          "S.Ikom": 0,
          "S.Pd": 0,
          "S.T": 0,
          "S.Kom": 0,
          "S.Si": 0,
          "S.Mat": 0,
          "S.Pd.I": 0,
          "S.S": 0,
          "S.Sn": 0,
          Lainnya: 0,
        };

        // Menghitung jumlah guru berdasarkan agama
        respon.data.forEach((r) => {
          gelarCounts[r.gelarPendidikan]++;
        });

        // Mendapatkan labels yang memiliki jumlah guru lebih dari 0
        const labelsWithCount = Object.keys(gelarCounts).filter(
          (gelarPendidikan) => gelarCounts[gelarPendidikan] > 0
        );

        // Update state dengan labels yang memiliki data
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

  const getAll = async () => {
    await axios
      .get("http://localhost:8080/api/guru/" + param.id + "/guru")
      .then((res) => {
        setGuru(res.data);
      });
  };

  useEffect(() => {
    getAll();
    data();
    dataa();
  }, []);

  const male = {
    backgroundColor: "lightblue",
  };
  const female = {
    backgroundColor: "lightpink",
  };

  const totalGuruIcon = (
    <FontAwesomeIcon
      icon={faUserFriends}
      className="text-4xl text-black-600 mr-4"
    />
  );

  const averageAgeIcon = (
    <FontAwesomeIcon icon={faUsers} className="text-4xl text-black-600 mr-4" />
  );

  return (
    <>
      <div className="flex flex-col md:flex-row mx-0 my-auto">
        {/* <PageSidebar /> */}
        <div className=" rounded-xl p-4 mt-16 mx-auto  w-full max-w-[85%] shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Total Guru Card */}
            <div className="rounded-xl bg-white p-1 flex">
              <div className="rounded-xl p-4 h-[100px] flex items-center">
                <div className="flex items-start">
                  <div className="self-start"> {totalGuruIcon}</div>
                </div>
                <div className="ml-4">
                  <p className="text-lg text-black">Total Guru</p>
                  <p className="text-xl font-bold text-black">{guru.length}</p>
                </div>
              </div>
            </div>

            {/* Rata-rata Umur Card */}
            <div className="rounded-xl bg-white p-1 flex">
              <div className="rounded-xl p-4 h-[100px] flex items-center">
                {averageAgeIcon}
                <div>
                  <p className="text-lg text-black">Rata-rata Umur</p>
                  <p className="text-lg font-bold text-black">
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
          </div>

          <div className="flex flex-col md:flex-row justify-center mt-5 mb-5">
            {/* Diagram Gender */}
            <div className="text-center md:w-1/2">
              <div data-aos="fade-right">
                <div className="rounded-2xl p-1 shadow-xl w-full md:w-[560px] h-[330px]">
                  <div className="rounded-xl bg-white p-1  h-[320px]">
                    <div className="m-5 overflow-hidden overflow-x-auto">
                      {guru.length === 0 ? (
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
                          Menampilkan presentase gender guru
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Diagram Age */}
            <div className="text-center md:w-1/2">
              <div data-aos="fade-right">
                <div className="rounded-2xl p-1 shadow-xl w-full md:w-[570px] h-[330px]">
                  <div className="rounded-xl bg-white p-1  h-[320px]">
                    <div className="m-5 overflow-hidden overflow-x-auto">
                      {guru.length === 0 ? (
                        <div>belum ada data</div>
                      ) : (
                        <Chart
                          options={ageData.options}
                          series={ageData.series}
                          type="donut"
                          width="380"
                          className="text-left"
                        />
                      )}
                      <div className=" rounded-xl text-left p-1">
                        <p className="text-black text-md font-bold">Umur</p>
                        <p className="text-black text-xs ">
                          Menampilkan presentase umur guru
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center my-5">
            {/* Diagram Gelar */}
            <div className="text-center md:w-1/2">
              <div data-aos="fade-left">
                <div className="rounded-2xl p-1 shadow-xl w-full md:w-[560px] h-[360px]">
                  <div className="rounded-xl bg-white p-1 h-[350px]">
                    <div className="m-5 overflow-hidden overflow-x-auto">
                      {guru.length === 0 ? (
                        <div>belum ada data</div>
                      ) : (
                        <Chart
                          options={gelar.options}
                          series={[{ data: gelar.series }]}
                          type="bar"
                          width="400"
                          className="text-left"
                        />
                      )}
                      <div className=" rounded-xl text-left p-1">
                        <p className="text-black text-md font-bold">
                          Gelar Pendidikan
                        </p>
                        <p className="text-black text-xs ">
                          Menampilkan total gelar pendidikan guru
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagram Agama */}
            <div className="text-center md:w-1/2">
              <div data-aos="fade-left">
                <div className="rounded-2xl p-1 shadow-xl w-full md:w-[570px] h-[360px]">
                  <div className="rounded-xl bg-white p-1 h-[350px]">
                    <div className="m-5 overflow-hidden overflow-x-auto">
                      {guru.length === 0 ? (
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
                          Menampilkan total agama guru
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>

          {/* tabel guru start */}

          <div className="p-5 bg-white">
            <div className="grid justify-center"></div>
            <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 p-5">
              <table
                className="min-w-full divide-gray-200 text-center p-5 mb-10 md:w-full"
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
                  </tr>
                </thead>
                <tbody className="">
                  {guru.map((val, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="inset-y-0 left-0 bg-white px-4 py-2">
                          {idx + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {val.namaGuru}
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
                            style={val.gender === "Laki-Laki" ? male : female}
                          >
                            {val.gender}
                          </strong>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* tabel siswa end */}
        </div>
      </div>
    </>
  );
}
