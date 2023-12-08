import React, { useEffect } from "react";
import axios from "axios";
import { useState  } from "react";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";

export default function VerRegistrasi(){
    const [email, setEmail] = useState([]);
    const getAll = async () => {
      await axios
        .get(`http://localhost:8080/api/users`)
        .then((res) => {
          setEmail(res.data);
        });
    };
  
    
   
  
  
    useEffect(() => {
      getAll();
    }, []);


   return (

       <>
       <Sidebar/>
       <div className="flex my-20">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
            <div className="p-5 bg-white">
              <div className="grid floath-left">
                <div className="grid grid-cols-1 md:flex gap-3 mt-6">
                  <span 
                    className="floath-left text-white w-56 add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                     
                  >
                  Verifikasi Sekolah
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
                       Nama Sekolah
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                       Email
                      </th>
                    
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {email.map((val, idx) => {
                      return (
                        <tr key={idx}>
                          

                          <td className="border-blue-300 left-0 py-2">
                            {idx + 1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {val.email}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {val.email}
                          </td>
                         

                          <td className="whitespace-nowrap text-ceter py-2">
                          <button className="text-white  bg-green-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4    py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150">Terima</button>
                           <button className="text-white  bg-red-400 rounded-lg mx-2 active:bg-slate-300 font-bold uppercase text-sm px-4    py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150">Tolak</button>
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
       
       </>
       
    )
}