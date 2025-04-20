import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Entertainer } from "../data/EntertainerType";
import { fetchEntertainers } from "../api/Entertainers.API";

const EntertainerList = () => {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntertainers()
      .then(setEntertainers)
      .catch((err) => console.error("Failed to fetch entertainers", err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddEntertainer = () => {
    navigate("/entertainers/add");
  };

  const handleDetails = (id: number) => {
    navigate(`/entertainers/${id}`);
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="d-flex justify-content-center w-100 py-5">
      <div className="w-100" style={{ maxWidth: "900px" }}>
        <h1 className="text-center mb-4">Available Entertainers</h1>

        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark text-center">
              <tr>
                <th>Stage Name</th>
                <th>Times Booked</th>
                <th>Last Booked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entertainers.map((ent) => (
                <tr key={ent.entertainerID}>
                  <td>{ent.entStageName}</td>
                  <td>{ent.timesBooked ?? 0}</td>
                  <td>
                    {ent.lastBookedDate
                      ? new Date(ent.lastBookedDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDetails(ent.entertainerID)}
                      className="btn btn-sm btn-primary">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={handleAddEntertainer}
            className="btn btn-success btn-lg">
            Add Entertainer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntertainerList;
