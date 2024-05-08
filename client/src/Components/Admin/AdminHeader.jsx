import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminSignOutSuccess } from "../../Redux/Admin/Admin";


const AdminHeader = () => {
  const { adminDetails } = useSelector((state) => state.admin);
  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  useEffect(()=>{
    if(!adminDetails){
      navigate("/admin/signIn")
    }
  },[adminDetails,navigate])

 const handleSignout = async ()=>{
  await fetch("/api/admin/signOut")
  dispatch(adminSignOutSuccess())
  navigate("/admin/signIn")
 }
  return (
    <div className="bg-slate-300">
      <div className="flex justify-between items-center max max-w-7xl mx-auto p-3">
        <h1 className="font-bold">Admin DashBoard</h1>
        <ul className="flex gap-4">
          <li className="cursor-pointer" onClick={handleSignout}>SignOut</li>

          <img
            className="w-7 h-7 rounded-full object-cover"
            src={adminDetails && adminDetails.profileImage}
            alt="image"
          />
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
