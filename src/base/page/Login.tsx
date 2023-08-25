import { useEffect, useState } from "react";

// components
import { FormLogin } from "src/components/login/FormLogin";
import { FormRegister } from "src/components/login/FormRegister";

const Login = () => {
  const [tab, setTab] = useState<string>("login");

  useEffect(() => {
    document.title = "Login - Travel App";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-0 p-0">
      {tab === "login" ? (
        <FormLogin setTab={setTab} />
      ) : (
        <FormRegister setTab={setTab} />
      )}
    </div>
  );
};

export default Login;
