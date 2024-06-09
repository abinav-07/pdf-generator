import GeneratorModel from "@/components/pdfContents";
import React from "react";
import { Wrapper } from "./style";

const CreatePDF: React.FC = () => {
  return (
    <Wrapper>
      <GeneratorModel />
    </Wrapper>
  );
};

export default CreatePDF;
