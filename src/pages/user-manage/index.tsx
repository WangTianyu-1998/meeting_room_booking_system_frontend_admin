import { Badge, Button, Form, Image, Input, message, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import "./index.css";
import { freeze, userSearch } from "./api";
import { ColumnsType } from "antd/es/table";

interface SearchUser {
  username: string;
  nickName: string;
  email: string;
}

export function UserManage() {
  const [form] = Form.useForm<SearchUser>();

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState<any[]>([]);

  const columns: ColumnsType<any> = [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "头像",
      dataIndex: "headPic",
      render: (value) => {
        return value ? (
          <Image width={50} src={`http://localhost:3005/${value}`} />
        ) : (
          ""
        );
      },
    },
    {
      title: "昵称",
      dataIndex: "nickName",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
    },
    {
      title: "状态",
      dataIndex: "isFrozen",
      render: (_, record) =>
        record.isFrozen ? <Badge status="success">已冻结</Badge> : "",
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <Button type="link" onClick={() => handleFreeze(record.id)}>
            冻结
          </Button>
        );
      },
    },
  ];

  const searchUser = useCallback(async (values?: any) => {
    const res = await userSearch(values);
    console.log("🚀 ~ searchUser ~ res:", res);
    setTableData(res.data.users ?? []);
    setTotal(res.data.totalCount ?? 0);
  }, []);

  const changePage = useCallback(function (pageNo: number, pageSize: number) {
    setPageNo(pageNo);
    setPageSize(pageSize);
  }, []);

  const handleFreeze = useCallback(async (id: number) => {
    await freeze(id);
    message.success("冻结成功");
    const formData = form.getFieldsValue();
    searchUser({
      ...formData,
      pageNo,
      pageSize,
    });
  }, []);

  useEffect(() => {
    const formData = form.getFieldsValue();
    searchUser({
      ...formData,
      pageNo,
      pageSize,
    });
  }, [pageNo, pageSize]);

  return (
    <div id="userManage-container">
      <div className="userManage-form">
        <Form onFinish={searchUser} name="search" layout="inline" colon={false}>
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>

          <Form.Item label="昵称" name="nickName">
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ type: "email", message: "请输入合法邮箱地址!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              搜索用户
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="userManage-table">
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={{
            total,
            current: pageNo,
            pageSize: pageSize,
            onChange: changePage,
          }}
        />
      </div>
    </div>
  );
}
