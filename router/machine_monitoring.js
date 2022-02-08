const express = require("express");
const router = express.Router();
module.exports = router;
const mysql = require("mysql");

const db_mysql = mysql.createConnection({
  user: "admin",
  host: "localhost",
  password: "<password>",
  database: "dudee_exam_db",
});

require("dotenv").config();

const mdw = (req, res, next) => {
  if (req.headers.authorization === process.env.TOKEN) next();
  else res.send("not allowed");
};

router.get("/machine_monitor", mdw, (req, res) => {
  db_mysql.query(
    "SELECT * FROM washing_mc_info ORDER BY machine_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
