import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="bg-light py-5 min-vh-100 d-flex align-items-center">
      <div className="container text-center">
        <div className="mb-5">
          <h1 className="display-4 fw-bold">
            Welcome to Spotlight Entertainment
          </h1>
          <p className="lead mt-3 mb-4 mx-auto" style={{ maxWidth: "800px" }}>
            We connect you with talented entertainers for your most important
            events — from weddings and corporate parties to festivals and
            private celebrations. Whether you're looking for live music, comedy,
            or something truly unique, we're here to make your event
            unforgettable.
          </p>
          <Link to="/entertainers" className="btn btn-dark btn-lg px-4">
            Browse All Entertainers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
