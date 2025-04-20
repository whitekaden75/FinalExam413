import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entertainer } from "../data/EntertainerType";
import {
  fetchEntertainerById,
  updateEntertainer,
} from "../api/Entertainers.API";

const EditEntertainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchEntertainerById(Number(id))
      .then(setEntertainer)
      .catch((err) => console.error("Failed to fetch entertainer:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!entertainer) return;
    const { name, value } = e.target;
    setEntertainer({ ...entertainer, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entertainer) return;

    try {
      await updateEntertainer(entertainer.entertainerID, entertainer);
      navigate(`/entertainers/${entertainer.entertainerID}`);
    } catch (error) {
      console.error("Failed to update entertainer:", error);
    }
  };

  if (loading)
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );

  if (!entertainer)
    return (
      <div className="text-center text-danger">Entertainer not found.</div>
    );

  return (
    <div className="container py-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4 text-center">Edit Entertainer</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(entertainer).map(([key, value]) =>
          typeof value === "number" && key !== "entertainerID" ? (
            <div className="mb-3" key={key}>
              <label className="form-label text-capitalize">{key}</label>
              <input
                type="number"
                name={key}
                className="form-control"
                value={value}
                onChange={handleChange}
              />
            </div>
          ) : key === "entertainerID" ||
            key === "timesBooked" ||
            key === "lastBookedDate" ? null : (
            <div className="mb-3" key={key}>
              <label className="form-label text-capitalize">{key}</label>
              <input
                type="text"
                name={key}
                className="form-control"
                value={value as string}
                onChange={handleChange}
              />
            </div>
          )
        )}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEntertainer;
