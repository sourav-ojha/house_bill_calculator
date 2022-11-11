import React from "react";
import "./style.css";
const Loading = () => {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Loading;
