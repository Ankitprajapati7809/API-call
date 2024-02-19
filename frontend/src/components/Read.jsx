import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");

  const getData = async () => {
    const response = await fetch("http://localhost:4000", {
      method: "GET",
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
      setResponse(result);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handelDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    } else {
      console.log(result);
      setError("Deleted Successfully");

      setTimeout(() => {
        setError("");
        getData();
      }, 0);
    }
  };

  return (
    <>
      <h2 className="text-center mt-3">All data</h2>
      <div className="container my-5">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="row">
          {response.map((data) => {
            return (
              <div className="card col-4 mt-4" key={data._id}>
                <div className="card-body">
                  <h5 className="card-title">{data._id}</h5>
                  <h5 className="card-title">{data.name}</h5>
                  <p className="card-text">{data.email}</p>
                  <p className="card-text">age: {data.age}</p>
                  <Link to={`/${data._id}`} className="card-link">
                    Edit Link
                  </Link>
                  <button
                    onClick={() => {
                      handelDelete(data._id);
                    }}
                    type="button"
                    className="btn btn-outline-danger btn-sm "
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Read;
