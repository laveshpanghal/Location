var AWS = require("aws-sdk");

exports.handler = (event, context, cb) => {
  const tableName = process.env.STORAGE_TRACKDATACOLLECTOR_NAME;
  const region = process.env.REGION;
  console.log(tableName);

  AWS.config.update({ region: region });
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  console.log(JSON.stringify(event, null, 2));
  var result;

  event.Records.map((record) => {
    console.log(record.eventID);
    console.log(record.eventName);
    if (record.eventName === "INSERT") {
      console.log(record.dynamodb.NewImage);
      const putItemParams = {
        TableName: tableName,
        Item: {
          collector_name: record.dynamodb.NewImage.collector_name.S,
          household_name: record.dynamodb.NewImage.household_name.S,
          household_id: record.dynamodb.NewImage.household_id.S,
          collector_id: record.dynamodb.NewImage.collector_id.S,
          location: record.dynamodb.NewImage.location.M,
          date: record.dynamodb.NewImage.date.S,
          city: record.dynamodb.NewImage.city.S,
        },
      };

      dynamodb.put(putItemParams, (err, data) => {
        if (err) {
          console.log({
            error: err,
            url: "trackApiLambdaTrigger",
            body: err.body,
          });
          cb(err);
        } else {
          console.log({
            success: "post call succeed!",
            url: "trackApiLambdaTrigger",
            data: data,
          });
          cb(null, data);
        }
      });
    } else {
      console.log("Some other operations");
    }
    console.log("DynamoDB Record: %j", record.dynamodb);
  });
  return "DB Posted Success";
};
