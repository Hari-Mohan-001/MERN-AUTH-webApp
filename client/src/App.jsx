import { Routes, Route } from "react-router-dom";


import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import ProfilePage from "./Pages/ProfilePage";
import PrivateRoute from "./Components/PrivateRoute";
import AdminSignIn from "./Pages/AdminSignIn";
import AdminDashBoardPage from "./Pages/AdminDashBoardPage";
import AdminEditUserPage from "./Pages/AdminEditUserPage";
import NotFound from "./Components/NotFound";
import HomePage from "./Pages/HomePage";
import CreateUser from "./Components/Admin/CreateUser";

function App() {
  return (
    <>
      <Routes>
       <Route path="/home" element={<HomePage/>}/>
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/admin/signIn" element={<AdminSignIn/>}/>
        <Route path="/admin/dashboard" element={<AdminDashBoardPage/>}/>
        <Route path="/admin/editUser/:userId" element={<AdminEditUserPage/>}/>
        <Route path="/admin/createNewUser" element={<CreateUser/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
