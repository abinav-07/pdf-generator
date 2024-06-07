const express = require("express");
const { checkAdmin, checkJWTToken } = require("../middlewares/auth/checkJWT");

const router = express.Router();

//Services
const UserController = require("../controllers/admin/users");
const PDFController = require("../controllers/admin/pdfContents");

router.use(checkJWTToken, checkAdmin);
// User Routes
router.get("/members", UserController.getAll);
router.patch("/members/update", UserController.update);
router.delete("/members/delete", UserController.deleteOne);

// PDF routes
router.get("/pdf/contents", PDFController.getAll);
router.post("/pdf/contents/create", PDFController.create);
router.delete("/pdf/contents/:pdf_id/delete", PDFController.deleteOne);

module.exports = router;
