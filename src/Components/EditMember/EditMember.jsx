import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_BACKEND_URL;
import "./EditMember.css";
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
    const issame = JSON.stringify(data) === JSON.stringify(member);
    if (issame) {
      alert("no changes made");
      return;
    }
    try {
      const update = await axios.patch(
        `${url}/member/updatemember/${id}`,
        data
      );
      console.log(update.data);
      if (update.status === 200) {
        alert("upadate member successfully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteMember = async () => {
    try {
      console.log(id);
      const del = await axios.delete(`${url}/member/deletemember/${id}`);

      if (del.status === 200) {
        alert("member deleted successfully");
        navigate("/getmembers");
      }
    } catch (error) {
      console.log("failed to delete member", error.message);
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className="form-wrapper">
      <div className="edit-form-container">
        <h2>Edit Member</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="member-form">
          <h2>APPLICATION FORM</h2>

          <label className="form-label" htmlFor="name">
            name:
          </label>
          <input
            id="name"
            type="text"
            placeholder="enter your name"
            className="form-input"
            {...register("Name", {
              required: "name is required",
            })}
          />

          <label className="form-label" htmlFor="age">
            age:
          </label>
          <input
            id="age"
            type="number"
            placeholder="enter your age"
            className="form-input"
            {...register("Age", {
              required: "age is required",
              minLength: 2,
              maxLength: 2,
            })}
          />

          <div className="gender-group">
            <span className="form-label">gender:</span>
            <input
              type="radio"
              value="female"
              id="female"
              {...register("Gender", { required: "gender is required" })}
            />
            <label htmlFor="female">female</label>

            <input
              type="radio"
              value="male"
              id="male"
              {...register("Gender", { required: "gender is required" })}
            />
            <label htmlFor="male">male</label>

            <input
              type="radio"
              value="others"
              id="others"
              {...register("Gender", { required: "gender is required" })}
            />
            <label htmlFor="others">others</label>
          </div>

          <label className="form-label" htmlFor="course">
            course:
          </label>
          <select
            id="course"
            className="form-input"
            {...register("Course", { required: "course is required" })}
          >
            <option value="">choose your course</option>
            <option value="bca">BCA </option>
            <option value="bba"> BBA</option>
            <option value="bcom"> BCOM</option>
          </select>

          <label className="form-label" htmlFor="contact">
            contact:
          </label>
          <input
            id="contact"
            type="number"
            placeholder="enter your contact number"
            className="form-input"
            {...register("Contact", {
              required: "contact number is required",
              minLength: 10,
              maxLength: 10,
            })}
          />

          <label className="form-label" htmlFor="address">
            address:
          </label>
          <textarea
            id="address"
            className="form-textarea"
            {...register("Address", { required: "address is required" })}
          />

          <input type="submit" value="update member" className="submit-btn" />
        </form>
        <button onClick={deleteMember} className="delbutton">
          delete member
        </button>
      </div>
    </div>
  );
};

export default EditMember;
