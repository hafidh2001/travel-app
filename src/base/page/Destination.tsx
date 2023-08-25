import { useEffect } from "react";

// components

const Destination = () => {
  useEffect(() => {
    document.title = "Destination - Travel App";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-0 p-0 bg-blue-200">
      <p>destination</p>
      {/* search */}
      {/* data */}
    </div>
  );
};

export default Destination;
