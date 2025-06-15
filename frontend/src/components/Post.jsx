import axios from "axios";
import React, { useEffect, useState } from "react";

const Post = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fn = async () => {
      const res = await axios.get("https://dummyjson.com/posts");
      console.log(res);
    };
    fn();
  }, []);

  if (data) return <div className="py-28"></div>;
};

export default Post;
