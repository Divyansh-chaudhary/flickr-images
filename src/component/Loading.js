import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = ({ type }) => {
  return (
    <div
      className="loading-container"
      style={type === "top-loader" ? { marginTop: "5rem" } : {}}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;
