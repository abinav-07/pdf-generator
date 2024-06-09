import React from "react";
import { Button, Form, Layout, Table } from "antd";
import { useQuery } from "react-query";
import { fetchPDFContents } from "@/services/pdfContents";
import PrivateRoute from "@/privateRoute";
import { Content, Header as AntHeader } from "antd/lib/layout/layout";
import styled from "styled-components";
import Link from "next/link";

const Header = styled(AntHeader)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FeatureList: React.FC = () => {
  const [form] = Form.useForm();

  const {
    data: pdfContentsData,
    isLoading,
    isFetching,
    refetch: featuresRefetch,
  } = useQuery(["pdfContents"], () => fetchPDFContents(), {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    enabled: true,
    cacheTime: 0,
    select: ({ data }) => {
      return {
        data: data?.map((values: any, i: number) => ({
          ...values,
          key: i,
        })),
      };
    },
  });

  const columns = [
    {
      title: "User id",
      dataIndex: "id",
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Name",
      dataIndex: "displayName",
      width: "20%",
    },
    {
      title: "Email Given Id",
      dataIndex: "service_user_id",
      width: "15%",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "date",
      width: "25%",
      render: (_: any, record: any) =>
        `${record?.created_at ? new Date(record?.created_at).toISOString().split("T")[0] : "-"}`,
    },
  ];

  return (
    <>
      <Layout>
        <Header style={{ background: "#fff", alignItems: "center" }}>
          <h3>Page and their Features </h3>
          <Button>
            <Link href={"/admin/pdf-contents/create"}>Create PDF</Link>
          </Button>
        </Header>
        <Content>
          <Form form={form} component={false}>
            <Table
              bordered
              dataSource={pdfContentsData?.data || []}
              columns={columns}
              loading={isLoading || isFetching}
              pagination={false}
            />
          </Form>
        </Content>
      </Layout>
    </>
  );
};

export default PrivateRoute(FeatureList, { type: "Admin" });
