import {
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  Checkbox,
  Row,
  Col,
  Radio,
  TimePicker,
} from "antd";
import { DefaultOptionType } from "antd/lib/select";
import { ChangeEventHandler, CSSProperties, FC } from "react";
import { configs } from "src/base/global/global";

export const TextField: FC<{
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: any;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  prefix?: JSX.Element;
  type?: string;
}> = (props) => {
  return <Input {...props} />;
};
// direction path class TextField
/* ant-col ant-form-item-control */
/* ant-form-item-control-input */
/* ant-form-item-control-input-content */
/* ant-input ant-input-disabled */

export const PasswordField: FC<{
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  prefix?: JSX.Element;
}> = (props) => {
  return <Input.Password {...props} />;
};
// direction path class PasswordField
/* ant-col ant-form-item-control */
/* ant-form-item-control-input */
/* ant-form-item-control-input-content */
/* ant-input-affix-wrapper ant-input-password */
// child
/* <input />
   ant-input-suffix
*/

export const TextAreaField: FC<{
  placeholder?: string;
  onChange?: any;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
}> = (props) => {
  return <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} {...props} />;
};

export const SelectField: FC<{
  placeholder?: string;
  // defaultValue?: any;
  allowClear?: boolean;
  onChange?: (
    value: any,
    option: DefaultOptionType | DefaultOptionType[]
  ) => void;
  options: DefaultOptionType[];
  disabled?: boolean;
  value?: any;
  style?: CSSProperties;
}> = (props) => {
  return <Select optionFilterProp="label" allowClear showSearch {...props} />;
};
// direction path class SelectField
/* ant-col ant-form-item-control */
/* ant-form-item-control-input */
/* ant-form-item-control-input-content */
/* ant-select ant-select-in-form-item ant-select-single ant-select-show-arrow ant-select-disabled ant-select-show-search */
/* ant-select-selector */

export const CheckboxField: FC<{
  onChange?: any;
  style?: CSSProperties;
  colSpan: number;
  list: Array<{ label: string; value: string }>;
}> = (props) => {
  return (
    <Checkbox.Group {...props}>
      <Row>
        {props.list.map(
          (item: { label: string; value: string }, index: number) => (
            <Col key={index} span={props.colSpan}>
              <Checkbox value={item.value}>{item.label}</Checkbox>
            </Col>
          )
        )}
      </Row>
    </Checkbox.Group>
  );
};

export const RadioField: FC<{
  onChange?: any;
  style?: CSSProperties;
  colSpan: number;
  list: Array<{ label: string; value: string }>;
}> = (props) => {
  return (
    <Radio.Group {...props}>
      <Row>
        {props.list.map(
          (item: { label: string; value: string }, index: number) => (
            <Col key={index} span={props.colSpan}>
              <Radio value={item.value}>{item.label}</Radio>
            </Col>
          )
        )}
      </Row>
    </Radio.Group>
  );
};

export const SearchField: FC<{
  placeholder?: string;
  // onSearch: any;
  onChange?: any;
  onKeyDown?: any;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  suffix?: JSX.Element;
}> = (props) => {
  return <Input allowClear {...props} />;
};
// direction path class SearchField as same as TextField

const { RangePicker } = DatePicker;
export const DatePickerField: FC<{
  // defaultValue?: any;
  onChange?: any;
}> = (props) => {
  return <RangePicker format={configs.formatDate} {...props} />;
};
// direction path class DatePickerField
/* ant-col ant-col-4 */
/* ant-form-item */
/* ant-row ant-form-item-row */
/* ant-col ant-form-item-control */
/* ant-form-item-control-input */
/* ant-form-item-control-input-content */
/* ant-picker ant-picker-range ant-picker-focused */
// child
/* ant-picker-input 
   ant-picker-range-separator
   ant-picker-input ant-picker-input-active
*/

export const DateField: FC<{
  placeholder?: string;
  onChange?: any;
  disabled?: boolean;
  show?: boolean;
  // defaultValue?: any;
}> = (props) => {
  return <DatePicker format={configs.formatDate} {...props} />;
};
// direction path class DateField
/* ant-col ant-form-item-control */
/* ant-form-item-control-input */
/* ant-form-item-control-input-content */
/* ant-picker */
/* ant-picker-input */
// child
/* <input />
   ant-picker-suffix
   ant-picker-clear
*/

export const TimeField: FC<{
  placeholder?: string;
  onChange?: any;
  disabled?: boolean;
  show?: boolean;
  // defaultValue?: any;
}> = (props) => {
  return <TimePicker format={configs.formatTime} {...props} />;
};

export const UploadFileField: FC<{
  name: string;
  action?: string;
  fileList?: any;
  listType?: any;
  headers?: any;
  maxCount?: number;
  onChange?: any;
  beforeUpload?: () => boolean;
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
}> = (props) => {
  const _disabled =
    props.disabled ||
    (!!props.maxCount &&
      !!props.fileList &&
      props.maxCount === props.fileList.length);

  return (
    <Upload {...props}>
      <div className="flex space-x-1">
        <Button id="btn_file" disabled={_disabled}>
          Choose File {!!props.maxCount && `(Max : ${props.maxCount})`}
        </Button>
      </div>
      {!!props.fileList && props.fileList.length === 0 && (
        <div className="mt-2 w-full py-5 flex justify-center border rounded-md">
          <span className="text-xs font-normal">No File Choosen</span>
        </div>
      )}
    </Upload>
  );
};
// direction path class UploadPhoto
/* ant-col ant-form-item-control */
/* ant-form-item-control-input */
/* ant-form-item-control-input-content */
/* ant-upload-picture-card-wrapper */
/* ::before */
/* ant-upload-list ant-upload-list-picture-card */
/* ::before */
/* ant-upload ant-upload-select ant-upload-select-picture-card */
/* <span> class="ant-upload" role="button" */
// child
/* <input type="file"/>
   <button type="button" class="ant-btn ant-btn-default"/>
*/

// "file": {
//   "uid": "rc-upload-1668135670628-2",
//   "lastModified": 1667985899874,
//   "lastModifiedDate": "2022-11-09T09:24:59.874Z",
//   "name": "cargo-ship 1.png",
//   "size": 13738,
//   "type": "image/png",
//   "percent": 0,
//   "originFileObj": {
//     "uid": "rc-upload-1668135670628-2"
//   },
//   "status": "done",
//   "response": "ok"
// }

// file.status = done || uploading || error
