import GeneratorModel from "@/pages/admin/pdf-contents/create/components/create";
import React from "react";
import { Wrapper } from "./style";
import { Button, Layout } from "antd";
import { Header } from "antd/lib/layout/layout";
import PrivateRoute from "@/privateRoute";
import Router from "next/router";

const CreatePDF: React.FC = () => {
  return (
    <Wrapper>
      <Header className="content-header">
        <h3>Create PDF</h3>
        <Button onClick={() => Router.back()}>Back</Button>
      </Header>
      <GeneratorModel />
    </Wrapper>
  );
};

export default PrivateRoute(CreatePDF, { type: "Admin" });
