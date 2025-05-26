import React from "react";
import { useForm } from "react-hook-form";
import "./MemberForm.css";
import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;
const MemberForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${url}/member/createmember`, data);
      console.log("post method", res.data);
      if (res.status === 201) {
        alert("form submitted successfully");
        reset();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="member-form">
        <h2>APPLICATION FORM</h2>
        <label className="form-label">name:</label>
        <input
          type="text"
          placeholder="enter your name"
          className="form-input"
          {...register("Name", {
            required: "name is required",
          })}
        />
        {errors["Name"] && <p className="error">{errors["Name"].message}</p>}

        <label className="form-label">age:</label>
        <input
          type="number"
          placeholder="enter your age"
          className="form-input"
          {...register("Age", {
            required: "age is required",
            minLength: 2,
            maxLength: 2,
          })}
        />
        {errors["Age"] && <p className="error">{errors["Age"].message}</p>}

        <label className="form-label">gender:</label>
        <input
          type="radio"
          value="female"
          {...register("Gender", { required: "gender is required" })}
        />
        <label>female</label>
        <input
          type="radio"
          value="male"
          {...register("Gender", { required: "gender is required" })}
        />
        <label>male</label>
        <input
          type="radio"
          value="others"
          {...register("Gender", { required: "gender is required" })}
        />
        <label>others</label>

        {errors["Gender"] && (
          <p className="error">{errors["Gender"].message}</p>
        )}

        <label className="form-label">course:</label>
        <select
          className="form-input"
          {...register("Course", { required: "course is required" })}
        >
          <option value="">choose your course</option>
          <option value="bca">BCA </option>
          <option value="bba"> BBA</option>
          <option value="bcom"> BCOM</option>
        </select>
        {errors["Course"] && (
          <p className="error">{errors["Course"].message}</p>
        )}

        <label className="form-label">contact</label>
        <input
          type="number"
          placeholder="enter your contact number"
          className="form-input"
          {...register("Contact", {
            required: "contact number is required",
            minLength: 10,
            maxLength: 10,
          })}
        />
        {errors["Contact"] && (
          <p className="error">{errors["Contact"].message}</p>
        )}

        <label className="form-label">address:</label>
        <textarea
          className="form-textarea"
          {...register("Address", { required: "address is required" })}
        />
        {errors["Address"] && (
          <p className="error">{errors["Address"].message}</p>
        )}

        <input type="submit" value="Submit" className="submit-btn" />
      </form>
    </div>
  );
};

export default MemberForm;
