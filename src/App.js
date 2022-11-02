import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Registrasi from "./pages/Registrasi";
import Home from "./pages/Home";
import Table from "./pages/TableSiswa";
import EditSiswa from "./pages/EditSiswa";
import SekolahById from "./pages/SekolahById";
import PrivateRoute from "./router/PrivateRoute";
import Registrasi2 from "./pages/Registrasi2";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrasi" element={<Registrasi />} />
          <Route path="/registrasi2" element={<Registrasi2/>} />

          <Route
            path="/table"
            element={
              <PrivateRoute>
                <Table />
              </PrivateRoute>
            }
          />
          <Route path="/edit-siswa/:id" element={<EditSiswa />} />
          <Route path="/sekolah/:id" element={<SekolahById />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
