import React, { useState } from "react";
import { Button, Form, Layout, Modal, Table, message } from "antd";
import { useMutation, useQuery } from "react-query";
import { deletePDFContent, fetchPDFContents } from "@/services/pdfContents";
import PrivateRoute from "@/privateRoute";
import { Content, Header as AntHeader } from "antd/lib/layout/layout";
import styled from "styled-components";
import Router from "next/router";
import { DeleteFilled } from "@ant-design/icons";

const Header = styled(AntHeader)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FeatureList: React.FC = () => {
  const [form] = Form.useForm();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);

  const {
    data: pdfContentsData,
    isLoading,
    isFetching,
    refetch: refetchData,
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

  const { mutate: deleteRow, isLoading: isDeleting } = useMutation(
    deletePDFContent,
    {
      onSuccess: () => {
        // Refetch
        refetchData();
        message.open({
          type: "success",
          content: "Successfully Deleted",
        });
      },
      onError: (err: any) => {
        message.open({
          type: "error",
          content: err?.response?.data?.message || "Error when deleting.",
        });
      },
    },
  );

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = (id: number) => {
    deleteRow(id);
    setShowDeleteModal(false);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: "25%",
    },
    {
      title: "PDF Name",
      dataIndex: "pdf_name",
      width: "50%",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: "25%",
      render: (id: number) => (
        <div style={{ textAlign: "center" }}>
          <Button
            type="primary"
            danger
            onClick={() => {
              setDeleteId(id);
              setShowDeleteModal(true);
            }}
          >
            <DeleteFilled />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Layout>
        <Header
          className="content-header"
          style={{ background: "#fff", alignItems: "center" }}
        >
          <h3>PDF Contents </h3>
          <Button onClick={() => Router.push("/admin/pdf-contents/create")}>
            Create PDF
          </Button>
        </Header>
        <Content>
          <Form form={form} component={false}>
            <Table
              bordered
              dataSource={pdfContentsData?.data || []}
              columns={columns}
              loading={isLoading || isFetching || isDeleting}
              pagination={false}
            />
          </Form>
        </Content>
      </Layout>
      {showDeleteModal && (
        <Modal
          title="Delete PDF?"
          open={showDeleteModal}
          onOk={() => handleDelete(deleteId)}
          onCancel={handleCancel}
          maskClosable={true}
        />
      )}
    </>
  );
};

export default PrivateRoute(FeatureList, { type: "Admin" });
