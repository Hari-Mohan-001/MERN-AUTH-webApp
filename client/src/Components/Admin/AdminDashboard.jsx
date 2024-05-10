import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
 

  
  useEffect(() => {
    getAllUser();
  }, []);
  const getAllUser = async () => {
    try {
      const res = await fetch("/api/admin/allUsers");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return user.userName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleEdit = (userId) => {
    navigate(`/admin/editUser/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`/api/admin/deleteUser/${userId}`, {
        method: "DELETE",
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      const data = res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateUser =()=>{
    navigate("/admin/createNewUser")
  }

 

  return (
    <div>
      <h1 className="font-bold text-2xl text-center p-3">User List</h1>

      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search users..."
          onChange={handleSearchChange}
          value={searchQuery}
          className="w-full max-w-xs p-2 border border-gray-400 rounded-md mb-3"
        />
      </div>
      <div className="p-3">
      <button onClick={handleCreateUser} className="bg-black text-white rounded-full p-4 mr-3">Create User</button>
      </div>
      <div className="flex flex-col bg-slate-400 max-w-4xl mx-auto">
        <div className="flex bg-slate-400 justify-between max-w-4xl">
          <h3>S.No</h3>
          <h3 >Name</h3>
          <h3>Email</h3>
          <h3>Update</h3>
          <h3>Delete</h3>
          <h3 className="mr-3">Image</h3>
        </div>
        {filteredUsers.map((user, index) => (
          <div
            className="flex bg-white justify-between items-center py-2 px-4"
            key={index}
          >
            <span className="w-1/6 -mr-10">{index + 1}</span>
            <span className="w-1/6">{user.userName}</span>
            <span className="w-1/6">{user.email}</span>

            <button
              onClick={() => handleEdit(user._id)}
              className="w-1/6  bg-blue-600 rounded-lg"
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              className="w-1/6 bg-red-600 rounded-lg "
              type="button"
            >
              Delete
            </button>
            <img className="w-28 h-14 -mr-4" src={user.profileImage} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
