import { FC, useEffect, useState } from "react";

// components
import { Form, Row, Col } from "antd";
import { TextField, TextAreaField } from "src/components/ui/FieldForm";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { configs } from "src/base/global/global";
import { contexSuperAdmin } from "src/base/contex/SuperAdminContex";

export const FormUser: FC<{
  state: string;
  setState: (e: string) => void;
  getData: () => Promise<void>;
}> = ({ state, setState, getData }) => {
  const { globalSuperAdmin, setGlobalSuperAdmin } = contexSuperAdmin();

  const [form] = useForm();
  const validateMessages = {
    required: "${label} wajib diisi",
  };
  const initialValues = {
    user_type: "",
    user_content: "",
  } as { [key: string]: string | [] | {} };

  const [loadingSave, setLoadingSave] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    assignFormValue();
  }, []);

  const assignFormValue = () => {
    if (!!Object.keys(globalSuperAdmin.dataUserById)) {
      Object.keys(initialValues).forEach((key: string) => {
        form.setFieldValue(
          key,
          (globalSuperAdmin.dataUserById as any)[key.toLowerCase()]
        );
      });
      // re-assign value form
    } else {
      // set initial value form
      Object.keys(initialValues).forEach((key: string) => {
        form.setFieldValue(key, undefined);
      });
      // re-assign value form
    }
  };

  const onAdd = async () => {
    if (!!loadingSave) return;
    setLoadingSave(true);

    const f = form.getFieldsValue();
    await axios
      .post(
        `${configs.url_backend}/api/user/adduser`,
        {
          user_type: f.user_type,
          user_content: f.user_content,
        },
        {
          headers: {
            Authorization: `Bearer ${(window as any).user.auth.access_token}`,
          },
        }
      )
      .then((res: any) => {
        if (!!res) {
          setLoadingSave(false);
          getData();
          setState("List");
        }
      });
  };

  const onUpdate = async () => {
    if (!!loadingSave) return;
    setLoadingSave(true);

    const f = form.getFieldsValue();
    await axios
      .post(
        `${configs.url_backend}/api/user/${globalSuperAdmin.dataUserById.id}`,
        {
          user_type: f.user_type,
          user_content: f.user_content,
        },
        {
          headers: {
            Authorization: `Bearer ${(window as any).user.auth.access_token}`,
          },
        }
      )
      .then((res: any) => {
        if (!!res) {
          setLoadingSave(false);
          getData();
          setState("List");
        }
      });
  };

  return (
    <>
      <div className="mb-3 pb-3 flex items-center justify-between border-b border-b-[#E0E0E0]">
        <h3 className="text-2xl">{state}</h3>
      </div>
      <div className="mt-3">
        <Form
          onFinish={state.includes("Add") ? onAdd : onUpdate}
          form={form}
          layout="vertical"
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Row>
            <Col span={24} className="px-2">
              <Form.Item
                label={"User Type"}
                name={"user_type"}
                rules={[{ required: true }]}
              >
                <TextField
                  placeholder={"user type"}
                  disabled={state.includes("View")}
                />
              </Form.Item>

              <Form.Item
                label={"User"}
                name={"user_content"}
                rules={[{ required: true }]}
              >
                <TextAreaField
                  placeholder={"user"}
                  disabled={state.includes("View")}
                />
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
