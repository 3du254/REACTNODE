const express = require("express");
const Report = express.Router();
//const pdfTemplate = require("./TestReport");
const pdfTemplate = require("./TestReport");
var pdf = require("html-pdf");
Report.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("p.pdf", err => {
    if (err) {
      return Promise.reject();
      //return console.log("error");
    }
    res.send(Promise.resolve());
  });
});
Report.get("/fetch-pdf", (req, res) => {
  //res.sendFile(`${__dirname}/p.pdf`);
  //res.sendFile('../p.pdf', { root: __dirname })
  res.sendFile(`${process.cwd()}/p.pdf`);
  
  //res.sendFile(`${__dirname / GeneratedReports}/p.pdf`);
});
module.exports = Report;
