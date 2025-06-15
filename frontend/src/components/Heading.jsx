// rafce

import React from "react";
import Login from "./Login";
import Post from "./Post";

const Heading = () => {
  // Logic part
  let campus = "Damak Model Campus";

  // return part
  return (
    <>
      <div className="text-red-800 bg-amber-500 ">Welcome to {campus} !👍</div>
      {/* <Login/> */}
      <Post/>
    </>
  );
};

export default Heading;
