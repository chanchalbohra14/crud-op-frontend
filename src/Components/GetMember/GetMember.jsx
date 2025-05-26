import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./GetMember.css";

const url = import.meta.env.VITE_BACKEND_URL;

const GetMember = () => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const fetchmember = await axios.get(`${url}/member/getmember/${id}`);
        console.log(fetchmember.data);
        setMember(fetchmember.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchMember();
  }, []);

  if (loading) return <p>loading...</p>;

  return (
    <div className="card-container">
      <div className="card">
        <h2>{member.Name}</h2>
        <p>
          <strong>Age:</strong> {member.Age}
        </p>
        <p>
          <strong>Gender:</strong> {member.Gender}
        </p>
        <p>
          <strong>Course:</strong> {member.Course}
        </p>
        <p>
          <strong>Contact:</strong> {member.Contact}
        </p>
        <p>
          <strong>Address:</strong> {member.Address}
        </p>
      </div>
    </div>
  );
};

export default GetMember;
