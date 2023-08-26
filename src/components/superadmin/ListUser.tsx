import { FC, useEffect, useState } from "react";

// components
import {
  IconAlertCircle,
  IconEdit,
  IconPlus,
  IconTrash,
} from "src/components/ui/Icon";

import { Form, Row, Col } from "antd";
import { SearchField, TextField } from "src/components/ui/FieldForm";
import { useForm } from "antd/es/form/Form";

import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { contexSuperAdmin } from "src/base/contex/SuperAdminContex";
import { IUserById } from "../../base/global/interface";
import { contexLayout } from "../../base/contex/LayoutContext";

export const List: FC<{
  setState: (e: string) => void;
  getData: (name?: string, role?: string) => Promise<void>;
  getDataUserById: (e: number) => Promise<void>;
}> = ({ setState, getData, getDataUserById }) => {
  const { globalLayout } = contexLayout();
  const { globalSuperAdmin, setGlobalSuperAdmin } = contexSuperAdmin();

  useEffect(() => {
    setState("List");
    setGlobalSuperAdmin({
      ...globalSuperAdmin,
      dataUserById: {} as IUserById,
      selected_userId: 0,
    });
  }, []);

  const [form] = useForm();
  const initialValues = {
    name: "",
    role: "",
  } as { [key: string]: string | [] | {} };

  const onSearch = async () => {
    const f = form.getFieldsValue();
    getData(f.name, f.role);
  };

  const [currentPage, setCurrentPage] = useState<number>(1); // Halaman saat ini
  const pageSize = 10; // Jumlah baris per halaman

  const tablePagination = {
    pageSize,
    onChange: (page: any) => setCurrentPage(page), // Perbarui halaman saat ini
  };

  const columns: ColumnsType<
    any & {
      key: string;
    }
  > = [
    {
      title: "No",
      key: "no",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Opsi",
      key: "id",
      render: (_, { id }) => (
        <div className="flex items-center space-x-3">
          <button
            className="p-2 bg-[#699af9] rounded-md cursor-pointer outline-none"
            onClick={async () => {
              await getDataUserById(id);
              setState("Edit Prompt");
            }}
          >
            <IconEdit className="w-4 h-4 text-[#0F3173]" />
          </button>
          <button
            className="p-2 bg-[#f96969] rounded-md cursor-pointer outline-none"
            onClick={() => {
              setGlobalSuperAdmin({
                ...globalSuperAdmin,
                selected_userId: id,
                popupDelete: true,
              });
            }}
          >
            <IconTrash className="w-4 h-4 text-[#840E0E]" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mb-3 pb-3 flex items-center justify-between border-b border-b-[#E0E0E0]">
        <h3 className="text-2xl">Data User</h3>
        <button
          className="px-4 py-2 flex items-center bg-[#2f80ed] text-white rounded-md cursor-pointer outline-none"
          onClick={() => {
            setState("Add User");
          }}
        >
          <IconPlus className="w-5 h-5 mr-2" />
          <span>Add</span>
        </button>
      </div>
      <div className="flex justify-end">
        <div className="w-[50%]">
          <Form
            onFinish={onSearch}
            form={form}
            layout="vertical"
            initialValues={initialValues}
          >
            <Row className="md:flex md:justify-end">
              <Col span={globalLayout.width < 768 ? 24 : 6} className="md:mr-2">
                <Form.Item name={"name"} rules={[]}>
                  <SearchField placeholder={"search by name"} />
                </Form.Item>
              </Col>
              <Col span={globalLayout.width < 768 ? 24 : 6}>
                <Form.Item name={"role"} rules={[]}>
                  <SearchField placeholder={"search by role"} />
                </Form.Item>
              </Col>
              <Col
                span={globalLayout.width < 768 ? 24 : 6}
                className="md:ml-2 md:-mt-2 flex items-center space-x-2"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    form.submit();
                  }}
                  className={`py-2 px-3 w-[200px] bg-blue-primary box-border rounded-xl cursor-pointer outline-none`}
                >
                  <span className="text-white font-semibold">Search</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    form.setFieldValue("title", undefined);
                    form.setFieldValue("rating", undefined);
                    form.submit();
                  }}
                  className={`py-2 px-3 w-[200px] bg-gray-600 box-border rounded-xl cursor-pointer outline-none`}
                >
                  <span className="text-white font-semibold">Reset</span>
                </button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div className="mt-3">
        <Table
          rowKey={"id"} // solved when get data from db because have column id (unique)
          columns={columns}
          dataSource={globalSuperAdmin.listUser}
          loading={globalSuperAdmin.loadingListUser}
          pagination={tablePagination}
        />
      </div>
    </>
  );
};
