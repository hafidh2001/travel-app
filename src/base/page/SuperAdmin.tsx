import { useEffect } from "react";

// components

const SuperAdmin = () => {
  useEffect(() => {
    document.title = "SuperAdmin - Travel App";
    window.scrollTo(0, 0);
  }, []);

  return <div className="m-0 p-0"></div>;
};

export default SuperAdmin;
