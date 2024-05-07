import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

import SignInPage from "./Pages/SignInPage";
import SignUpPage from './Pages/SignUpPage'
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    
    <>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
