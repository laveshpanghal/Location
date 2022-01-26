var express = require("express");
var bodyParser = require("body-parser");
var awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const AWS = require("aws-sdk");
// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });

/**********************
 * Example get method *
 **********************/

app.get("/events", function (req, res) {
  var params = {
    TableName: "eventsTable-dev",
    limit: 10,
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      res.json({ success: "get call failed!", url: req.url, err: err });
    } else {
      res.json({
        success: "get call succeed!",
        url: req.url,
        data: data,
      });
    }
  });
});

app.get("/events/:id/:orgId", function (req, res) {
  const id = req.params.id;
  const orgId = req.params.orgId;
  var params = {
    TableName: "eventsTable-dev",
    Key: {
      eventId: id.toString(),
      organizerId: orgId.toString(),
    },
  };

  docClient.get(params, function (err, data) {
    if (err) {
      res.json({ success: "get call failed!", url: req.url, err: err });
    } else {
      res.json({ success: "get call succeed!", url: req.url, data: data });
    }
  });
});

/****************************
 * Example post method *
 ****************************/

app.post("/events", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.post("/events/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put("/events", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/events/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/events", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/events/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
