import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from "sweetalert2";
import NavComp from '../components/NavComp';

export default function Table() {
    const [siswa, setsiswa] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setsearchTerm] = useState("");
    const [namaSiswa, setNamaSiswa] = useState()
    const [tempatLahir, setTempatLahir] = useState()
    const [tanggalLahir, setTanggalLahir] = useState("")
    const [gender, setGender] = useState("")
    const [agama, setAgama] = useState()

    const addSiswa = async (e) => {
        e.preventDefault();
        e.persist();

        try {
            await Swal.fire({
                title: 'Yakin Ingin Menambahkan?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'tambahakan'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`http://localhost:8080/api/user/${localStorage.getItem("id")}/siswa`, {
                        namaSiswa: namaSiswa,
                        tanggalLahir: tanggalLahir,
                        tempatLahir: tempatLahir,
                        agama: agama,
                        gender: gender
                    })
                    Swal.fire(
                        'Tambah!',
                        ' berhasil ditambahkan.',
                        'success'
                    )
                    window.location.reload()
                }
            })

        } catch (error) {
            console.log("error", error);
        }
    }

    const getAll = async () => {
        await axios.get(`http://localhost:8080/api/user/${localStorage.getItem("id")}/siswa`).then((res) => {
            setsiswa(res.data);
            console.log(res.data);
        })
    }

    const deleteSiswa = async (id) => {
        await axios.delete("http://localhost:8080/api/siswa/" + id).then(() => {
            window.location.reload()
        })
    }

    useEffect(() => {
        getAll()
    }, [])

    const male = {
        backgroundColor: "#f2f7ff"
    };
    const female = {
        backgroundColor: "pink"
    };

    return (
        <>
            <NavComp />
            <div className=''>
            {localStorage.getItem("token") == null ? (
                <>
                    Login Sik sir
                </>
            ) : (
                <>
                <div className='p-5 flex justify-between'>
                    <button className="text-white bg-blue-300 active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(true)}>
                        Tambah Data Siswa
                    </button>
                    <div className="relative">
                        <input
                            type="text"
                            id="search"
                            placeholder="Cari..."
                            className="w-full rounded-md border-sky-300 p-3 py-2.5 pr-10 hover:shadow-lg shadow-sm light:text-white sm:text-sm"
                            onChange={(event) => { setsearchTerm(event.target.value) }}
                        />
                        <span className="absolute border-sky-200 inset-y-0 right-0 grid w-10 place-content-center ">
                            <button
                                type="button"
                                className="rounded-full p-0.5"
                            >
                                <span className="sr-only">Submit</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </span>
                    </div>
                </div>
                <div className='p-5'>
                    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-gray-200 text-center">
                            <thead className="bg-gray-100 ">
                                <tr>
                                    {/* <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">ID</th> */}
                                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Nama Siswa                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Tempat Lahir                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Tanggal Lahir                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Agama</th>
                                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Gender</th>
                                    <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">Action</th>                                </tr>
                            </thead>
                            <tbody className="">
                                {siswa.filter((val) => {
                                    if (searchTerm == "") {
                                        return val
                                    } else if (val.agama.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return val
                                    }
                                }).map((val, key, idx) => {
                                    return (
                                        <tr key={key}>
                                            {/* <td className="sticky border-blue-300 left-0 py-2">{}</td> */}
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{val.namaSiswa}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{val.tempatLahir}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{val.tanggalLahir}</td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                                <strong className="rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700">
                                                    {val.agama}
                                                </strong>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2"  >
                                                <strong className="rounded px-3 py-1.5 text-xs font-medium" style={val.gender === "Laki-Laki" ? male : female}>
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
                                                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </button>
                                                    </a>
                                                    <button className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50" type="button" onClick={() => deleteSiswa(val.id)}>
                                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                }
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
                                            <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowModal(false)}>
                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                            <form action="" className="space-y-4" onSubmit={addSiswa}>
                                                <div>
                                                    <label className="sr-only" for="name">Nama</label>
                                                    <input
                                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
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
                                                        <label className="sr-only">Tempat Lahir</label>
                                                        <input
                                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                                            placeholder="Tempat Lahir"
                                                            type="text"
                                                            required
                                                            value={tempatLahir}
                                                            onChange={(e) => setTempatLahir(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="sr-only" for="phone">Tanggal Lahir</label>
                                                        <input
                                                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                                            type="date"
                                                            value={tanggalLahir}
                                                            onChange={(e) => setTanggalLahir(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div>

                                                    <select
                                                        className="relative w-full rounded-t-lg border-gray-200 p-2.5 text-sm focus:z-10"
                                                        aria-label='agama'
                                                        onChange={(e) => setAgama(e.target.value)}
                                                    >
                                                        <option selected disabled >Agama</option>
                                                        <option value={agama}>Islam</option>
                                                        <option value={agama}>Kristen</option>
                                                        <option value={agama}>Katholik</option>
                                                        <option value={agama}>Hindu</option>
                                                        <option value={agama}>Budha</option>
                                                        <option value={agama}>Khonghucu</option>
                                                        <option value={agama}>Null</option>
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
                                                            onChange={(e) => setGender(e.target.value)} />
                                                        <label className="block cursor-pointer rounded-lg bg-blue border border-gray-100 p-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500" for="next_day_alt">
                                                            <span> Laki-Laki </span>
                                                        </label>
                                                        <svg className="absolute top-4 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path
                                                                fill-rule="evenodd"
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
                                                            onChange={(e) => setGender(e.target.value)} />
                                                        <label className="block cursor-pointer rounded-lg bg-blue border border-gray-100 p-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500" for="perempuan">
                                                            <span> Perempuan </span>
                                                        </label>
                                                        <svg className="absolute top-4 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clip-rule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowModal(false)}>
                                                        Close
                                                    </button>
                                                    <button
                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="submit"

                                                    >
                                                        Save Changes
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
                </>
            )}
            </div>
        </>
    )
}


