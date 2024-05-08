import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminSignInFailure,
  adminSignInStart,
  adminSignInSuccess,
} from "../../Redux/Admin/Admin";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error, adminDetails } = useSelector((state) => state.admin);
useEffect(()=>{
  if(adminDetails){
    navigate("/admin/dashboard")
  }
},[adminDetails, navigate])

  const handleChange = (e) => {
    setErrorMessage("");
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill out the feilds");
      return;
    }
    try {
      dispatch(adminSignInStart());
      const res = await fetch("/api/admin/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data =await res.json();
      
      if (data.success === false) {
        dispatch(adminSignInFailure(data));
        return;
      }
     
      dispatch(adminSignInSuccess(data));
      navigate("/admin/dashboard")
    } catch (error) {
        dispatch(adminSignInFailure(error))
    }
  };
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-center my-8 text-3xl font-bold">Admin Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <button className="bg-slate-950 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 mt-4">
            {loading ? "loading..." : "login"}
          </button>
        </form>
        <p className="text-red-600 mt-3 text-center">
          {error ? error.message || "Something went wrong" : ""}
        </p>
        <p className="text-red-600 mt-3 text-center">
          {errorMessage ? errorMessage : ""}
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
