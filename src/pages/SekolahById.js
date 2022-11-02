import React, { useEffect, useState } from "react";
import axios from "axios";
import NavComp from "../components/NavComp";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import "../style/table.css";

export default function SekolahById() {
    const param = useParams();
    const [namaSekolah, setNamaSekolah] = useState([]);
    const [siswa, setSiswa] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");


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
                "Konghuchu",
                "None",
            ],
        },
        series: [0, 0, 0, 0, 0, 0, 0],
    });

    const data = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/user/" + param.id + "/siswa");
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
            const respon = await axios.get("http://localhost:8080/api/user/" + param.id + "/siswa");
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



    const male = {
        backgroundColor: "lightblue",
    };
    const female = {
        backgroundColor: "lightpink",
    };

    const getAllUserData = () => {
        axios.get("http://localhost:8080/api/user/" + param.id + "/siswa/").then((response) => {
            setSiswa(response.data)
        }).catch(error => {
            alert("Terjadi kesalahan " + error);
        })
    }

    const getNamaSekolah = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/user/sekolah/" + param.id)
            setNamaSekolah(res.data);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        data();
        dta();
        getAllUserData();
        getNamaSekolah();
    }, []);

    return (
        <>
            <NavComp />
            <div>
                <div className="max-w p-5">
                    <div className="border rounded-xl p-3">
                        <p className="text-blue-500 text-2xl">{namaSekolah.namaSekolah}</p>
                    </div>
                </div>
            </div>
            <div className="m-5 border">
                <div className="flex justify-center gap-x-14 my-10">
                    <div className="pie rounded-2xl p-1 shadow-xl">
                        <div className="rounded-xl bg-white p-1">
                            <div className="pie rounded-xl p-3">
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
                            <div className="pie rounded-xl p-3">
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
                <div className="p-5 border flex justify-between">
                    <div></div>
                    <div className="relative">
                        <input
                            type="text"
                            id="search"
                            placeholder="Cari..."
                            className="w-full rounded-md border-gray-200 p-3 py-2.5 pr-10 shadow-lg sm:text-sm"
                            onChange={(event) => {
                                setsearchTerm(event.target.value);
                            }}
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
                <div className="p-5">
                    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-gray-200 text-center">
                            <thead className="th-add">
                                <tr>
                                    {/* <th className="whitespace-nowrap px-4 py-2 text-center font-medium">ID</th> */}
                                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                                        Nama Siswa{" "}
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                                        Tempat Lahir{" "}
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                                        Tanggal Lahir{" "}
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                                        Agama
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                                        Gender
                                    </th>{" "}
                                </tr>
                            </thead>
                            <tbody className="">
                                {siswa
                                    .filter((val) => {
                                        if (searchTerm === "") {
                                            return val;
                                        } else if (
                                            val.agama
                                                .toLowerCase()
                                                .includes(searchTerm.toLowerCase())
                                        ) {
                                            return val;
                                        }
                                    })
                                    .map((val, key, idx) => {
                                        return (
                                            <tr key={key}>
                                                {/* <td className="sticky border-blue-300 left-0 py-2">{}</td> */}
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
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
