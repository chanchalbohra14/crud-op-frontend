import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import "./EditMember.css"; // make sure the path is correct
import { BeatLoader } from "react-spinners";

const url = import.meta.env.VITE_BACKEND_URL;

const EditMember = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const getMember = async () => {
      try {
        const res = await axios.get(`${url}/member/getmember/${id}`);
        setMember(res.data);
        reset(res.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMember();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const isSame = JSON.stringify(data) === JSON.stringify(member);
    if (isSame) {
      alert("No changes made");
      return;
    }
    try {
      const update = await axios.patch(
        `${url}/member/updatemember/${id}`,
        data
      );
      if (update.status === 200) {
        alert("Member updated successfully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteMember = async () => {
    try {
      const del = await axios.delete(`${url}/member/deletemember/${id}`);
      if (del.status === 200) {
        alert("Member deleted successfully");
        navigate("/getmembers");
      }
    } catch (error) {
      console.log("Failed to delete member", error.message);
    }
  };

  if (loading)
    return (
      <div className="loader">
        <BeatLoader />
      </div>
    );

  return (
    <div className="edit-form-container">
      <h2>Edit Member</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="member-form">
        <h2>APPLICATION FORM</h2>

        <label className="form-label">Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="form-input"
          {...register("Name", { required: "Name is required" })}
        />

        <label className="form-label">Age:</label>
        <input
          type="number"
          placeholder="Enter your age"
          className="form-input"
          {...register("Age", {
            required: "Age is required",
            minLength: 2,
            maxLength: 2,
          })}
        />

        <label className="form-label">Gender:</label>
        <div className="gender-group">
          <input
            type="radio"
            value="female"
            {...register("Gender", { required: "Gender is required" })}
          />
          <label>Female</label>
          <input
            type="radio"
            value="male"
            {...register("Gender", { required: "Gender is required" })}
          />
          <label>Male</label>
          <input
            type="radio"
            value="others"
            {...register("Gender", { required: "Gender is required" })}
          />
          <label>Others</label>
        </div>

        <label className="form-label">Course:</label>
        <select
          className="form-input"
          {...register("Course", { required: "Course is required" })}
        >
          <option value="">Choose your course</option>
          <option value="bca">BCA</option>
          <option value="bba">BBA</option>
          <option value="bcom">BCOM</option>
        </select>

        <label className="form-label">Contact:</label>
        <input
          type="number"
          placeholder="Enter your contact number"
          className="form-input"
          {...register("Contact", {
            required: "Contact number is required",
            minLength: 10,
            maxLength: 10,
          })}
        />

        <label className="form-label">Address:</label>
        <textarea
          className="form-textarea"
          placeholder="Enter your address"
          {...register("Address", { required: "Address is required" })}
        />

        {/* Side-by-side buttons */}
        <div className="button-group">
          <input type="submit" value="Update Member" className="submit-btn" />
          <button
            type="button"
            onClick={deleteMember}
            className="delbutton-inside"
          >
            Delete Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMember;
