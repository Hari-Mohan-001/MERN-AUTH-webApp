import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../Redux/User/User";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../Firebase/FirebaseConfig";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updatemessage, setUpdateMessage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = (image) => {
    setImageError(false);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profileImage: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        console.log("fail");
        dispatch(updateFailure(data));
        return;
      }

      dispatch(updateSuccess(data));
      setUpdateMessage(true);
    } catch (error) {
      console.log(error);
      dispatch(updateFailure(error));
    }
  };
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-center my-8 text-3xl font-bold">Profile</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-3">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          hidden
        />
        <img
          className="h-28 w-28 rounded-full object-cover self-center cursor-pointer"
          src={formData.profileImage || currentUser.profileImage}
          alt=""
          onClick={() => fileRef.current.click()}
        />

        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-600">
              Error Uploading-check the image type
            </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className="text-green-500">{`uploading...${imagePercentage} %`}</span>
          ) : imagePercentage == 100 ? (
            <span className="text-green-800">Image Upload Successfull</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="Username"
          id="userName"
          defaultValue={currentUser.userName}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button className="bg-slate-950 text-white rounded-lg p-3 uppercase mt-2 hover:opacity-90">
          {loading ? "loading.." : "update"}
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="cursor-pointer text-blue-600">Sign Out</span>
      </div>

      <p className="text-green-600 mt-4">
        {updatemessage && "Updated successfully"}
      </p>
      <p className="text-red-600 mt-4">{error && "Something went wrong"}</p>
    </div>
  );
};

export default Profile;
