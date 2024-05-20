import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  TableProps,
  message,
} from "antd";
import {
  useAddUser,
  useDeactivateUser,
  useFetchUser,
  useReactivateUser,
} from "../../api/manage/queries";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addform] = Form.useForm();
  const [searchText, setSearchText] = useState<String | any>("");
  const [findByName, setFindByName] = useState<FieldType | any>(null);
  const [userDatas, setUserDatas] = useState<FieldType | any>(null);

  type FieldType = {
    id: number;
    username?: string;
    password?: string;
    userType?: string;
    deleted?: boolean;
  };

  const {
    data: userData,
    refetch: refetchUser,
    isLoading: loadingUser,
  } = useFetchUser();
  const { mutate: deactivateUser } = useDeactivateUser();
  const { mutate: activateUser } = useReactivateUser();
  const { mutate: addUser, isLoading: addingUser } = useAddUser();

  useEffect(() => {
    setUserDatas(userData);
  }, [userData, userDatas, findByName]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    addform.resetFields();
  };

  const handleDelete = (record: FieldType) => {
    deactivateUser(record.id, {
      onSuccess: () => {
        message.success("User Deactivated");
        refetchUser();
      },
      onError: (data) => {
        message.error(`Failed : ${data}`);
      },
    });
  };

  const handleActivate = (record: FieldType) => {
    activateUser(record.id, {
      onSuccess: () => {
        message.success("User Activated");
        refetchUser();
      },
      onError: (data) => {
        message.error(`Failed : ${data}`);
      },
    });
  };

  const onFinish = (values: FieldType) => {
    let payload = {
      username: values.username?.trim(),
      password: values.password?.trim(),
      userType: values.userType,
    };
    addUser(payload, {
      onSuccess: () => {
        message.success("Added User Successfully");
        refetchUser();
        addform.resetFields();
        setIsModalOpen(false);
      },
      onError: (data) => {
        message.error(`Failed to Add: ${data}`);
      },
    });
  };

  const columns: TableProps<FieldType>["columns"] = [
    {
      title: "UserID",
      dataIndex: "id",
      key: "id",
      className: "px-4 py-2",
      sorter: (a: any, b: any) => a.id - b.id,
      sortDirections: ["descend"],
      defaultSortOrder: "ascend",
    },
    {
      title: "UserName",
      dataIndex: "username",
      key: "username",
      className: "px-4 py-2",
    },
    {
      title: "UserType",
      dataIndex: "userType",
      key: "userType",
      className: "px-4 py-2",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <span style={{ color: record.deleted ? "red" : "green" }}>
          {record.deleted ? "Inactive" : "Active"}
        </span>
      ),
      className: "px-4 py-2",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          {record.deleted ? (
            <Button
              type="primary"
              style={{
                backgroundColor: "green",
                color: "white",
                borderRadius: "20px",
                fontWeight: "bold",
                width: "100px",
              }}
              onClick={() => handleActivate(record)}
            >
              Activate
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "20px",
                fontWeight: "bold",
                width: "100px",
              }}
              onClick={() => handleDelete(record)}
            >
              Deactivate
            </Button>
          )}
        </>
      ),
      className: "px-4 py-2",
    },
  ];

  const onInputChange = (event: any) => {
    setSearchText(event.target.value.trim());
  };

  useEffect(() => {
    const searchedUsers = userData?.filter((data: FieldType) => {
      return Object.values(data).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFindByName(searchedUsers);
  }, [searchText, userData]);

  return (
    <>
      <div className="flex-grow mx-10 mt-5 max-h-96">
        <Button
          type="default"
          onClick={showModal}
          className="bg-blue-500 text-white font-bold px-2 mt-4 rounded mb-4"
        >
          Add User
        </Button>
        <div className="w-60 mb-4 mt-2">
          <Input
            value={searchText}
            onChange={onInputChange}
            placeholder="Search"
            className="border-2 border-blue-500 focus:border-blue-700 rounded-md  outline-none font-extrabold"
          />
        </div>

        <Table
          columns={columns}
          loading={loadingUser}
          pagination={{ pageSize: 10, responsive: true }}
          dataSource={findByName ? findByName : userDatas}
          bordered
        />

        <div className="flex-auto w-50 mx-auto"></div>
        <Modal
          title="User Details"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={addform}
            name="signup"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Username"
                className="rounded-md mb-4 border focus:outline-none border-gray-900 focus:border-purple-500 px-3 py-2"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className=" border-gray-900 rounded-md mb-4 border focus:outline-none focus:border-purple-500 px-3 py-2"
              />
            </Form.Item>

            <Form.Item
              name="userType"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Select
                placeholder="Select a role"
                options={[
                  { value: "ADMIN", label: "Admin" },
                  { value: "LIBRARIAN", label: "Librarian" },
                ]}
                className="w-full border border-gray-900 rounded"
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={addingUser}
                type="primary"
                htmlType="submit"
                className="bg-purple-900 hover:from-gray-900 hover:to-black text-white font-bold  px-4 rounded-md focus:outline-none transition-all duration-300 w-full"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default App;
