import React, { ReactPortal } from "react";
import ReactDOM from "react-dom";

const Portal = (props: React.PropsWithChildren): ReactPortal => {
  const element = document.getElementById("__next");
  if (element === null) {
    throw new Error("");
  }
  console.log("element", element);
  return ReactDOM.createPortal(props.children, element);
};

export default Portal;
