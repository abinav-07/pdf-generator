const { PDFContents } = require("../models")

/*
 Create a class named PDFContentQueries which will be used to
 communicate with the database using sequelize
*/
class PDFContentQueries {
  table() {
    return PDFContents
  }

  async getAll(query) {
    return await this.table().findAll(query)
  }

  // Get User using id or any fitler
  async getOnePDF(filter = null) {
    const query = {
      raw: true,
    }

    if (filter) query.where = filter

    return await this.table().findOne(query)
  }

  // Create new
  async createPDFContents(pdfData, transaction = null) {
    return await this.table().create({ ...pdfData }, { transaction })
  }

  // update PDF using id and values
  async updatePDFContents(id, values, transaction = null) {
    return await this.table().update(
      { ...values },
      {
        where: {
          id,
        },
        transaction,
      },
    )
  }

  // delete PDF using id
  async delete(id, transaction) {
    return await this.table().destroy({
      where: {
        id,
      },
      transaction,
    })
  }
}

module.exports = new PDFContentQueries()
