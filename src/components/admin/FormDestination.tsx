import { FC, useEffect, useState } from "react";
import axios from "axios";
import { configs } from "src/base/global/global";
import { contexDestination } from "src/base/contex/DestinationContex";

// components
import { Form, Row, Col, message, UploadFile } from "antd";
import {
  TextField,
  TextAreaField,
  UploadFileField,
} from "src/components/ui/FieldForm";
import { useForm } from "antd/es/form/Form";

export const FormDestination: FC<{
  tab: string;
  setTab: (e: string) => void;
  getData: () => Promise<void>;
}> = ({ tab, setTab, getData }) => {
  const { globalDestination, setGlobalDestination } = contexDestination();

  const [form] = useForm();
  const validateMessages = {
    required: "${label} wajib diisi",
  };

  const initialValues = {
    title: "",
    description: "",
    thumbnail: "",
  } as { [key: string]: string | [] | {} };

  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [photoList, setPhotoList] = useState([] as UploadFile[]);

  useEffect(() => {
    window.scrollTo(0, 0);
    assignFormValue();
  }, []);

  const assignFormValue = () => {
    if (!!Object.keys(globalDestination.dataById)) {
      Object.keys(initialValues).forEach((key: string) => {
        form.setFieldValue(
          key,
          (globalDestination.dataById as any)[key.toLowerCase()]
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
        `${configs.url_backend}/api/destination/create`,
        {
          title: f.title,
          description: f.description,
          thumbnail: f.thumbnail,
        },
        {
          headers: {
            Authorization: `Bearer ${(window as any).user.token}`,
          },
        }
      )
      .then((res: any) => {
        if (!!res) {
          console.log(res);
          setLoadingSave(false);
          //   getData();
          //   setTab("List");
        }
      });
  };

  const onUpdate = async () => {
    if (!!loadingSave) return;
    setLoadingSave(true);

    const f = form.getFieldsValue();
    await axios
      .post(
        `${configs.url_backend}/api/prompt/${globalDestination.dataById.id}`,
        {
          prompt_type: f.prompt_type,
          prompt_content: f.prompt_content,
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
          setTab("List");
        }
      });
  };

  return (
    <>
      <div className="mb-3 pb-3 flex items-center justify-between border-b border-b-[#E0E0E0]">
        <h3 className="text-2xl">{tab}</h3>
      </div>
      <div className="mt-3">
        <Form
          onFinish={tab.includes("Add") ? onAdd : onUpdate}
          form={form}
          layout="vertical"
          initialValues={initialValues}
          validateMessages={validateMessages}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                label={"Title"}
                name={"title"}
                rules={[{ required: true }]}
              >
                <TextField placeholder={"title"} />
              </Form.Item>

              <Form.Item
                label={"Description"}
                name={"description"}
                rules={[{ required: true }]}
              >
                <TextAreaField placeholder={"description"} />
              </Form.Item>

              <Form.Item
                label={"Thumbnail"}
                name={"thumbnail"}
                rules={[{ required: true }]}
              >
                <UploadFileField
                  multiple={false}
                  name="photo"
                  accept="image/jpeg,image/png,image/jpg"
                  listType={`picture`}
                  maxCount={1}
                  beforeUpload={() => {
                    return false;
                  }}
                  onChange={({ file, fileList }: any) => {
                    console.log("file", file);
                    console.log("fileList", fileList);
                    if (file.status !== "removed") {
                      const isJpgOrPng =
                        file.type === "image/jpeg" || file.type === "image/png";
                      if (!isJpgOrPng) {
                        message.error("You can only upload JPG/PNG file!");
                      }

                      const isLt2M = file.size / 1024 / 1024 < 2;
                      if (!isLt2M) {
                        message.error("Image must smaller than 2MB!");
                      }
                      form.setFieldValue("thumbnail", fileList[0].thumbUrl);
                      form.getFieldValue("thumbnail");
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          {tab.includes("View") ? (
            <div className="mt-5 flex justify-end space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTab("List");
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
                  setTab("List");
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
