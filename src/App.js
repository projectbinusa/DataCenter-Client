import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { initFlowbite } from "flowbite";
import Login from "./pages/Login";
import Registrasi from "./pages/Registrasi";
import Table from "./pages/TableSiswa";
import EditSiswa from "./pages/EditSiswa";
import SekolahById from "./pages/SekolahById";
import Registrasi2 from "./pages/Registrasi2";
import PrivateRoute from "./router/PrivateRoute";
import PrivateSuperAdmin from "./router/PrivateSuperAdmin";
import PrivateReg from "./router/PrivateReg";
import PrivateHome from "./router/PrivateHome";
import Dashboard from "./pages/Dashboard";
import TableSekolahAdmin from "./pages/TableSekolahAdmin";
import TableSiswaAdmin from "./pages/TableSiswaAdmin";
import EditSiswaAdmin from "./pages/EditSiswaAdmin";
import IndexDash from "./pages/dashboard/index";
import { useEffect } from "react";
import TableGuru from "./pages/guru/TableGuru";
import AddGuru from "./pages/guru/AddGuru";
import AddMurid from "./pages/siswa/AddMurid";
import TableSiswa from "./pages/siswa/TableSiswa";
import InfoSekolah from "./pages/sekolah/InfoSekolah";
import EditGuru from "./pages/guru/EditGuru";
import LandingPage from "./pages/landingpage/landingpage";
import DetailGuru from "./pages/guru/DetailGuru";
import DetailMurid from "./pages/siswa/DetailMurid";
import EditSekolah from "./pages/sekolah/EditSekolah";
import PublikSekolah from "./pages/landingpage/PublikSekolah";
import DataKelas from "./pages/sekolah/DataKelas";
import TambahKelas from "./pages/sekolah/TambahKelas";
import UbahKelas from "./pages/sekolah/UbahKelas";
import ExtraSekolah from "./pages/sekolah/ExtraSekolah";
import GelarPendidikan from "./pages/sekolah/GelarPendidikan";
import TambahExtra from "./pages/sekolah/TambahExtra";
import TambahGelar from "./pages/sekolah/TambahGelar";
import UbahExtra from "./pages/sekolah/UbahExtra";
import UpdateGelar from "./pages/sekolah/UpdateGelar";
import VerRegistrasi from "./pages/VerRegistrasi";
import GuruById from "./pages/GuruById";
import MuridById from "./pages/MuridById";
import KelasById from "./pages/KelasById";
import ExtraById from "./pages/ExtraById";
import GelarById from "./pages/GelarById";
import InfoSekolahById from "./pages/InfoSekolahById";
import EditGuruByAdmin from "./pages/EditGuruByAdmin";
import EditKelasByAdmin from "./pages/EditKelasByAdmin";
import EditSiswaByAdmin from "./pages/EditSiswaByAdmin";
import EditExtraByAdmin from "./pages/EditExtraByAdmin";
import EditGelarByAdmin from "./pages/EditGelarByAdmin";
import EditSekolahByAdmin from "./pages/EditSekolahByAdmin";
import TambahGuruByAdmin from "./pages/TambahGuruByAdmin";
import TambahSiswaByAdmin from "./pages/TambahSiswaByAdmin";
import TambahKelasByAdmin from "./pages/TambahKelasByAdmin";
import TambahExtraByAdmin from "./pages/TambahExtraByAdmin";
import TambahGelarByAdmin from "./pages/TambahGelarByAdmin";
import SaranLaporan from "./pages/landingpage/SaranLaporan";

// import PrivateBack from "./router/PrivateBack";

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registrasi" element={<Registrasi />} />

          <Route
            path="/"
            element={
              <PrivateHome>
                <LandingPage />
              </PrivateHome>
            }
          />
          <Route
            path="/publik-sekolah/:id"
            element={
              <PrivateHome>
                <PublikSekolah />
              </PrivateHome>
            }
          />
          <Route
            path="/saran"
            element={
              <PrivateHome>
                <SaranLaporan />
              </PrivateHome>
            }
          />
          {/* <Route
            path="/detail-guru-sekolah/:id"
            element={
              <PrivateHome>
                <DetailGuruSekolah />
              </PrivateHome>
            }
          />
          <Route
            path="/detail-murid-sekolah/:id"
            element={
              <PrivateHome>
                <DetailMuridSekolah />
              </PrivateHome>
            }
          /> */}

          <Route
            path="/registrasi2"
            element={
              // <PrivateBack>
              <PrivateReg>
                <Registrasi2 />
              </PrivateReg>
              // </PrivateBack>
            }
          />

          {/* super admin page start */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <PrivateSuperAdmin>
                  <Dashboard />
                </PrivateSuperAdmin>
              </PrivateRoute>
            }
          />

          <Route
            path="/sekolah/:id"
            element={
              <PrivateRoute>
                <SekolahById />
              </PrivateRoute>
            }
          />

          <Route
            path="/guru/:id"
            element={
              <PrivateRoute>
                <GuruById />
              </PrivateRoute>
            }
          />

          <Route
            path="/murid/:id"
            element={
              <PrivateRoute>
                <MuridById />
              </PrivateRoute>
            }
          />

          <Route
            path="/kelas/:id"
            element={
              <PrivateRoute>
                <KelasById />
              </PrivateRoute>
            }
          />

          <Route
            path="/extra/:id"
            element={
              <PrivateRoute>
                <ExtraById />
              </PrivateRoute>
            }
          />

          <Route
            path="/gelar/:id"
            element={
              <PrivateRoute>
                <GelarById />
              </PrivateRoute>
            }
          />

          <Route
            path="/info-sekolah/:id"
            element={
              <PrivateRoute>
                <InfoSekolahById />
              </PrivateRoute>
            }
          />

          <Route
            path="/table-sekolah-admin"
            element={
              <PrivateRoute>
                <TableSekolahAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/tambah-siswa-sekolah/:id"
            element={
              <PrivateRoute>
                <TambahSiswaByAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/tambah-kelas-sekolah/:id"
            element={
              <PrivateRoute>
                <TambahKelasByAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/tambah-extra-sekolah/:id"
            element={
              <PrivateRoute>
                <TambahExtraByAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/tambah-gelar-sekolah/:id"
            element={
              <PrivateRoute>
                <TambahGelarByAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-guru-sekolah/:id_guru/:id_sekolah"
            element={
              <PrivateRoute>
                <EditGuruByAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-siswa-sekolah/:id_siswa/:id_sekolah"
            element={
              <PrivateRoute>
                <EditSiswaByAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-kelas-sekolah/:id_kelas/:id_sekolah"
            element={
              <PrivateRoute>
                <EditKelasByAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-extra-sekolah/:id_extra/:id_sekolah"
            element={
              <PrivateRoute>
                <EditExtraByAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-gelar-sekolah/:id_gelar/:id_sekolah"
            element={
              <PrivateRoute>
                <EditGelarByAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-sekolah/:id_user/:id_sekolah"
            element={
              <PrivateRoute>
                <EditSekolahByAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/tambah-guru-sekolah/:id"
            element={
              <PrivateRoute>
                <TambahGuruByAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/ver-registrasi"
            element={
              <PrivateRoute>
                <VerRegistrasi />
              </PrivateRoute>
            }
          />

          <Route
            path="/table-siswa-admin"
            element={
              <PrivateRoute>
                <TableSiswaAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-siswa-admin/:id"
            element={
              <PrivateRoute>
                <EditSiswaAdmin />
              </PrivateRoute>
            }
          />
          {/* super admin page end */}

          <Route
            path="/table"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <Table />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/table-guru"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <TableGuru />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-guru"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <AddGuru />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-guru/:id"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <EditGuru />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/detail-guru/:id"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <DetailGuru />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/detail-murid/:id"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <DetailMurid />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/add-murid"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <AddMurid />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/dash"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <IndexDash />
                </PrivateHome>
              </PrivateRoute>
            }
          />

          <Route
            path="/table-siswa"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <TableSiswa />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/info-sekolah"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <InfoSekolah />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/data-kelas"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <DataKelas />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/tambah-kelas"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <TambahKelas />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/ubah-kelas/:id"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <UbahKelas />
                </PrivateHome>
              </PrivateRoute>
            }
          />

          <Route
            path="/extra"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <ExtraSekolah />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/ubah-extra/:id"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <UbahExtra />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/tambah-extra"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <TambahExtra />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/gelar"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <GelarPendidikan />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/update-gelar/:id"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <UpdateGelar />
                </PrivateHome>
              </PrivateRoute>
            }
          />
          <Route
            path="/tambah-gelar"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <TambahGelar />
                </PrivateHome>
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-siswa/:id"
            element={
              <PrivateRoute>
                <EditSiswa />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-sekolah/:userId/:sekolahId"
            element={
              <PrivateRoute>
                <EditSekolah />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
