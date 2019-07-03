const express = require("express");
const ClaimsCategories = express.Router();
const Joi = require("joi");
var sql = require("mssql");
const config = require("../../database");
ClaimsCategories.get("/", (req, res) => {
  const pool = new sql.ConnectionPool(config);
  pool.connect(error => {
    if (error) {
      res.json({ success: false, essage: error.message });
    } else {
      new sql.Request(pool)

        .input("UserID", sql.VarChar, res.locals.user)
        .input("Terminus", sql.VarChar, req.ip)
        .execute("spSelectAllClaimsCategories", (err, result) => {
          if (err) {
            res.json({ success: false, message: err.message });
          } else {
            res.status(200).json(result.recordset);
          }
        });
    }
  });
})
  .post("/", (req, res) => {
    const schema = Joi.object().keys({
      Code: Joi.string().required(),
      Name: Joi.string().required()
    });
    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      const pool = new sql.ConnectionPool(config);
      pool.connect(error => {
        if (error) {
          res.json({ success: false, message: error.message });
        }
        new sql.Request(pool)

          .input("Code", sql.VarChar, req.body.Code)
          .input("Name", sql.VarChar, req.body.Name)
          .input("UserID", sql.VarChar, res.locals.user)
          .input("Terminus", sql.VarChar, req.ip)
          .execute("spSaveClaimsCategories", (err, result) => {
            if (err) {
              res.json({ success: false, message: err.message });
            } else {
              res.json({ success: true, message: "saved" });
            }
          });
      });
    } else {
      res.json({ success: false, message: result.error.details[0].message });
    }
  })
  .delete("/:Code", (req, res) => {
    const Code = req.params.Code;
    const pool = new sql.ConnectionPool(config);
    pool.connect(error => {
      if (error) {
        res.json({ success: false, message: error.message });
      } else {
        new sql.Request(pool)
          .input("Code", sql.VarChar, Code)
          .input("UserID", sql.VarChar, res.locals.user)
          .input("Terminus", sql.VarChar, req.ip)
          .execute("spDeleteClaimsCategories", (err, result) => {
            if (err) {
              res.json({ success: false, message: err.message });
            } else {
              res.json({ success: true, message: "deleted" });
            }
          });
      }
    });
  })
  .get("/:Code", (req, res) => {
    const Code = req.params.Code;
    const pool = new sql.ConnectionPool(config);
    pool.connect(error => {
      if (error) {
        res.json({ success: false, message: error.message });
      } else {
        new sql.Request(pool)
          .input("Code", sql.VarChar, Code)
          .input("UserID", sql.VarChar, res.locals.user)
          .input("Terminus", sql.VarChar, req.ip)
          .execute("spSelectClaimsCategories", (err, result) => {
            if (err) {
              res.json({ success: false, message: err.message });
            } else {
              res.status(200).send(result.recordset);
            }
          });
      }
    });
  });
module.exports = ClaimsCategories;
