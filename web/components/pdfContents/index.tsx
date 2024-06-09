import { Button, Col, Divider, Form, Modal, Row, message } from "antd"
import dynamic from "next/dynamic";
import React, { useState } from "react"
import { useMutation } from "react-query";
import PDFPreview from "./preview";
import PrivateRoute from "@/privateRoute";
import { fetchPDFContents } from "@/services/pdfContents";
const TiptapEditor = dynamic(() => import('../tiptap'), {
    ssr: false,
});

interface IHTMLContents {
    headerText: string
    bodyText: string
    footerText: string
}



const GeneratorModel: React.FC = () => {
    const [form] = Form.useForm();
    const [openModal, setOpenModal] = useState(false)
    const [htmlContents, setHtmlContents] = useState<IHTMLContents>({
        headerText: "",
        bodyText: "",
        footerText: ""
    })
    const { mutate: generatePDF, isLoading: isPreviewLoading } = useMutation(fetchPDFContents, {
        onSuccess: ({ data }: any) => {

        },
        onError: (err: any) => {
            message.open({
                type: "error",
                content: err?.response?.data?.message || "Error while generate pdf preview",
            });
        },
    });


    const handleModal = () => {
        setOpenModal(true)
    }

    const handleSubmit = async (values: any) => {
        console.log("Testing", values)
    }




    return (
        <>
            {openModal && (
                <Modal
                    title={("Generate your PDF")}
                    open={openModal}
                    onCancel={() => {
                        setOpenModal(false)
                    }}
                    maskClosable={false}
                    className="generator-modal"
                    destroyOnClose
                >
                </Modal>)}
            <Row style={{ flexWrap: "nowrap" }}>
                <Col xs={24} md={11} className="generator-modal">
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
                            label="Header Contents"
                            name="headerTemplate"
                            rules={[{ required: true, message: "Please Enter Header Contents!" }]}
                        >
                            <TiptapEditor
                                placeholder="Type your header contents..."
                                value={form.getFieldValue('headerTemplates')}
                                onChange={(value: string) => {
                                    form.setFieldValue
                                    setHtmlContents((prevContents) => ({ ...prevContents, headerText: value }))
                                }}
                                displayImageMenu={true}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Body Contents"
                            name="html"
                            rules={[{ required: true, message: "Please Enter Body Contents!" }]}
                        >
                            <TiptapEditor
                                className="tiptap-body"
                                value={form.getFieldValue('html')}
                                placeholder="Type your body contents..."
                                onChange={(value: string) => {
                                    form.setFieldValue
                                    setHtmlContents((prevContents) => ({ ...prevContents, bodyText: value }))
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Footer Contents"
                            name="footerTemplate"
                            rules={[{ required: true, message: "Please Enter Footer Contents!" }]}
                        >
                            <TiptapEditor
                                value={form.getFieldValue('footerTemplate')}
                                placeholder="Type your footer contents..."
                                onChange={(value: string) => {
                                    form.setFieldValue
                                    setHtmlContents((prevContents) => ({ ...prevContents, footerText: value }))
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
                            >Generate and Download PDF</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} md={1}>
                    <Divider type="vertical" style={{ height: "100%", borderLeft: "5px dashed #c7cdd4" }} />
                </Col>
                <Col xs={24} md={12}>
                    {/* Div just to render PDF contents  */}
                    <PDFPreview headerHTML={htmlContents.headerText} bodyHTML={htmlContents.bodyText} footerHTML={htmlContents.footerText} />
                </Col>
            </Row>

        </>
    )
}

export default PrivateRoute(GeneratorModel, { type: "Admin" })
