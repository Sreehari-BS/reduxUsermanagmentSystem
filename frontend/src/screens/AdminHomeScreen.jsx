import React, { useEffect, useState } from "react";
import "../styles/AdminHomeScreen.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import AdminForm from "../components/AdminForm";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000/api/admin";

const AdminHomeScreen = () => {
  const [addSection, setAddSection] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [editformData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    _id: "",
  });

  const [listData, setListData] = useState("");

  const [editSection, setEditSection] = useState(false);

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    if (data.data) {
      setListData((prevListData) => [...prevListData, data.data]);
      setAddSection(false);
    }
  };

  const getUserData = async () => {
    const data = await axios.get("/adminHome");
    if (data.data) {
      setListData(data.data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete(`/delete/${id}`);
    if (data.data) {
      getUserData();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/updateUser", editformData);
    if (data.data) {
      getUserData();
      setEditSection(false)
    }
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setEditFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEdit = (user) => {
    setEditFormData(user);
    setEditSection(true);
  };

  const handleSignOut = async () => {
    await axios.post("/adminLogout")
    navigate("/admin")
  }

  return (
    <>
      <div className="homeContainer">
        <Button onClick={() => setAddSection(true)} variant="success">
          ADD +
        </Button>

        <Button onClick={handleSignOut} className="adminSignOutBtn" variant="danger">Sign Out</Button>

        {addSection && (
          <AdminForm
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleClose={() => setAddSection(false)}
            rest={formData}
          />
        )}

        {editSection && (
          <AdminForm
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleClose={() => setEditSection(false)}
            rest={editformData}
          />
        )}

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listData && listData[0] ? (
                listData.map((user) => {
                  return (
                    <tr>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Button
                          onClick={() => handleEdit(user)}
                          variant="info"
                          className="m-2"
                        >
                          <strong>Edit</strong>
                        </Button>
                        <Button
                          onClick={() => handleDelete(user._id)}
                          variant="danger"
                        >
                          <strong>Delete</strong>
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p className="text-center">No Data Available</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminHomeScreen;
