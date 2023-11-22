require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
});

const options = {
  maxPartSize: 50 * 1024 * 1024, // 50 MB
};

const awsStorageUploadPhotos = async (file) => {
  let urlLink = "";

  let uploadParams = { Bucket: "photoscallsheet", Key: "", Body: "" };

  let fileStream = fs.createReadStream(file.filepath);
  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });

  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(`${file.filepath}_${file.originalFilename}`);

  // call S3 to retrieve upload file to specified bucket
  urlLink = await s3.upload(uploadParams, options).promise();

  return urlLink.Location;
};

const awsStorageUploadVideos = async (file) => {
  let urlLink = "";

  let uploadParams = { Bucket: "videoscallsheet", Key: "", Body: "" };

  let fileStream = fs.createReadStream(file.filepath);
  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });

  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(`${file.filepath}_${file.originalFilename}`);

  // call S3 to retrieve upload file to specified bucket
  urlLink = await s3.upload(uploadParams, options).promise();

  return urlLink.Location;
};

const awsStorageUploadAudios = async (file) => {
  let urlLink = "";

  let uploadParams = { Bucket: "audioscallsheet", Key: "", Body: "" };

  let fileStream = fs.createReadStream(file.filepath);
  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });

  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(`${file.filepath}_${file.originalFilename}`);

  // call S3 to retrieve upload file to specified bucket
  urlLink = await s3.upload(uploadParams, options).promise();

  return urlLink.Location;
};

const awsStorageUploadAwards = async (file) => {
  let urlLink = "";

  let uploadParams = { Bucket: "awardscallsheet", Key: "", Body: "" };

  let fileStream = fs.createReadStream(file.filepath);
  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });

  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(`${file.filepath}_${file.originalFilename}`);

  // call S3 to retrieve upload file to specified bucket
  urlLink = await s3.upload(uploadParams, options).promise();

  return urlLink.Location;
};

const awsStorageUploadPreviousWork = async (file) => {
  let urlLink = "";

  let uploadParams = { Bucket: "previousworkcallsheet", Key: "", Body: "" };

  let fileStream = fs.createReadStream(file.filepath);
  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });

  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(`${file.filepath}_${file.originalFilename}`);

  // call S3 to retrieve upload file to specified bucket
  urlLink = await s3.upload(uploadParams, options).promise();

  return urlLink.Location;
};

const awsStorageUploadChatAttachment = async (file) => {
  let urlLink = "";

  let uploadParams = { Bucket: "chatattachmentcallsheet", Key: "", Body: "" };

  let fileStream = fs.createReadStream(file.filepath);
  fileStream.on("error", function (err) {
    console.log("File Error", err);
  });

  uploadParams.Body = fileStream;
  uploadParams.Key = path.basename(`${file.filepath}_${file.originalFilename}`);

  // call S3 to retrieve upload file to specified bucket
  urlLink = await s3.upload(uploadParams, options).promise();

  return urlLink.Location;
};

//call S3 to create the bucket
const createS3Bucket = async () => {
  try {
    // Create the parameters for calling createBucket
    let bucketParams = {
      Bucket: "callsheet-bucket",
    };

    // call S3 to create the bucket
    s3.createBucket(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Location);
      }
    });
  } catch (err) {
    console.log("Error", err);
  }
};

const listBuckets = async () => {
  let datas = [];
  try {
    // Call S3 to list the buckets
    s3.listBuckets(function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Buckets);
        datas = data.Buckets;
      }
    });
    console.log("Success", datas);
    return datas;
  } catch (err) {
    console.log("Error", err);
  }
};

// Delete file from s3 bucket

const deleteFileFromS3 = (bucket, fileUrl) => {
  const params = {
    Bucket: bucket,
    Key: fileUrl,
  };
  return s3.deleteObject(params).promise();
};

module.exports = {
  awsStorageUploadPhotos,
  awsStorageUploadVideos,
  awsStorageUploadAudios,
  awsStorageUploadAwards,
  awsStorageUploadPreviousWork,
  awsStorageUploadChatAttachment,
  listBuckets,
  createS3Bucket,
  deleteFileFromS3,
};
