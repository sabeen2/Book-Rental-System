import React from "react";
import { Card, Col, Row, Divider } from "antd";
import {
  UserOutlined,
  BookOutlined,
  AuditOutlined,
  DatabaseOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { Bar } from "@ant-design/charts";

const Charts: React.FC = () => {
  // Hardcoded example data
  const totalMembers = 5;
  const totalAuthors = 3;
  const totalCategories = 5;
  const totalBooks = 2;

  // Example transaction data
  const transactionData = [
    {
      bookName: "To Kill a Mockingbird",
      fromDate: "2023-01-15",
      toDate: "2023-02-15",
    },
    { bookName: "1984", fromDate: "2023-02-01", toDate: "2023-03-01" },
    {
      bookName: "Pride and Prejudice",
      fromDate: "2023-01-20",
      toDate: "2023-02-20",
    },
    {
      bookName: "The Great Gatsby",
      fromDate: "2023-03-10",
      toDate: "2023-04-10",
    },
    { bookName: "Moby Dick", fromDate: "2023-02-15", toDate: "2023-03-15" },
    {
      bookName: "To Kill a Mockingbird",
      fromDate: "2023-03-01",
      toDate: "2023-04-01",
    },
    { bookName: "1984", fromDate: "2023-04-05", toDate: "2023-05-05" },
    {
      bookName: "Pride and Prejudice",
      fromDate: "2023-02-10",
      toDate: "2023-03-10",
    },
    {
      bookName: "The Great Gatsby",
      fromDate: "2023-01-25",
      toDate: "2023-02-25",
    },
    { bookName: "Moby Dick", fromDate: "2023-03-20", toDate: "2023-04-20" },
  ];

  let bookFrequency: { [key: string]: number } = {};
  let totalRentDuration = 0;
  let totalTransactions = 0;

  transactionData.forEach((transaction) => {
    const { bookName, fromDate, toDate } = transaction;
    const rentDuration =
      new Date(toDate).getTime() - new Date(fromDate).getTime();

    if (!isNaN(rentDuration)) {
      bookFrequency[bookName] = (bookFrequency[bookName] || 0) + 1;
      totalRentDuration += rentDuration;
      totalTransactions++;
    }
  });

  const transactionStats = Object.keys(bookFrequency).map((book) => ({
    bookName: book,
    frequency: bookFrequency[book],
  }));

  transactionStats.sort((a, b) => b.frequency - a.frequency);

  const topBooks = transactionStats.slice(0, 5);

  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const averageRentDuration =
    totalTransactions > 0
      ? Math.ceil(totalRentDuration / (totalTransactions * millisecondsInADay))
      : 0;

  const barData = topBooks.map((book, index) => ({
    bookName: book.bookName,
    frequency: book.frequency + index,
  }));

  const barConfig = {
    data: barData,
    xField: "bookName",
    yField: "frequency",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        fontSize: 200,
        fontWeight: "bold",
      },
    },
    xAxis: {
      label: {
        autoRotate: true,
        style: {
          fontSize: 26,
          fontWeight: "bold",
        },
      },
    },
    meta: {
      bookName: { alias: "Book Name" },
      frequency: { alias: "Frequency" },
    },
  };

  return (
    <div className="flex-grow mx-10 mt-10">
      <Divider orientation="center">Stats</Divider>
      <Row gutter={16} justify="space-around">
        <Col span={4}>
          <Card className="bg-blue-200 hover:bg-blue-300 shadow-lg rounded-lg p-4">
            <UserOutlined className="text-6xl text-blue-500 mx-auto" />
            <p className="text-4xl font-bold text-center">{totalMembers}</p>
            <p className="text-black mt-2 font-semibold text-center">
              Total Members
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className="bg-green-200 hover:bg-green-300 shadow-lg rounded-lg p-4">
            <AuditOutlined className="text-6xl text-green-500 mx-auto" />
            <p className="text-4xl font-bold text-center">{totalAuthors}</p>
            <p className="text-black mt-2 font-semibold text-center">
              Total Authors
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className="bg-yellow-200 hover:bg-yellow-300 shadow-lg rounded-lg p-4">
            <DatabaseOutlined className="text-6xl text-yellow-500 mx-auto" />
            <p className="text-4xl font-bold text-center">{totalCategories}</p>
            <p className="text-black mt-2 font-semibold text-center">
              Total Categories
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className="bg-pink-200 hover:bg-pink-300 shadow-lg rounded-lg p-4">
            <BookOutlined className="text-6xl text-pink-500 mx-auto" />
            <p className="text-4xl font-bold text-center">{totalBooks}</p>
            <p className="text-black mt-2 font-semibold text-center">
              Total Books
            </p>
          </Card>
        </Col>
        <Col span={4}>
          <Card className="bg-purple-200 hover:bg-purple-300 shadow-lg rounded-lg p-4">
            <FieldTimeOutlined className="text-6xl text-purple-500 mx-auto" />
            <p className="text-4xl font-bold text-center">
              {averageRentDuration} days
            </p>
            <p className="text-black mt-2 font-semibold text-center">
              Average Rent Duration
            </p>
          </Card>
        </Col>
      </Row>
      <Divider orientation="center">Most Rented Books</Divider>
      <Row gutter={16} justify="center">
        <Col span={16}>
          <Bar {...barConfig} />
        </Col>
      </Row>
    </div>
  );
};

export default Charts;
