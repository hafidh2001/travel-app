import { FC, useEffect, useState } from "react";
import { IconTrash } from "./Icon";
import axios from "axios";
import { configs } from "../../base/global/global";
import { contexSuperAdmin } from "../../base/contex/SuperAdminContex";

import { Form, Row, Col } from "antd";
import { TextField, SelectField } from "src/components/ui/FieldForm";
import { useForm } from "antd/es/form/Form";
import { getAllUser } from "../../utils/ws";

export const PopupAssignRole: FC<{}> = ({}) => {
  const { globalSuperAdmin, setGlobalSuperAdmin } = contexSuperAdmin();
  const [loadingSave, setLoadingSave] = useState<boolean>(false);

  const [form] = useForm();
  const validateMessages = {
    required: "${label} wajib diisi",
  };
  const initialValues = {
    email: "",
    name: "",
  } as { [key: string]: string };

  useEffect(() => {
    assignFormValue();
  }, []);

  const assignFormValue = () => {
    if (Object.keys(globalSuperAdmin.dataUserById).length > 0) {
      // set initial value form
      Object.keys(initialValues).forEach((key: string) => {
        form.setFieldValue(
          key,
          (globalSuperAdmin.dataUserById as any)[key.toLowerCase()]
        );
      });
      // re-assign value form
      form.setFieldValue(
        "role",
        (globalSuperAdmin.dataUserById as any).roles.length !== 0
          ? (globalSuperAdmin.dataUserById as any).roles[0].name
          : undefined
      );
    }
  };

  const getData = async (name?: string, role?: string) => {
    if (!!globalSuperAdmin.loadingListUser) return;
    setGlobalSuperAdmin({
      ...globalSuperAdmin,
      loadingListUser: true,
    });

    await getAllUser(name, role).then((res: any) => {
      if (!!res) {
        setGlobalSuperAdmin({
          ...globalSuperAdmin,
          listUser: res,
          loadingListUser: false,
          popup: false,
        });
      }
    });
  };

  const onAssignRole = async () => {
    try {
      if (!!loadingSave) return;
      setLoadingSave(true);

      const f = form.getFieldsValue();
      await axios
        .post(
          `${configs.url_backend}/api/user/role/${globalSuperAdmin.dataUserById.id}`,
          {
            role: f.role,
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
          }
        });
      setLoadingSave(false);
    } catch {
      setLoadingSave(false);
    }
  };

  const list_role = [
    {
      label: "Super Admin",
      value: "superadmin",
    },
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "User",
      value: "user",
    },
  ];

  return (
    <div
      className="w-full h-screen bg-black/40 z-[100] fixed flex items-center justify-center"
      onClick={() => {
        setGlobalSuperAdmin({
          ...globalSuperAdmin,
          popup: false,
        });
      }}
    >
      <div
        className="px-10 py-16 w-[50%] bg-white rounded-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Form
          onFinish={onAssignRole}
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
                rules={[{ required: true }]}
              >
                <TextField placeholder={"email"} disabled={true} />
              </Form.Item>

              <Form.Item
                label={"Name"}
                name={"name"}
                rules={[{ required: true }]}
              >
                <TextField placeholder={"name"} disabled={true} />
              </Form.Item>

              <Form.Item
                label={"Role"}
                name={"role"}
                rules={[{ required: true }]}
              >
                <SelectField
                  placeholder={"role"}
                  onChange={(v) => {}}
                  allowClear={false}
                  options={list_role.map((e: any) => ({
                    value: e.value,
                    label: e.name,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

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
                setGlobalSuperAdmin({
                  ...globalSuperAdmin,
                  popup: false,
                });
              }}
              className={`py-3 px-3 w-[120px] bg-[#fc7171] box-border rounded-xl cursor-pointer outline-none`}
            >
              <span className="text-white font-semibold">Cancel</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
