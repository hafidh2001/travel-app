import { FC, useEffect, useState } from "react";

// components
import { Form, Row, Col } from "antd";
import {
  TextField,
  TextAreaField,
  PasswordField,
} from "src/components/ui/FieldForm";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { configs } from "src/base/global/global";

export const FormUser: FC<{
  state: string;
  setState: (e: string) => void;
  getData: () => Promise<void>;
}> = ({ state, setState, getData }) => {
  const [form] = useForm();
  const validateMessages = {
    required: "${label} wajib diisi",
  };
  const initialValues = {
    email: "",
    name: "",
    password: "",
  } as { [key: string]: string };

  const [loadingSave, setLoadingSave] = useState<boolean>(false);

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

  const onAdd = async () => {
    try {
      if (!!loadingSave) return;
      setLoadingSave(true);

      const f = form.getFieldsValue();
      await axios
        .post(
          `${configs.url_backend}/api/user/create`,
          {
            email: f.email,
            name: f.name,
            password: f.password,
          },
          {
            headers: {
              Authorization: `Bearer ${(window as any).user.token}`,
            },
          }
        )
        .then((res: any) => {
          if (!!res) {
            getData();
            setState("List");
          }
        });
      setLoadingSave(false);
    } catch {
      setLoadingSave(false);
    }
  };

  return (
    <>
      <div className="mb-3 pb-3 flex items-center justify-between border-b border-b-[#E0E0E0]">
        <h3 className="text-2xl">{state}</h3>
      </div>
      <div className="mt-3">
        <Form
          onFinish={onAdd}
          form={form}
          layout="vertical"
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Row>
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
                rules={[
                  { required: true },
                  {
                    min: 8,
                    message:
                      "The password field must be between 8 and 255 characters",
                  },
                ]}
              >
                <PasswordField placeholder={"password"} />
              </Form.Item>
            </Col>
          </Row>

          {state.includes("View") ? (
            <div className="mt-5 flex justify-end space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setState("List");
                }}
                className={`py-3 px-3 w-[120px] bg-slate-600 box-border rounded-xl cursor-pointer outline-none`}
              >
                <span className="text-white font-semibold">Back</span>
              </button>
            </div>
          ) : (
            <div className="mt-5 flex justify-end space-x-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  form.submit();
                }}
                className={`py-3 px-3 w-[120px] bg-[#2f80ed] box-border rounded-xl cursor-pointer outline-none ${
                  !!loadingSave ? "opacity-70" : ""
                }`}
                disabled={loadingSave}
              >
                <span className="text-white font-semibold">Submit</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setState("List");
                }}
                className={`py-3 px-3 w-[120px] bg-[#fc7171] box-border rounded-xl cursor-pointer outline-none`}
              >
                <span className="text-white font-semibold">Cancel</span>
              </button>
            </div>
          )}
        </Form>
      </div>
    </>
  );
};
