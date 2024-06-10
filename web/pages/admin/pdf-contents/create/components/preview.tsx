import { formatHtml } from "@/utils/pdfFormatter";
import { Col, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";

interface IPreview {
  headerImage?: string;
  headerHTML: string;
  bodyHTML: string;
  footerHTML: string;
}

const Wrapper = styled.div`
  overflow-wrap: break-word;
  .header-text {
    text-align: center;
    span {
      font-size: 18px;
      font-weight: bold;
    }
  }
  #pdf-content {
    width: auto;
    height: 95vh;
    border: 2px solid #949fab;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 5px;
    overflow: auto;
    .header-row {
      align-items: center;
    }
    .header-image {
      width: 100px;
      height: 100px;
      padding: 10px;
    }
    .header,
    .footer {
      padding: 10px;
      box-sizing: border-box;
    }
    .body {
      flex: 1;

      padding: 1in 0.75in;
    }
  }
`;

const PDFPreview: React.FC<IPreview> = ({
  headerImage,
  headerHTML,
  bodyHTML,
  footerHTML,
}) => {
  return (
    <Wrapper>
      <div className="header-text">
        <Typography.Text>Preview</Typography.Text>
      </div>

      <div id="pdf-content">
        <Row className="header-row">
          <Col span={headerImage ? 18 : 24}>
            <div
              id="header"
              className="header"
              dangerouslySetInnerHTML={{ __html: formatHtml(headerHTML) }}
            ></div>
          </Col>
          {headerImage ? (
            <Col span={6}>
              <img className="header-image" src={headerImage} />
            </Col>
          ) : (
            ""
          )}
        </Row>

        <div
          id="body"
          className="body"
          dangerouslySetInnerHTML={{ __html: formatHtml(bodyHTML) }}
        ></div>
        <div
          id="footer"
          className="footer"
          dangerouslySetInnerHTML={{ __html: formatHtml(footerHTML) }}
        ></div>
      </div>
    </Wrapper>
  );
};

export default PDFPreview;
