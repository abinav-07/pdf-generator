export interface IPDFOptions {
  format: string;
  printBackground: boolean;
  displayHeaderFooter: boolean;
  width: string;
  height: string;
  margin: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
}

export interface ICreatePDF {
  pdfName: string;
  headerHTML: string;
  bodyHTML: string;
  footerHTML: string;
  pdfOptions: IPDFOptions;
}
