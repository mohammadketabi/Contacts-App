import React from "react";

const Loader = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
