import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUP from "./Pages/SignUp";

function App() {
  return (
    <>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUP />} />
      </Routes>
    </>
  );
}

export default App;
