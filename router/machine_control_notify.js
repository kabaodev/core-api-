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
const momemt = require("moment-timezone");
var cron = require("node-cron");

const middleware = (req, res, next) => {
  if (req.headers.authorization === process.env.TOKEN) next();
  else res.send("not allowed");
};

// Start machine _____________________________________________________________
router.get(
  "/get_start/:machine_id/:method/:wash_time",
  middleware,
  (req, res) => {
    var machine_id = req.params.machine_id;
    let method = req.params.method;
    let start_time = momemt().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
    let wash_time = Number(req.params.wash_time);
    let end_time = momemt()
      .tz("Asia/Bangkok")
      .add(wash_time, "minutes")
      .format("YYYY-MM-DD HH:mm:ss");

    let end_time_to_server = momemt()
      .add(wash_time, "minutes")
      .format("YYYY-MM-DD HH:mm:ss");

    // // Update to database
    if (method == "coin") {
      var send_status = {
        machine_id: machine_id,
        status: "OK Start",
        start_time: start_time,
        end_time: end_time,
        wash_time: wash_time,
      };
      db_mysql.query(
        "SELECT * FROM washing_mc_info WHERE machine_id ='" + machine_id + "'",
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            let status = result[0].machine_status;
            if (status == "working") {
              res.send("Machine " + status);
            } else {
              // res.send("Machine " + status);
              updateMachine_Status(
                "working",
                method,
                start_time,
                end_time,
                wash_time,
                machine_id,
                "Start machine"
              );
              res.send(send_status);
              notify(machine_id, result[0].machine_name, end_time_to_server);
            }
          }
        }
      );
    } else if (method == "pqyment-gateway") {
      res.send("Generate QR Code");
    }
  }
);

// Stop machine _____________________________________________________________
router.get("/get_stop/:machine_id", middleware, (req, res) => {
  var machine_id = req.params.machine_id;
  let today = momemt().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
  updateMachine_Status(
    "empty",
    "",
    today,
    today,
    0,
    machine_id,
    "Stop machine"
  );
  res.send(machine_id + " stop success");
});

// Update washing machine status
function updateMachine_Status(
  machine_status,
  pay_method,
  start_time,
  end_time,
  wash_time,
  machine_id,
  status
) {
  db_mysql.query(
    "UPDATE washing_mc_info " +
      "SET machine_status = '" +
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
        console.log(status + " success");
      }
    }
  );
}

// Set notification ( under 1 minute )
function notify(machine_id, machine_name, end_time) {
  let noti_time = momemt(end_time).subtract(1, "minutes").format("ss mm HH");
  let today = momemt().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
  cron.schedule(noti_time + " * * *", () => {
    LineNotify(machine_name + " : อีก 1 นาทีเครื่องซักผ้าจะสิ้นสุดการทำงาน");
    updateMachine_Status(
      "empty",
      "",
      today,
      today,
      0,
      machine_id,
      "Stop machine"
    );
  });
}

// Under 1 min -> Noti to LINE Group
//----------- LINE NOTIFY --------------------
const lineNotify = require("line-notify-nodejs")(
  "SeUrCnf3J9dsa0z04flDxbNoHoraV6p4K6Whgd2OiHJ"
);
function LineNotify(Message) {
  lineNotify
    .notify({
      message: Message,
    })
    .then(() => {
      console.log("send completed!");
    });
}
