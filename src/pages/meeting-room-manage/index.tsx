import { Badge, Button, Form, Image, Input, Table, message } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import { ColumnsType } from "antd/es/table";
import { useForm } from "antd/es/form/Form";
import { deleteMeetingRoom, meetingRoomList } from "./api";
import {
  CreateMeetingRoomModal,
  MeetingRoomModalRef,
} from "./create-meeting-room-modal";

interface SearchMeetingRoom {
  name: string;
  capacity: number;
  equipment: string;
}

interface MeetingRoomSearchResult {
  id: number;
  name: string;
  capacity: number;
  location: string;
  equipment: string;
  description: string;
  isBooked: boolean;
  createTime: Date;
  updateTime: Date;
}

function MeetingRoomManage() {
  const [form] = useForm();
  const [pageNo, setPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const MeetingRoomModalRef = useRef<MeetingRoomModalRef>(null);
  const [meetingRoomResult, setMeetingRoomResult] = useState<
    Array<MeetingRoomSearchResult>
  >([]);

  const columns: ColumnsType<MeetingRoomSearchResult> = useMemo(
    () => [
      {
        title: "名称",
        dataIndex: "name",
      },
      {
        title: "容纳人数",
        dataIndex: "capacity",
      },
      {
        title: "位置",
        dataIndex: "location",
      },
      {
        title: "设备",
        dataIndex: "equipment",
      },
      {
        title: "描述",
        dataIndex: "description",
      },
      {
        title: "添加时间",
        dataIndex: "createTime",
      },
      {
        title: "上次更新时间",
        dataIndex: "updateTime",
      },
      {
        title: "预定状态",
        dataIndex: "isBooked",
        render: (_, record) =>
          record.isBooked ? (
            <Badge status="error">已被预订</Badge>
          ) : (
            <Badge status="success">可预定</Badge>
          ),
      },
      {
        title: "操作",
        render: (_, record) => (
          <>
            <a
              href="#"
              onClick={() => {
                handleDelete(record.id);
              }}
            >
              删除
            </a>
            <a
              href="#"
              onClick={() => {
                setIsCreateModalOpen(true);
                MeetingRoomModalRef.current?.record?.(record);
              }}
            >
              更新
            </a>
          </>
        ),
      },
    ],
    []
  );

  const searchMeetingRoom = useCallback(async (values: SearchMeetingRoom) => {
    console.log("🚀 ~ searchMeetingRoom ~ values:", values);

    const res: any = await meetingRoomList(
      values.name,
      values.capacity,
      values.equipment,
      pageNo,
      pageSize
    );

    setMeetingRoomResult(
      res.data.meetingRooms.map((item: MeetingRoomSearchResult) => {
        return {
          key: item.id,
          ...item,
        };
      })
    );
  }, []);

  const changePage = useCallback(function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  }, []);

  useEffect(() => {
    searchMeetingRoom({
      name: form.getFieldValue("name"),
      capacity: form.getFieldValue("capacity"),
      equipment: form.getFieldValue("equipment"),
    });
  }, [pageNo, pageSize]);

  const handleDelete = useCallback(async (id: number) => {
    await deleteMeetingRoom(id);
    message.success("删除成功");
    searchMeetingRoom({} as any);
  }, []);

  return (
    <>
      <CreateMeetingRoomModal
        ref={MeetingRoomModalRef}
        isOpen={isCreateModalOpen}
        handleClose={() => {
          setIsCreateModalOpen(false);
        }}
        successCallback={() => {
          searchMeetingRoom({} as any);
        }}
      ></CreateMeetingRoomModal>
      <div id="meetingRoomManage-container">
        <div className="meetingRoomManage-form">
          <Form
            form={form}
            onFinish={searchMeetingRoom}
            name="search"
            layout="inline"
            colon={false}
          >
            <Form.Item label="会议室名称" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="容纳人数" name="capacity">
              <Input />
            </Form.Item>

            <Form.Item label="位置" name="location">
              <Input />
            </Form.Item>

            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                搜索会议室
              </Button>
              <Button
                type="primary"
                style={{ background: "green" }}
                onClick={() => setIsCreateModalOpen(true)}
              >
                添加会议室
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="meetingRoomManage-table">
          <Table
            columns={columns}
            dataSource={meetingRoomResult}
            pagination={{
              current: pageNo,
              pageSize: pageSize,
              onChange: changePage,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default MeetingRoomManage;
