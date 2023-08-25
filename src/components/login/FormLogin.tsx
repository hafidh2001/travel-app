import { FC, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { configs } from "src/base/global/global";
import { getUserById } from "src/utils/ws";
import { IUserById } from "src/base/global/interface";

// components
import { Form, Row, Col } from "antd";
import { TextField, PasswordField } from "src/components/ui/FieldForm";
import { useForm } from "antd/es/form/Form";
import { IconLoading } from "src/components/ui/Icon";

export const FormLogin: FC<{
  setTab: (e: string) => void;
}> = ({ setTab }) => {
  const [form] = useForm();
  const validateMessages = {
    required: "${label} wajib diisi",
  };
  const initialValues = {
    email: "",
    password: "",
  } as { [key: string]: string | [] | {} };

  const [loading, setLoading] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    assignFormValue();
  }, []);

  const assignFormValue = () => {
    // set initial value form
    Object.keys(initialValues).forEach((key: string) => {
      form.setFieldValue(key, undefined);
    });
    // re-assign value form
  };

  const onLogin = async () => {
    try {
      if (!!loading) return;
      setLoading(true);
      setErrorLogin(false);

      const f = form.getFieldsValue();

      await axios
        .post(`${configs.url_backend}/api/login`, {
          email: f.email,
          password: f.password,
        })
        .then(async (res: any) => {
          if (!!res) {
            const { id, email, name } = res.data.data.user;
            const token = res.data.data.token;
            // get user by id
            const userById = (await getUserById(id, token)) as IUserById;
            const role = !!userById ? userById.roles[0].name : "";

            // save to storage
            const credential = btoa(
              JSON.stringify({
                id,
                email,
                name,
                role,
                token: res.data.data.token,
              })
            );

            if (typeof Storage !== "undefined")
              localStorage.setItem(configs.storage_user, credential);

            window.location.href = role === "superadmin" ? "/superadmin" : "/";
            setLoading(false);
          }
        });
    } catch {
      setErrorLogin(true);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center box-border overflow-hidden">
      <div className="p-6 w-[90%] md:w-[25%] bg-white rounded-xl">
        <div className="mb-5 mx-auto w-fit flex items-center space-x-3">
          <img
            src="https://datacakra.com/wp-content/uploads/2020/08/cropped-Datacakra_Logo-192x192.png"
            alt="travel-app datacakra"
            className="w-14"
          />
          <span className="text-2xl font-bold font-Montserrat text-blue-800">
            Travel App
          </span>
        </div>
        {!!errorLogin && (
          <p className="mt-5 -mb-4 text-red-700 font-bold">
            wrong email or password
          </p>
        )}
        <div className="mt-5">
          <Form
            onFinish={onLogin}
            form={form}
            layout="vertical"
            initialValues={initialValues}
            validateMessages={validateMessages}
          >
            <Row className="-mx-2">
              <Col span={24} className="px-2">
                <Form.Item
                  label={"Email"}
                  name={"email"}
                  rules={[
                    { required: true },
                    {
                      type: "email",
                      pattern: /^\S+@\S+\.\S+$/,
                      message: "format : youremail@example.com",
                    },
                  ]}
                >
                  <TextField placeholder={"email"} />
                </Form.Item>
                <Form.Item
                  label={"Password"}
                  name={"password"}
                  rules={[{ required: true }]}
                >
                  <PasswordField placeholder={"password"} />
                </Form.Item>
              </Col>
            </Row>

            <div className="mt-4 mx-1 flex justify-between items-start">
              <div className="flex items-start md:items-center">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="mt-1 md:mt-0 w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                />
                <label className="ml-3 text-gray-500 text-sm">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-end cursor-pointer text-sm font-medium text-primary-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                form.submit();
              }}
              className={`mt-8 py-3 px-3 w-full flex justify-center items-center space-x-2 bg-blue-primary box-border rounded-xl ${
                !!loading ? "opacity-70" : ""
              }`}
              disabled={loading}
            >
              <span className="text-white font-semibold">Sign in</span>
              {!!loading && (
                <IconLoading className="w-4 h-4 animate-spin text-white fill-gray-700" />
              )}
            </button>

            <p
              className="mt-4 text-xs text-gray-500 text-center cursor-pointer outline-none group hover:underline"
              onClick={() => {
                setTab("register");
              }}
            >
              Don't have an account yet?{" "}
              <span className="group-hover:text-blue-600">Sign up</span>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};
