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

export const FormRegister: FC<{
  setTab: (e: string) => void;
}> = ({ setTab }) => {
  const [form] = useForm();
  const validateMessages = {
    required: "${label} wajib diisi",
  };
  const initialValues = {
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  } as { [key: string]: string | [] | {} };

  const [loading, setLoading] = useState<boolean>(false);

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

  const onRegister = async () => {
    try {
      if (!!loading) return;
      setLoading(true);

      const f = form.getFieldsValue();

      await axios
        .post(`${configs.url_backend}/api/register`, {
          email: f.email,
          name: f.name,
          password: f.password,
          password_confirmation: f.password_confirmation,
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

            window.location.href = "/";
            setLoading(false);
          }
        });
    } catch {
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
        <div className="mt-5">
          <Form
            onFinish={onRegister}
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
                  label={"Name"}
                  name={"name"}
                  rules={[{ required: true }]}
                >
                  <TextField placeholder={"name"} />
                </Form.Item>
                <Form.Item
                  label={"Password"}
                  name={"password"}
                  rules={[{ required: true }]}
                >
                  <PasswordField placeholder={"password"} />
                </Form.Item>
                <Form.Item
                  label={"Password Confirmation"}
                  name={"password_confirmation"}
                  rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The password that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <PasswordField placeholder={"password confirmation"} />
                </Form.Item>
              </Col>
            </Row>

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
              <span className="text-white font-semibold">Sign up</span>
              {!!loading && (
                <IconLoading className="w-4 h-4 animate-spin text-white fill-gray-700" />
              )}
            </button>

            <p
              className="mt-4 text-xs text-gray-500 text-center cursor-pointer outline-none group hover:underline"
              onClick={() => {
                setTab("login");
              }}
            >
              Already have an account?{" "}
              <span className="group-hover:text-blue-600">Sign in</span>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};
