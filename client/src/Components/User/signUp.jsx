import { Link } from "react-router-dom";
import { useState } from "react";
import GoogleSign from "./GoogleSign";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/userAuth/signUp", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, { message: "user created" });
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-center my-8 text-3xl font-bold">SignUp</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            id="userName"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
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
            {loading ? "loading..." : "Signup"}
          </button>
          <GoogleSign/>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Having an Account?</p>
          <Link to={"/signIn"}>
            <span className="text-blue-700">Sign In</span>
          </Link>
        </div>
        <p className="text-red-600 mt-3 text-center">
          {error && "Something went wrong"}
        </p>
      </div>
    </div>
  );
};

export default SignUp;
