import { FC, useEffect } from "react";

// components
import { Form, Row, Col } from "antd";
import { TextField, TextAreaField } from "src/components/ui/FieldForm";
import { useForm } from "antd/es/form/Form";
import { contexDestination } from "../../base/contex/DestinationContex";
import { getAllDestination } from "../../utils/ws";
import { contexLayout } from "../../base/contex/LayoutContext";

export const Filter: FC<{}> = () => {
  const { globalLayout, setGlobalLayout } = contexLayout();
  const { globalDestination, setGlobalDestination } = contexDestination();
  const [form] = useForm();
  const validateMessages = {
    required: "${label} wajib diisi",
  };

  const initialValues = {
    title: "",
    rating: 0,
  } as { [key: string]: string | number };

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

  const onSearch = async () => {
    if (!!globalDestination.loading) return;
    setGlobalDestination({
      ...globalDestination,
      loading: true,
    });

    const f = form.getFieldsValue();

    await getAllDestination(
      globalLayout.width < 768 ? 5 : 10,
      1,
      f.title,
      f.rating
    ).then((res: any) => {
      if (!!res) {
        setGlobalDestination({
          ...globalDestination,
          list: res.data,
          list_total: res.total,
          pagination: res.links,
          current_page: res.current_page,
          loading: false,
        });
      }
    });
  };

  return (
    <div className="w-full mb-2 md:px-5 flex justify-end">
      <Form
        onFinish={onSearch}
        form={form}
        layout="vertical"
        initialValues={initialValues}
        validateMessages={validateMessages}
      >
        <Row className="flex justify-end">
          <Col span={6} className="mr-2">
            <Form.Item name={"title"} rules={[]}>
              <TextField placeholder={"search by title"} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={"rating"}
              rules={[
                {
                  pattern: /^[0-9]*$/,
                  message: "allow only numeric field value",
                },
              ]}
            >
              <TextField placeholder={"seach by rating"} />
            </Form.Item>
          </Col>
          <Col span={6} className="ml-2 -mt-2 flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                form.submit();
              }}
              className={`py-2 px-3 w-[200px] bg-blue-primary box-border rounded-xl cursor-pointer outline-none`}
            >
              <span className="text-white font-semibold">Submit</span>
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
  );
};
