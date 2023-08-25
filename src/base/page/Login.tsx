import { useEffect } from "react";
import { FormLogin } from "src/components/login/FormLogin";

const Login = () => {
  useEffect(() => {
    document.title = "Login - Travel App";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="m-0 p-0">
      <FormLogin />
    </div>
  );
};

export default Login;
