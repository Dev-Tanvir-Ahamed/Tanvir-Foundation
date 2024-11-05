import { useGetLeaderBoardQuery } from "@/redux/api/baseApi";
import { TLeaderBoardProps } from "@/types/leaderBoardTable.types";
import { Pagination, PaginationProps, Table } from "antd";
import moment from "moment";
import { useState } from "react";
const DonationLeaderBoard = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: leaderBoardData, isLoading } = useGetLeaderBoardQuery({
    page,
    pageSize,
  });
  console.log(leaderBoardData);
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
  };
  if (isLoading) return <div>Loading leaderboard...</div>;
  // if (error) return <div>Error loading leaderboard: {error.message}</div>;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Last Donation Amount",
      dataIndex: "lastDonation",
      key: "lastDonation",
    },
    {
      title: "Last Donation Date",
      dataIndex: "lastDonationDate",
      key: "lastDonationDate",
    },
    {
      title: "Total Donation Amount",
      dataIndex: "totalDonationAmount",
      key: "totalDonationAmount",
    },
  ];
  const leaderBoardDataSource =
    leaderBoardData?.data?.map((item: TLeaderBoardProps, index: number) => ({
      key: index,
      ...item,
      lastDonationDate: moment(new Date(item.lastDonationDate)).format("MMMM"),
    })) || [];
  return (
    <div>
      <Table
        dataSource={leaderBoardDataSource}
        columns={columns}
        loading={isLoading}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(newPage, newPageSize) => {
          setPage(newPage);
          setPageSize(newPageSize);
        }}
        pageSize={pageSize}
        total={leaderBoardData?.pagination?.totalItems} // Use total from API response
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  );
};

export default DonationLeaderBoard;
