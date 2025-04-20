import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Entertainer } from "../data/EntertainerType";
import {
  fetchEntertainerById,
  deleteEntertainer,
} from "../api/Entertainers.API";

const EntertainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchEntertainerById(Number(id))
      .then(setEntertainer)
      .catch((err) => console.error("Error fetching entertainer:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEdit = () => {
    navigate(`/entertainers/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this entertainer?")) {
      await deleteEntertainer(Number(id));
      navigate("/entertainers");
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
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <h2 className="text-center mb-4">{entertainer.entStageName}</h2>

      <table className="table table-bordered table-striped">
        <tbody>
          {Object.entries(entertainer).map(([key, value]) => (
            <tr key={key}>
              <th className="text-capitalize">{key}</th>
              <td>{String(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-4">
        <button onClick={handleEdit} className="btn btn-warning me-3">
          Edit
        </button>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default EntertainerDetails;
