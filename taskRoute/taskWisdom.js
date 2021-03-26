const express = require("express");
const tasks = express.Router();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("../../../databaseUserConfig.js");

const {
  wisdomclientdb,
  wisdommasterdb,
  imsclientdb,
} = require("../../../mysqlConnection");
const { del } = require("request");

tasks.get("/getTaskData/:clientId/:userId", async (req, res) => {
  let myConnection = null;
  const { clientId,userId } = req.params;
  //console.log(userId);
  try {
    let sqlQuery = "";
    myConnection = mysql.createConnection(dbConfig[clientId]); 

    sqlQuery = `Call PR_GET_TASKS_DATA(${userId})`;
    //console.log(sqlQuery);

    myConnection.query(sqlQuery, true, (error1, results, fields) => {
      // console.log(results);
      if (error1){
        console.error(`Data Not Found: ${error1}`);
        res.status(400).json({ status: "400", message: `${error1}` });
        return;
      } else {
        var resultUser = [],resultAdmin = [],resultSubAdmin = [];
        for (let i = 0; i < results.length; i++) {
          let fullDate = new Date(results[i].CREATEDON);
       
          let date =
            fullDate.getFullYear() +
            "-" +
            (fullDate.getMonth() + 1) +
            "-" +
            fullDate.getDate();

          let time =
            fullDate.getHours() +
            ":" +
            fullDate.getMinutes() +
            ":" +
            fullDate.getSeconds();

          let dueDate = new Date(results[i].DUE_DATE);
          // console.log(dueDate);
          let expectedDate =
            dueDate.getFullYear() +
            "-" +
            (dueDate.getMonth() + 1) +
            "-" +
            dueDate.getDate();

          // console.log(expectedDate);

          delete results[i].CREATEDON;
          delete results[i].DUE_DATE;

          results[i].CREATED_DATE = date;
          results[i].CREATED_TIME = time;
          if (expectedDate !== "NaN-NaN-NaN") {
            // console.log(expectedDate);
            results[i].EXPECTED_DATE = expectedDate;
          } else {
            results[i].EXPECTED_DATE = "00-00-0000";
          }
        }
        //console.log(results[0]);
        res.status(200).json(results[0]).end();
      }
    });
  } catch (error) {
    console.error(`Data Not Found: ${error}`);
    res.status(400).json({ status: "400", message: `${error}` });
  }
});

tasks.put("/taskStatus/:clientId", async (req, res) => {
  let myConnection = null;
  const { id, status } = req.body;
  const { clientId } = req.params;
  try {
    let sqlQuery = "";
    myConnection = mysql.createConnection(dbConfig[clientId]);
    var curr_date = new Date();
    let date =
      curr_date.getFullYear() +
      "-" +
      (curr_date.getMonth() + 1) +
      "-" +
      curr_date.getDate();

    let time =
      curr_date.getHours() +
      ":" +
      curr_date.getMinutes() +
      ":" +
      curr_date.getSeconds();

    let dated = date + " " + time;
    sqlQuery = `UPDATE tasks SET STATUS=('${status}'),UPDATEDON=('${dated}') WHERE ID IN (${id})`;
    console.log(sqlQuery);
    myConnection.query(sqlQuery, true, (error1, results, fields) => {
      //console.log(results);
      if (error1) {
        console.error(`Data Not Found: ${error1}`);
        res.status(400).json({ status: "400", message: `${error1}` });
        return;
      } else {
        console.log(results);
        res.status(200).json(results).end();
      }
    });
  } catch (error) {
    console.error(`Data Not Found: ${error}`);
    res.status(400).json({ status: "400", message: `${error}` });
  }
});

tasks.put("/taskDeactive/:clientId", async (req, res) => {
  let myConnection = null;
  const { id, isactive } = req.body;
  const { clientId } = req.params;
  try {
    let sqlQuery = "";
    myConnection = mysql.createConnection(dbConfig[clientId]);

    sqlQuery = `UPDATE tasks SET IS_ACTIVE=('${isactive}') WHERE ID IN (${id})`;
    console.log(sqlQuery);
    myConnection.query(sqlQuery, true, (error1, results, fields) => {
      //console.log(results);
      if (error1) {
        console.error(`Data Not Found: ${error1}`);
        res.status(400).json({ status: "400", message: `${error1}` });
        return;
      } else {
        console.log(results);
        res.status(200).json(results).end();
      }
    });
  } catch (error) {
    console.error(`Data Not Found: ${error}`);
    res.status(400).json({ status: "400", message: `${error}` });
  }
});

module.exports = tasks;
