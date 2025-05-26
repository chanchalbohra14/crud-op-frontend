import axios from "axios";
import React, { useEffect, useState } from "react";
const url = import.meta.env.VITE_BACKEND_URL;
import "./GetMembers.css";
import { FaEye, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
const GetMembers = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const member = await axios.get(`${url}/member/getmembers`);
        const d = member.data;
        setMembers(d);
        console.log("data", d);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMembers();
  }, []);

  const handleView = (id) => {
    navigate(`/getmember/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/editmember/${id}`);
  };

  if (loading)
    return (
      <div className="loader">
        <BeatLoader />
      </div>
    );

  return (
    <div className="page">
      <div className="table-wrapper">
        <h2>Member List</h2>
        <table className="member-table">
          <thead>
            <tr>
              <th>name</th>
              <th>age</th>
              <th>gender</th>
              <th>course</th>
              <th>contact</th>
              <th>address</th>
              <th>view</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            {members.map((e, index) => (
              <tr key={index}>
                <td>{e.Name}</td>
                <td>{e.Age}</td>
                <td>{e.Gender}</td>
                <td>{e.Course}</td>
                <td>{e.Contact}</td>
                <td>{e.Address}</td>
                <td>
                  <FaEye onClick={() => handleView(e._id)} />
                </td>
                <td>
                  <FaEdit onClick={() => handleEdit(e._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetMembers;
