import { useEffect } from "react";

// components

const Index = () => {
  useEffect(() => {
    document.title = "SuperAdmin - Travel App";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-0 p-0">
      <p>superadmin</p>
      <p>superadmin</p>
    </div>
  );
};

export default Index;
