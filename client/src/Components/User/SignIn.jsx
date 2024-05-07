import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { signInFailure,signInStart,signInSuccess } from "../../Redux/User/User";
import GoogleSign from "./GoogleSign";

const SignIn = () => {
  const [formData, setFormData] = useState({});
 const {loading,error} = useSelector((state)=> state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     dispatch(signInStart())
      const res = await fetch("/api/userAuth/signIn", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      
      if (data.success === false) {
        
        dispatch(signInFailure(data))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/profile')
    } catch (error) {
      dispatch(signInFailure(error))
    }
  };
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-center my-8 text-3xl font-bold">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label>Email</label>
          <input
            type="text"
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
          <GoogleSign/>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't have an Account?</p>
          <Link to={"/signUp"}>
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>
        <p className="text-red-600 mt-3 text-center">
          {error ? error.message|| "Something went wrong":""}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
