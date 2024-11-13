import React, { useState, useEffect } from "react";
import { DatePicker, Space, Table, Input } from "antd";
import type { TablePaginationConfig } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface ReturnDataType {
  id: string;
  name: string;
  code: string;
  to_date: string;
  from_date: string;
  member_name: string;
}

// Sample mock data
const mockData: ReturnDataType[] = [
  {
    id: "1",
    name: "The Great Gatsby",
    code: "B123",
    from_date: "2024-01-01",
    to_date: "2024-01-10",
    member_name: "John Doe",
  },
  {
    id: "2",
    name: "1984",
    code: "B124",
    from_date: "2024-02-01",
    to_date: "2024-02-15",
    member_name: "Jane Smith",
  },
  {
    id: "3",
    name: "To Kill a Mockingbird",
    code: "B125",
    from_date: "2024-03-01",
    to_date: "2024-03-10",
    member_name: "Alice Johnson",
  },
  // Add more mock data as needed
];

const columns = [
  {
    title: "SN",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "From Date",
    dataIndex: "from_date",
    key: "from_date",
    render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
  },
  {
    title: "To Date",
    dataIndex: "to_date",
    key: "to_date",
    render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
  },
  {
    title: "Member Name",
    dataIndex: "member_name",
    key: "member_name",
  },
];

const Return: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [fromDate, setFromDate] = useState<any>(null);
  const [toDate, setToDate] = useState<any>(null);
  const [transactionHistory, setTransactionHistory] = useState<
    ReturnDataType[]
  >(
    mockData // Set to mock data initially
  );
  const [searchText, setSearchText] = useState<string>("");

  const handleDateChange = (value: RangePickerProps["value"]) => {
    if (!value) {
      setFromDate(undefined);
      setToDate(undefined);
      return;
    }
    setFromDate(dayjs(value?.[0]));
    setToDate(dayjs(value?.[1]));
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    // Filter the mock data based on searchText
    const filteredData = mockData.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.code.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setTransactionHistory(filteredData);
  }, [searchText]);

  const onTableChange = (pagination: TablePaginationConfig) => {
    const { current, pageSize } = pagination;
    setPageNumber(current || 1);
    setPageSize(pageSize || 10);
  };

  return (
    <div className="flex-grow mx-10 mt-5 max-h-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Return History</h2>
        <Space direction="vertical" size={12}>
          <RangePicker
            className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            format="YYYY/MM/DD"
            onChange={handleDateChange}
          />
        </Space>
        {/* Search input field */}
        {/* <Input
          placeholder="Search by Name or Code"
          value={searchText}
          onChange={handleSearchChange}
          className="w-48 border-2 border-blue-500 rounded-md"
        /> */}
      </div>

      <Table
        columns={columns}
        loading={false}
        dataSource={transactionHistory}
        pagination={{
          current: pageNumber,
          total: transactionHistory.length,
          pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20, 25, 30],
        }}
        onChange={onTableChange}
      />
    </div>
  );
};

export default Return;
