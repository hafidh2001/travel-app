import { FC, useEffect } from "react";

// components
import { Form, Row, Col } from "antd";
import { TextField, TextAreaField } from "src/components/ui/FieldForm";
import { useForm } from "antd/es/form/Form";

export const Filter: FC<{}> = () => {
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
    const f = form.getFieldsValue();
    console.log(f.title);
    // await axios
    //   .post(
    //     `${configs.url_backend}/api/prompt/addprompt`,
    //     {
    //       prompt_type: f.prompt_type,
    //       prompt_content: f.prompt_content,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${(window as any).user.auth.access_token}`,
    //       },
    //     }
    //   )
    //   .then((res: any) => {
    //     if (!!res) {
    //       setLoadingSave(false);
    //       getData();
    //       setState("List");
    //     }
    //   });
  };

  return (
    <div className="w-full mb-5 md:px-5 flex justify-end">
      <div className="w-full md:w-[25%]">
        <Form
          onFinish={onSearch}
          form={form}
          layout="vertical"
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Row>
            <Col span={24}>
              <Form.Item name={"title"} rules={[]}>
                <TextField placeholder={"title"} />
              </Form.Item>
              <Form.Item name={"rating"} rules={[]}>
                <TextField placeholder={"rating"} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
