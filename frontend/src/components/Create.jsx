import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [data, setData] = useState({
    name: "",
    email: "",
    age: 0,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(data.name, data.email, data.age);

  const handelInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const addUser = { name: data.name, email: data.email, age: data.age };
    const response = await fetch("http://localhost:4000", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    } else {
      console.log(result);
      setError("");
      setData({
        name: "",
        email: "",
        age: 0,
      });
      navigate("/all");
    }
  };

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error}</div>}
      <h2 className="text-center">Enter the data</h2>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={data.name}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={data.email}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={data.age}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
