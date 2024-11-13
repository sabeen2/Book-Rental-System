import React, { useState, useEffect } from "react";
import {
  Space,
  Table,
  Button,
  Drawer,
  message,
  Popconfirm,
  Form,
  Input,
  Modal,
  Upload,
} from "antd";
import type { TableProps } from "antd";
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import CreateMember from "./CreateMember";

const { Dragger } = Upload;

// Mock data for members
const mockMembers = [
  {
    memberid: "1",
    name: "John Doe",
    email: "john@example.com",
    mobileNo: "1234567890",
    address: "123 Main St",
  },
  {
    memberid: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    mobileNo: "0987654321",
    address: "456 Elm St",
  },
  {
    memberid: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    mobileNo: "1122334455",
    address: "789 Oak St",
  },
  {
    memberid: "4",
    name: "Sara White",
    email: "sara@example.com",
    mobileNo: "2233445566",
    address: "101 Pine St",
  },
  {
    memberid: "5",
    name: "Paul Brown",
    email: "paul@example.com",
    mobileNo: "6677889900",
    address: "202 Maple St",
  },
];

interface MemberDataType {
  memberid: string;
  name: string;
  email: string;
  mobileNo: string;
  address: string;
}

const MemberSetup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberDataType | null>(
    null
  );
  const [searchText, setSearchText] = useState<string>("");
  const [filteredMembers, setFilteredMembers] =
    useState<MemberDataType[]>(mockMembers);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const columns: TableProps<MemberDataType>["columns"] = [
    {
      title: "SN",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => (page - 1) * 7 + index + 1,
      sorter: (a, b) => parseInt(a.memberid, 10) - parseInt(b.memberid, 10),
      sortDirections: ["descend"],
      defaultSortOrder: "ascend",
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile", dataIndex: "mobileNo", key: "mobileNo" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showEditDrawer(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this member?"
            onConfirm={() => handleDelete(record.memberid)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const showEditDrawer = (member: MemberDataType) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedMember(null);
  };

  const handleDelete = (memberID: string) => {
    setFilteredMembers(
      filteredMembers.filter((member) => member.memberid !== memberID)
    );
    message.success("Deleted member successfully.");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    if (value === "") {
      setFilteredMembers(mockMembers);
    } else {
      const filtered = mockMembers.filter((member) =>
        Object.values(member).some((field) =>
          String(field).toLowerCase().includes(value)
        )
      );
      setFilteredMembers(filtered);
    }
  };

  const handleDownloadMemberDetails = () => {
    const dataToDownload = filteredMembers.map((member) => ({
      Name: member.name,
      Email: member.email,
      Mobile: member.mobileNo,
      Address: member.address,
    }));

    const blob = new Blob([JSON.stringify(dataToDownload)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "members.json";
    link.click();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const uploadProps: UploadProps = {
    name: "file",
    fileList: fileList,
    beforeUpload: (file) => {
      const isExcel =
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isExcel) {
        message.error("You can only upload Excel files!");
        return false;
      }
      setFileList([file]);
      return false;
    },
    onRemove: () => {
      setFileList([]);
    },
  };

  return (
    <div className="flex-grow mx-10 mt-5 max-h-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Member Setup</h2>
        <Button
          className="bg-white text-black font-bold py-1 px-4 rounded-full transform hover:scale-105 hover:shadow-md"
          type="default"
          onClick={() => setOpen(true)}
        >
          Create
        </Button>
        <Drawer
          width={800}
          autoFocus
          title={selectedMember ? "Edit Member" : "Create Member"}
          onClose={onClose}
          open={open}
        >
          <CreateMember
            form={undefined as any}
            onSucess={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Drawer>
      </div>

      <div className="flex items-center mb-4 w-56">
        <Input
          placeholder="Search members..."
          value={searchText}
          onChange={handleSearch}
          className="border-2 border-blue-500 focus:border-blue-700 rounded-md outline-none font-extrabold"
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredMembers}
        rowKey="memberid"
        pagination={{
          pageSize: 7,
          onChange: (current) => setPage(current),
        }}
      />

      <Button
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold px-2 rounded"
        type="default"
        onClick={handleDownloadMemberDetails}
        icon={<DownloadOutlined />}
      >
        Download Member Details
      </Button>

      <Button
        className="ml-4 bg-blue-500 text-white font-bold px-2 rounded"
        icon={<UploadOutlined />}
        onClick={showModal}
      >
        Upload Member Data
      </Button>

      <Modal
        footer
        title="Upload Member Data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          onFinish={() => {}}
          className="flex flex-col justify-between h-full"
        >
          <Form.Item name="file" className="mb-4">
            <Dragger name="file" {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MemberSetup;
