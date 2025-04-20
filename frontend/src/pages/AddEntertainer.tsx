import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Entertainer } from "../data/EntertainerType";
import { createEntertainer } from "../api/Entertainers.API";

const AddEntertainer = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<
    Omit<Entertainer, "entertainerID" | "timesBooked" | "lastBookedDate">
  >({
    entStageName: "",
    entSSN: "",
    entStreetAddress: "",
    entCity: "",
    entState: "",
    entZipCode: 0,
    entPhoneNumber: "",
    entWebPage: "",
    entEmailAddress: "",
    dateEntered: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "entZipCode" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEntertainer(form);
      navigate("/entertainers");
    } catch (error) {
      console.error("Failed to add entertainer:", error);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4 text-center">Add New Entertainer</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, value]) => (
          <div className="mb-3" key={key}>
            <label className="form-label text-capitalize">{key}</label>
            <input
              type={key === "entZipCode" ? "number" : "text"}
              name={key}
              className="form-control"
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Add Entertainer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEntertainer;
