import { formatHtml } from "@/utils/pdfFormatter";
import { Typography } from "antd";
import React from "react";
import styled from "styled-components";

interface IPreview {
  headerHTML: string;
  bodyHTML: string;
  footerHTML: string;
}

const Wrapper = styled.div`
  overflow-wrap: break-word;
  .header-text {
    text-align: center;
    span {
      font-size: 20px;
      font-weight: bold;
    }
  }
  #pdf-content {
    width: auto;
    height: 95vh;
    border: 2px solid #949fab;
    border-radius: 5px;
    padding: 1in 0.75in;
    overflow: auto;
  }
`;

const PDFPreview: React.FC<IPreview> = ({
  headerHTML,
  bodyHTML,
  footerHTML,
}) => {
  return (
    <Wrapper>
      <div className="header-text">
        <Typography.Text>Your PDF Preview</Typography.Text>
      </div>

      <div id="pdf-content">
        <div
          id="header"
          className="header"
          dangerouslySetInnerHTML={{ __html: formatHtml(headerHTML) }}
        ></div>
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
