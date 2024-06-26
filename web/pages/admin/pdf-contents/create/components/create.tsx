import { v4 as uuidv4 } from "uuid";
import { Button, Col, Divider, Form, Input, Row, message } from "antd";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useMutation } from "react-query";
import PDFPreview from "./preview";

import { createPDFContents } from "@/services/pdfContents";
import { formatFooter, formatHeader } from "@/utils/pdfFormatter";
import { AddImageLinkModal } from "@/components/image";

const TiptapEditor = dynamic(() => import("../../../../../components/tiptap"), {
  ssr: false,
});

interface IHTMLContents {
  pdfName: string;
  headerText: string;
  bodyText: string;
  footerText: string;
}

const GeneratorModel: React.FC = () => {
  const [form] = Form.useForm();
  const [htmlContents, setHtmlContents] = useState<IHTMLContents>({
    pdfName: "",
    headerText: "",
    bodyText: "",
    footerText: "",
  });
  const [image, setImage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const { mutate: generatePDF, isLoading: isPreviewLoading } = useMutation(
    createPDFContents,
    {
      onSuccess: ({ data }: any) => {
        // Create a Blob from the buffer
        const blob = new Blob([data], { type: "application/pdf" });

        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);
        const filename = `${form.getFieldValue("pdfName")}.pdf`;

        // Create a link element and trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      onError: (err: any) => {
        const decodedMessage = JSON.parse(
          new TextDecoder().decode(err?.response?.data),
        );
        message.open({
          type: "error",
          content:
            decodedMessage?.message || "Error while generate pdf preview",
        });
      },
    },
  );

  const handleSubmit = async (values: IHTMLContents) => {
    generatePDF({
      pdfName: values?.pdfName,
      headerHTML: await formatHeader(values?.headerText, image),
      bodyHTML: values?.bodyText,
      footerHTML: formatFooter(values?.footerText),
      // Default Values
      pdfOptions: {
        format: "A4",
        displayHeaderFooter: true,
        printBackground: true,
        width: "595px",
        height: "848px",
        margin: {
          top: "1in",
          right: "0.75in",
          bottom: "1in",
          left: "0.75in",
        },
      },
    });
  };

  return (
    <>
      <Row style={{ flexWrap: "wrap" }}>
        <Col sm={24} xs={24} md={11} className="generator-modal">
          <Form
            id="pdfForm"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name="pdfForm"
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="PDF File Name"
              name="pdfName"
              rules={[
                { required: true, message: "Please Enter Your PDF File Name!" },
              ]}
            >
              <Input placeholder="Enter PDF File Name" />
            </Form.Item>
            <Form.Item
              label={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100vw",
                    alignItems: "center",
                  }}
                >
                  <span>Header Contents</span>
                  <Button
                    type="primary"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Add Image in Header
                  </Button>
                </div>
              }
              name="headerText"
              rules={[
                { required: true, message: "Please Enter Header Contents!" },
              ]}
            >
              <TiptapEditor
                placeholder="Type your header contents as HTML code!EG: <div>Test</div>"
                value={form.getFieldValue("headerText")}
                onChange={(value: any) => {
                  form.setFieldValue;
                  setHtmlContents((prevContents) => ({
                    ...prevContents,
                    headerText: value,
                  }));
                }}
                displayImageMenu={true}
                setImage={setImage}
                image={image}
              />
            </Form.Item>
            <Form.Item
              label="Body Contents"
              name="bodyText"
              rules={[
                { required: true, message: "Please Enter Body Contents!" },
              ]}
            >
              <TiptapEditor
                className="tiptap-body"
                value={form.getFieldValue("bodyText")}
                placeholder="Type your body contents as normal text. Eg: Test"
                onChange={(value: string) => {
                  form.setFieldValue;
                  setHtmlContents((prevContents) => ({
                    ...prevContents,
                    bodyText: value,
                  }));
                }}
                showMenubar={true}
                returnHTMLType={true}
              />
            </Form.Item>
            <Form.Item
              label="Footer Contents"
              name="footerText"
              rules={[
                { required: true, message: "Please Enter Footer Contents!" },
              ]}
            >
              <TiptapEditor
                value={form.getFieldValue("footerText")}
                placeholder="Type your footer contents as HTML code!EG: <div>Test</div>"
                onChange={(value: string) => {
                  form.setFieldValue;
                  setHtmlContents((prevContents) => ({
                    ...prevContents,
                    footerText: value,
                  }));
                }}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                key={"submit"}
                type="primary"
                form="pdfForm"
                loading={isPreviewLoading}
                className={"form-submit"}
                htmlType="submit"
              >
                Generate and Download PDF
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col sm={24} xs={24} md={1}>
          <Divider
            type="vertical"
            style={{ height: "100%", borderLeft: "5px dashed #c7cdd4" }}
          />
        </Col>
        <Col sm={24} xs={24} md={12}>
          {/* Div just to render PDF contents  */}
          <PDFPreview
            headerImage={image || ""}
            headerHTML={htmlContents.headerText}
            bodyHTML={htmlContents.bodyText}
            footerHTML={htmlContents.footerText}
          />
        </Col>
      </Row>
      <AddImageLinkModal
        image={image}
        showModal={showModal}
        setShowModal={setShowModal}
        setImage={setImage}
      />
    </>
  );
};

export default GeneratorModel;
