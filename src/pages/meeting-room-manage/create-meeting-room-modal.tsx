import { Button, Form, Input, InputNumber, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { forwardRef, useCallback, useImperativeHandle } from "react";
import { createMeetingRoom, updateMeetingRoom } from "./api";

interface CreateMeetingRoomModalProps {
  isOpen: boolean;
  handleClose: Function;
  successCallback: Function;
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
export interface CreateMeetingRoom {
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
}

export interface MeetingRoomModalRef {
  record?: (values: any) => void;
}

export const CreateMeetingRoomModal = forwardRef(
  (props: CreateMeetingRoomModalProps, ref: any) => {
    const { successCallback, handleClose, isOpen } = props;
    const [form] = useForm();

    const handleOk = useCallback(async function () {
      const values = form.getFieldsValue();

      values.description = values.description || "";
      values.equipment = values.equipment || "";
      const id = values.id;
      id ? await updateMeetingRoom(values) : await createMeetingRoom(values);
      message.success("创建成功");
      form.resetFields();
      handleClose();
      successCallback();
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          record: (values: any) => {
            form.setFieldsValue(values);
          },
        };
      },
      []
    );

    return (
      <Modal
        title="创建会议室"
        open={isOpen}
        onOk={handleOk}
        onCancel={() => handleClose()}
        afterClose={() => {
          form.resetFields();
          console.log("close");
          handleClose();
        }}
        okText={"创建"}
      >
        <Form form={form} colon={false} {...layout}>
          <Form.Item label="" name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="会议室名称"
            name="name"
            rules={[{ required: true, message: "请输入会议室名称!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="位置"
            name="location"
            rules={[{ required: true, message: "请输入会议室位置!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="容纳人数"
            name="capacity"
            rules={[{ required: true, message: "请输入会议室容量!" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item label="设备" name="equipment">
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
