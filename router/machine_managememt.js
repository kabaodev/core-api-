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

const middleware = (req, res, next) => {
  if (req.headers.authorization === process.env.TOKEN) next();
  else res.send("not allowed");
};

// Manage washing machine _____________________________________________________________
router.post("/add_machine", middleware, (req, res) => {
  var machine_id = "WSMC" + String(Date.now());
  let machine_name = req.body.machine_name;
  let machine_status = "empty";
  db_mysql.query(
    "INSERT INTO washing_mc_info (machine_id,machine_name,machine_status) VALUES(?,?,?)",
    [machine_id, machine_name, machine_status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.put("/edit_machine", middleware, (req, res) => {
  var machine_id = req.body.machine_id;
  let machine_name = req.body.machine_name;
  let machine_status = req.body.machine_status;
  let pay_method = req.body.pay_method;
  let start_time = req.body.start_time;
  let end_time = req.body.end_time;
  let wash_time = req.body.wash_time;

  db_mysql.query(
    "UPDATE washing_mc_info " +
      "SET machine_name = '" +
      machine_name +
      "' , machine_status = '" +
      machine_status +
      "' , pay_method = '" +
      pay_method +
      "' , start_time = '" +
      start_time +
      "' , end_time = '" +
      end_time +
      "' , wash_time = " +
      wash_time +
      " WHERE machine_id = '" +
      machine_id +
      "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.delete("/delete_machine/:id", middleware, (req, res) => {
  let machine_id = req.params.id;
  db_mysql.query(
    "DELETE FROM washing_mc_info " + "WHERE machine_id = '" + machine_id + "'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/machine_info", middleware, (req, res) => {
  db_mysql.query("SELECT * FROM washing_mc_info", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
