import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import ProfilePage from "./Pages/ProfilePage";
import PrivateRoute from "./Components/PrivateRoute";
import AdminSignIn from "./Pages/AdminSignIn";
import AdminDashBoardPage from "./Pages/AdminDashBoardPage";
import AdminEditUserPage from "./Pages/AdminEditUserPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/admin/signIn" element={<AdminSignIn/>}/>
        <Route path="/admin/dashboard" element={<AdminDashBoardPage/>}/>
        <Route path="/admin/editUser/:userId" element={<AdminEditUserPage/>}/>
      </Routes>
    </>
  );
}

export default App;
