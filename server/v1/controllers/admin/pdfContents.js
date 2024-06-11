const Joi = require("joi");
const { ValidationException } = require("../../exceptions/httpsExceptions");
const puppeteer = require("puppeteer");

//Queries
const PDFContentQueries = require("../../queries/pdfContents");
const { sequelize } = require("../../models");
const { DEFAULTPDFOPTIONS } = require("../../enums");
const { createSimpleTemplate } = require("../../templates/simplePDF");

/**
 * @api {get} /v1/admin/pdf/contents Get All pages
 * @apiName GetAll
 * @apiGroup PDFContents
 * @apiDescription Get All pdf contents
 *
 *
 * @apiParamExample {json} Request Example:
 * {
 *    "pdf_contents": PDFContentsPayload
 * }
 *
 * @apiSuccess {Object} Success message
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *    "pdf_contents": PDFContentsPayload
 * }
 *
 * @apiError {Object} error Error object if the getting process fails.
 *
 * @apiErrorExample {json} Error Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *    "error": "Error message"
 * }
 */

const getAll = async (req, res, next) => {
  try {
    // Get All PDF Contents with child table data
    const getAll = await PDFContentQueries.getAll({
      where: {
        admin_id: req.user?.id,
      },
    });

    res.status(200).json(getAll);
  } catch (err) {
    next(err);
  }
};

/**
 * @api {post} /v1/admin/pdf/contents/create Create PDF Contents
 * @apiName CreatePDFContents
 * @apiGroup PDFContents
 * @apiDescription Create PDFContens
 *
 * @apiParam {String} headerHTML Header of PDF
 * @apiParam {String} bodyHTML Body of PDF
 * @apiParam {String} footerHTML Footer of PDF
 *
 * @apiParamExample {json} Request Example:
 * {
 *    "success": Generate PDF
 * }
 *
 * @apiSuccess {Object} Success message
 *
 * @apiSuccessExample {json} Success Response:
 * HTTP/1.1 200 OK
 * {
 *    "success": true,
 * }
 *
 * @apiError {Object} error Error object if the create process fails.
 *
 * @apiErrorExample {json} Error Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *    "error": "Error message"
 * }
 */
const create = async (req, res, next) => {
  // get payload
  const data = req.body;
  let t;
  // Joi validations
  const schema = Joi.object({
    pdfName: Joi.string().required(),
    headerHTML: Joi.string().required(),
    bodyHTML: Joi.string(),
    footerHTML: Joi.string(),
    pdfOptions: Joi.object({
      format: Joi.string(),
      displayHeaderFooter: Joi.boolean(),
      printBackground: Joi.boolean(),
      width: Joi.string(),
      height: Joi.string(),
      margin: Joi.object({
        top: Joi.string(),
        right: Joi.string(),
        bottom: Joi.string(),
        left: Joi.string(),
      }),
    }),
  });

  const validationResult = schema.validate(data, { abortEarly: false });
  try {
    const { user } = req;
    

    let { pdfName, headerHTML, bodyHTML, footerHTML, pdfOptions } = data;

    // First, we start a transaction from your connection and save it into a variable
    t = await sequelize.transaction();
    if (validationResult && validationResult.error)
      throw new ValidationException(null, validationResult.error);

    // Check if PDF Name already exists
  const checkDuplicate=await PDFContentQueries.getOnePDF({
    pdf_name:pdfName,
    admin_id:user?.id,
  })

  if (checkDuplicate){
    throw new ValidationException(null, "PDF Name already registered. Delete Previous data or give different name");
  }


    // PDF Option
    pdfOptions = pdfOptions || DEFAULTPDFOPTIONS;

    // Create Puppetter
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "/usr/bin/chromium",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    // Create PDF Contents
    const page = await browser.newPage();
    const pdfContentTemplate = createSimpleTemplate(bodyHTML);
    pdfOptions.headerTemplate = headerHTML;
    pdfOptions.footerTemplate = footerHTML;

    await page.setContent(pdfContentTemplate, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf(pdfOptions);

    await browser.close();

    // Add in DB
await PDFContentQueries.createPDFContents({
  admin_id:user?.id,
  pdf_name:pdfName,
  custom_header:headerHTML,
  custom_body:pdfContentTemplate,
  custom_footer:footerHTML,
},t)

    await t.commit();

    res.setHeader("Content-Type", "application/pdf");

    res.status(200).send(pdfBuffer);
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

/**
 * @api {delete} /v1/admin/pdf/contents/:pdf_id/delete Delete One PDF Content
 * @apiName deleteOne
 * @apiGroup PDFContents
 * @apiDescription Delete PDFContents
 *
 * @apiParam {number} pdf_id PDFContent Id
 *
 * @apiSuccess {Object} Returns the JSON object representing the success message.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 *
 * @apiError {Object} error Error object if the deletion process fails.
 *
 * @apiErrorExample {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Err message."
 *     }
 */
const deleteOne = async (req, res, next) => {
  // get payload
  const data = req.params;
  let t;

  try {
    const { user } = req;
    // First, we start a transaction from your connection and save it into a variable
    t = await sequelize.transaction();

    // Check if Pages exists in our DB
    const checkID = await PDFContentQueries.getOnePDF({
      id: data?.pdf_id,
      admin_id: user?.id,
    });

    if (!checkID)
      throw new ValidationException(null, "PDF Contents not found!");

    // DELETE
    await PDFContentQueries.delete(checkID?.id, t);

    const payload = {
      success: true,
    };

    await t.commit();

    res.status(200).json(payload);
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  deleteOne,
};
