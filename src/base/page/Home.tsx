import { useEffect } from "react";

// components

const Home = () => {
  useEffect(() => {
    document.title = "Homepage - Travel App";
    window.scrollTo(0, 0);
  }, []);

  return <div className="m-0 p-0"></div>;
};

export default Home;
