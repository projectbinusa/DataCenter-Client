import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";


export default function HomeAdmin() {
  const [siswa, setSiswa] = useState([])
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

  const allSiswa = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/siswa/"
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

  const allAgama = async () => {
    try {
      const respon = await axios.get(
        "http://localhost:8080/api/siswa/"
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

  const [grafik, setGrafik] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: "jumlah siswa",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  })

  useEffect(() => {
    allSiswa();
    allAgama();
  }, []);

  return (
    <>
      <div className="m-4 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="pie rounded-2xl p-1 shadow-xl">
              <div className="rounded-xl items-center bg-white p-1">
                <div className="pie rounded-xl p-1">
                  <p className="text-white text-2xl">Grafik Jumlah Siswa Pertahun</p>
                </div>
                <div className="m-5">
                  <Chart
                    options={grafik.options}
                    series={grafik.series}
                    type="bar"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4">
            <div className="pie rounded-2xl p-1 shadow-xl">
              <div className="rounded-xl items-center bg-white p-1">
                <div className="m-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 text-pink-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>

                  <h2 class="mt-4 text-xl font-bold text-white">Digital campaigns</h2>

                  <p class="mt-1 text-lg text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo
                    possimus adipisci distinctio alias voluptatum blanditiis laudantium.
                  </p>
                </div>
              </div>
            </div>
            <div className="pie rounded-2xl p-1 shadow-xl">
              <div className="rounded-xl items-center bg-white p-1">
                <div className="m-3 items-center">
                  <div className="flex -">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-20 w-20 tex text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  </div>
                  <h2 class="mt-4 text-xl font-bold text-white">Digital campaigns</h2>

                  <p class="mt-1 text-lg text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo
                    possimus adipisci distinctio alias voluptatum blanditiis laudantium.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
          <div className="pie rounded-2xl p-1 shadow-xl">
            <div className="rounded-xl items-center bg-white p-1">
              <div className="pie rounded-xl p-1">
                <p className="text-white text-2xl">Data Gender Seluruh Siswa</p>
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
                <p className="text-white text-2xl">Data Agama Seluruh Siswa</p>
              </div>
              <div className="m-5">
                <Chart
                  options={religi.options}
                  series={religi.series}
                  type="pie"
                  width="380"
                  className="text-center"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
