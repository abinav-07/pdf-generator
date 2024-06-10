const HTTPSTATUSCODES = Object.freeze({
  OK: 200,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  VALIDATION_ERROR: 422,
});

const DEFAULTPDFOPTIONS = Object.create({
  format: "A4",
  displayHeaderFooter: true,
  headerTemplate: "",
  footerTemplate: "",
  printBackground: true,
  width: "595px",
  height: "848px",
  margin: {
    top: "1in",
    right: "0.75in",
    bottom: "1in",
    left: "0.75in",
  },
});

module.exports = {
  HTTPSTATUSCODES,
  DEFAULTPDFOPTIONS,
};
