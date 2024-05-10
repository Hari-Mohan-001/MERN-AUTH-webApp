import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  setErrorToNull,
} from "../../Redux/User/User";
import GoogleSign from "./GoogleSign";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setErrorToNull());
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setErrorMessage("");
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage("All Feilds are mandatory");
      return;
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/userAuth/signIn", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/home");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-center my-8 text-3xl font-bold">Login</h1>

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
          <GoogleSign />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't have an Account?</p>
          <Link to={"/signUp"}>
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>
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

export default SignIn;
