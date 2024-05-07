import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../Firebase/FirebaseConfig";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../Redux/User/User";

const GoogleSign = () => {
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("/api/userAuth/googleSign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log('ji', data);
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("couuld not login", error);
    }
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className="uppercase bg-green-700 text-white rounded-lg p-3 hover:opacity-90"
    >
      continue with google
    </button>
  );
};

export default GoogleSign;
