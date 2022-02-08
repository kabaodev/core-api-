const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const mc_manage = require("./router/machine_managememt");
const mc_con_noti = require("./router/machine_control_notify");
const mc_monitor = require("./router/machine_monitoring");

app.use("/", mc_manage);
app.use("/", mc_con_noti);
app.use("/", mc_monitor);

app.listen("3333", () => {
  console.log("Server is running on port 3333");
});
